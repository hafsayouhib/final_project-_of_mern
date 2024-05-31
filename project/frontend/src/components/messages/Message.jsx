

// import React from 'react';
// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime"; // Import the correct function
// import useConversation from "../../zustand/useConversation";
// import TimeDisplay from "../../utils/extractTime"; // Import the correct component

// const Message = ({ message }) => {
//   const { authUser } = useAuthContext();
//   const { selectedConversation } = useConversation();
//   const fromMe = message.senderId === authUser._id;
//   const formattedTime = extractTime(message.createdAt); // Use extractTime to format the time
//   const chatClassName = fromMe ? "chat-end" : "chat-start";
//   const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
//   const bubbleBgColor = fromMe ? "bg-blue-500" : "";

//   const shakeClass = message.shouldShake ? "shake" : "";

//   return (
//     <div className={`chat ${chatClassName}`}>
//       <div className='chat-image avatar'>
//         <div className='w-10 rounded-full'>
//           <img alt='Tailwind CSS chat bubble component' src={profilePic} />
//         </div>
//       </div>
//       <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
//       <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
//         <TimeDisplay time={formattedTime} /> {/* Use TimeDisplay to render the formatted time */}
//       </div>
//     </div>
//   );
// };

// export default Message;
import React, { useState } from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime"; 
import useConversation from "../../zustand/useConversation";
import TimeDisplay from "../../utils/extractTime";
import { BsPhone, BsPhoneFill, BsMicMute, BsMic } from "react-icons/bs";
import { initiateCall, acceptCall, rejectCall, endCall } from "../api/Call.js"; // Import call API functions

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const [isMuted, setIsMuted] = useState(false);
  const [callStatus, setCallStatus] = useState(null);
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  const shakeClass = message.shouldShake ? "shake" : "";

  const handleCall = async () => {
    setCallStatus("calling");
    try {
      await initiateCall(selectedConversation.userId);
      setCallStatus("ringing");
    } catch (error) {
      console.error("Error initiating call:", error);
      setCallStatus(null);
    }
  };

  const handleAcceptCall = async () => {
    try {
      await acceptCall(selectedConversation.userId);
      setCallStatus("ongoing");
    } catch (error) {
      console.error("Error accepting call:", error);
      setCallStatus(null);
    }
  };

  const handleRejectCall = async () => {
    try {
      await rejectCall(selectedConversation.userId);
      setCallStatus(null);
    } catch (error) {
      console.error("Error rejecting call:", error);
      setCallStatus(null);
    }
  };

  const handleEndCall = async () => {
    try {
      await endCall(selectedConversation.userId);
      setCallStatus(null);
    } catch (error) {
      console.error("Error ending call:", error);
      setCallStatus(null);
    }
  };

  const handleToggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
    toggleMute(selectedConversation.userId);
  };

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img alt='User Profile' src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
        <TimeDisplay time={formattedTime} />
        {callStatus === "ringing" && (
          <div>
            <button onClick={handleAcceptCall} className="text-gray-400 hover:text-white">
              <BsPhoneFill />
            </button>
            <button onClick={handleRejectCall} className="text-gray-400 hover:text-white">
              <BsPhone />
            </button>
          </div>
        )}
        {callStatus === "ongoing" && (
          <div>
            <button onClick={handleEndCall} className="text-gray-400 hover:text-white">
              <BsPhone />
            </button>
            <button onClick={handleToggleMute} className="text-gray-400 hover:text-white">
              {isMuted ? <BsMicMute /> : <BsMic />}
            </button>
          </div>
        )}
        {!callStatus && (
          <button onClick={handleCall} className="text-gray-400 hover:text-white">
            <BsPhone />
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;


