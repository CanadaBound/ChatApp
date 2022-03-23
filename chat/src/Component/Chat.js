import '../CSS/chat.css';
import ChatItem from './ChatItem';
import FakeData from '../fakeData';
import fakeMessages from '../fakeMessages';
import { useEffect, useState } from 'react';
function Chat({UUID, myUUID}){
	const [addresseeName, setAddresseeName] = useState('');
	const [message, setMessage] = useState('');

	// const myUUID = 'abc0';

	function handleKeyDown(e){
		if(e.key === 'Enter' && message.length !== 0){
			var tempobj ={
				UUIDSender: myUUID,
				UUIDReceiver: UUID,
				Message: message,
				TimeDate: new Date().toString()
			}
			fakeMessages.push(tempobj);
			setMessage('');
		}
	}

	useEffect(()=>{
		var index = FakeData.findIndex(i => i.UUID === UUID);
		setAddresseeName(FakeData[index].Name);
	},[UUID]);

return(
	<article className="chat-wrapper br-right-1 flex-column space-between">
		<header className='chat-header br-top-right-1 flex-row flex-start-center'>
		<p className='chat-header-to'>To:</p>
		<p className='chat-header-address'>{addresseeName}</p>
		</header>
		<main className='chat-content flex-column center'>
			{fakeMessages.filter(message => (message.UUIDReceiver === UUID && message.UUIDSender === myUUID)|| (message.UUIDReceiver === myUUID && message.UUIDSender === UUID)).map(message => 
			<div className={message.UUIDSender === UUID?'chat-item-container flex-row flex-start-center':'chat-item-container flex-row flex-end-center'}>
				<ChatItem messageData={message.Message} timeDate={message.TimeDate} type = {message.UUIDSender === UUID?'receiver':'sender'}/>
			</div>
			)}
		</main>
		<footer className='chat-footer flex-row center'>
			<input 
			type='text' 
			className='chat-input-message br-1'
			placeholder='Message'
			value={message}
			onChange={(e)=>setMessage(e.currentTarget.value)}
			onKeyDown={(e)=>handleKeyDown(e)}/>
		</footer>
	</article>
);
}
export default Chat;