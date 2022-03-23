import '../CSS/contacts.css';
import {useEffect, useState} from 'react';
import search from  '../Assets/Icons/search.svg';
import close from  '../Assets/Icons/close.svg';
import newMessage from  '../Assets/Icons/newMessage.svg';
import checkmark from  '../Assets/Icons/checkmark.svg';
import x from  '../Assets/Icons/x.svg';



import FakeContacts from '../fakeContacts';
import ChatOverview from './ChatOverview';
import FakeData from '../fakeData';
function Contacts({setUUID, myUUID}){

	const [active, setActive] = useState(0);
	const [showCloseButton, setShowCloseButton] = useState(false);
	const [searchVal, setSearchVal] = useState('');
	const [newContact, setNewContact] = useState('');
	const newUUID = 'abc'+FakeContacts.length;
	const [newButton, setNewButton] = useState(false);




	function setActiveButton(value, UUID){
		setActive(value);
		setUUID(UUID);
	}

	function handleInput(e){
		setSearchVal(e.currentTarget.value);
		setShowCloseButton(true);
	}

	function handleNewClose(){
		setNewContact('');
		setNewButton(false);
	}

	function handleSubmit(){
		var tempObj ={
			ID: FakeContacts.length,
			UUID: newUUID,
			Name: newContact
		};

		FakeContacts.push(tempObj);
		setNewContact('');
		setNewButton(false)
	}

	useEffect(()=>{
		setUUID(FakeData[0].UUID);
		setActive(FakeData.filter(data=>data.UUID !== myUUID)[0].ID);
	},[myUUID])

	return(
		<article className='contacts-wrapper br-left-1 flex-column space-between'>
			<div className="searchbar-wrapper flex-row center">
				<img className='search-icon' alt='' src={search}/>
				<input 
				className='contacts-search br-quarter'
				placeholder='Search'
				value={searchVal}
				onChange={(e)=> handleInput(e)}
				onFocus={()=>setShowCloseButton(true)}
				onBlur={()=>searchVal.length === 0? setShowCloseButton(false):setShowCloseButton(true)}/>
				<button className={showCloseButton?'close-button-active':'close-button'} onClick={()=>{
					setSearchVal('');
					setShowCloseButton(false);}}><img className='close-icon' alt='' src={close}/></button>
				<button className='new-button br-half' onClick={()=>setNewButton(true)}>
					<img className='new-icon' alt='' src={newMessage}/>
				</button>
			</div>
			<div className={newButton?'new-contact-wrapper-active flex-column space-evenly':'new-contact-wrapper'}>
				<h2 className='name'>Add New Contact</h2>
				<input 
				className='new-contact'
				placeholder='Enter Name'
				value={newContact}
				onChange={(e)=> setNewContact(e.currentTarget.value)}/>	
				<div className='new-contact-controls flex-row center'>
					<button className='add br-quarter flex-row center' onClick={()=>handleSubmit()}>
						<img className='checkmark-icon' alt='' src={checkmark}/>
					</button>
					<button className='delete br-quarter flex-row center' onClick={()=>handleNewClose()}>
						<img className='x-icon' alt='' src={x}/>
					</button>
					<p className='name'>UUID:</p>
					<p className='UUID flex-row center'>{newUUID}</p>
					

				</div>
			</div>
			<div className='contacts-list-wrapper flex-column flex-start-center'>
				{FakeData.filter(data=>data.UUID !== myUUID && data.Name.toLowerCase().includes(searchVal.toLowerCase())).map(profile=><ChatOverview key ={profile.ID} profileData={profile} setActiveButton={setActiveButton} active={active} myUUID={myUUID}/>)}
			</div>
		</article>
	);
}
export default Contacts;