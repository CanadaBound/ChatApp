import '../CSS/chatItem.css';
import {useState} from 'react';
function ChatItem({messageData, timeDate, type}){

	const [active, setActive] = useState(false);
return(
	<button className={type === 'sender'? "chat-item br-1 flex-column center sender-message": 'chat-item br-1 flex-column center receiver-message'} onClick={()=>setActive(prev=>!prev)}>
		{active?<p className={type === 'sender'?'chat-text timedate-modifier-sender timedate-modifier-sender-active':'chat-text timedate-modifier-receiver timedate-modifier-receiver-active'}>{timeDate.slice(3,24)}</p>:<p className={type === 'sender'?'chat-text timedate-modifier-sender':'chat-text timedate-modifier-receiver'}>{timeDate.slice(3,24)}</p>}
		<p className='chat-text'>{messageData}</p>
	</button>
);
}
export default ChatItem;