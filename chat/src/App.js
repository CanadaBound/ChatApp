import './App.css';
import Contacts from './Component/Contacts';
import Chat from './Component/Chat';
import FakeData from './fakeData';
import FakeContacts from './fakeContacts';
import { useEffect, useState } from 'react';
function App() {
  const [UUID, setUUID] = useState(FakeData[0].UUID);
  const [userUUID, setUserUUID] = useState('abc0');
  const [totalContacts, setTotalContacts] = useState(FakeContacts.length);

  return (
    <>
    <div className='impersonate-wrapper br-1 flex-column flex-start-center'>
      <h2 className='name'>Impersonate</h2>
      <div className='impersonate-radio-wrapper flex-column flex-start-center'>
        {FakeContacts.map((contact, index) =>{
          return <div className='impersonate-radio-container flex-row center'>
            <input 
            type="radio" 
            id ={contact.UUID} 
            className='impersonate-radio' 
            name="contact" 
            value={contact.UUID} 
            onChange ={()=>setUserUUID(contact.UUID)}
            defaultChecked={index === 0}/>
          <label className='name unchecked' for={contact.UUID}>{contact.Name}</label>
           </div> 
        })}
      </div>
      <p className='name'>Total Contacts: {totalContacts}</p>
   </div>
   <main className='content-wrapper br-1 flex-row center'>
    <Contacts setUUID = {setUUID} myUUID ={userUUID}/>
    <Chat UUID = {UUID} myUUID ={userUUID}/>
   </main>
    </>
  
  );
}

export default App;
