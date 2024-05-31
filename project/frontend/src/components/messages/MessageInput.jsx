
		

// import { useState } from "react";
// import { BsSend, BsEmojiSmile } from "react-icons/bs";
// import useSendMessage from "../../hooks/useSendMessage";
// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";

// const MessageInput = () => {
//   const [message, setMessage] = useState("");
//   const { loading, sendMessage } = useSendMessage();
//   const [showEmoji, setShowEmoji] = useState(false);

//   const addEmoji = (emoji) => {
//     const sym = emoji.unified.split("-");
//     const codeArray = [];
//     sym.forEach((el) => codeArray.push("0x" + el));
//     const emojiChar = String.fromCodePoint(...codeArray);
//     setMessage((prevMessage) => prevMessage + emojiChar);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!message) return;
//     await sendMessage(message);
//     setMessage("");
//   };

//   return (
//     <form className="px-4 my-3" onSubmit={handleSubmit}>
//       <div className="w-full relative">
//         <input
//           type="text"
//           className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
//           placeholder="Send a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <span
//           onClick={() => setShowEmoji(!showEmoji)}
//           className="cursor-pointer absolute inset-y-0 right-10 flex items-center px-3 text-gray-400 hover:text-white"
//         >
//           <BsEmojiSmile style={{color:"yellow"}} />
//         </span>
//         {showEmoji && (
//           <div className="absolute bottom-full right-0 mb-2">
//             <Picker
//               data={data}
//               emojiSize={20}
//               emojiButtonSize={28}
//               onEmojiSelect={addEmoji}
//               maxFrequentRows={0}
//             />
//           </div>
//         )}
//         <button
//           type="submit"
//           className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white"
//         >
//           {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default MessageInput;

import { useState } from "react";
import { BsSend, BsEmojiSmile, BsPaperclip, BsMic, BsFillMicFill } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const [showEmoji, setShowEmoji] = useState(false);
  const [recording, setRecording] = useState(false);

  const addEmoji = (emoji) => {
    const sym = emoji.unified.split("-");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    const emojiChar = String.fromCodePoint(...codeArray);
    setMessage((prevMessage) => prevMessage + emojiChar);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  const handleAttachFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file attachment logic here
      console.log("File attached:", file.name);
    }
  };

  const startRecording = () => {
    setRecording(true);
    // Handle start recording logic here
  };

  const stopRecording = () => {
    setRecording(false);
    // Handle stop recording and send logic here
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <span
          onClick={() => setShowEmoji(!showEmoji)}
          className="cursor-pointer absolute inset-y-0 right-28 flex items-center px-3 text-gray-400 hover:text-white"
        >
          <BsEmojiSmile style={{ color: "yellow" }} />
        </span>
        {showEmoji && (
          <div className="absolute bottom-full right-0 mb-2">
            <Picker
              data={data}
              emojiSize={20}
              emojiButtonSize={28}
              onEmojiSelect={addEmoji}
              maxFrequentRows={0}
            />
          </div>
        )}
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleAttachFile}
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer absolute inset-y-0 right-20 flex items-center px-3 text-gray-400 hover:text-white"
        >
          <BsPaperclip />
        </label>
        <span
          onClick={() => (recording ? stopRecording() : startRecording())}
          className="cursor-pointer absolute inset-y-0 right-10 flex items-center px-3 text-gray-400 hover:text-white"
        >
          {recording ? <BsFillMicFill style={{ color: "red" }} /> : <BsMic />}
        </span>
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white"
        >
          {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
