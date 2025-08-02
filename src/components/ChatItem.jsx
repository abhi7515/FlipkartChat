
import '../App.css';
export default function ChatItem({chat, onClick, isSelected, timeStamp}) {
    const latestMessage = chat.messageList.length > 0 ? chat.messageList[chat.messageList.length - 1].message : "No Chats Available";
    const lastChatTimeStamp = new Date(timeStamp).toString()
    return (
        <div className={`chat-item ${isSelected ? 'selected' : ''}`} onClick={onClick}>
        <div>
            <img className='product-image' src={chat.imageURL} alt={chat.title} />
            <div>
                <h3>{chat.title}</h3>
                <p>{chat.orderId}</p>
                <p>{chat.latestMessage}</p>
            </div>
         </div>
         <div className='latest-chat-time'>{lastChatTimeStamp}</div>
        </div>
    )
  }