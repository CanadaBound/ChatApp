import '../CSS/chatOverview.css';
import { useEffect, useState } from 'react';

import fakeMessages from '../fakeMessages';
import profile from '../Assets/Icons/profile.svg';
function ChatOverview({profileData, setActiveButton, active, myUUID}){

	const [lastChat, setLastChat] = useState('');
	const [lastTime, setLastTime] = useState('');


	function handleClick(){
		setActiveButton(profileData.ID, profileData.UUID);
	}

	useEffect(()=>{
		const tempArr = fakeMessages
		.filter(messages => (messages.UUIDSender === profileData.UUID && messages.UUIDReceiver === myUUID) || (messages.UUIDReceiver === profileData.UUID) && messages.UUIDSender === myUUID)
		.sort(function(a,b){
			return new Date(a.TimeDate) - new Date(b.TimeDate);
		});

		if(tempArr.length !==0){
			setLastChat(tempArr[tempArr.length-1].Message);
			setLastTime(tempArr[tempArr.length-1].TimeDate);
		}

		

		
	},[]);


	return(
		<button key={profileData.ID} className={active === profileData.ID? 'overview-wrapper flex-row center selected br-half' :'overview-wrapper flex-row center'} onClick={()=>handleClick()}>
			<div className='overview-profile flex-column flex-start'>
				<img className='profile-pic' alt='' src={profile}/>
			</div>
			<div className='overview-details flex-column flex-start'>
				<p className='name'>{profileData.Name}</p>
				<p className='last-message'>{lastChat}</p>
			</div>
			<div className='overview-timedate flex-column flex-start'>
				<p className='timedate'>{lastTime.slice(16,21)}</p>
			</div>

		</button>
	);
}
export default ChatOverview;