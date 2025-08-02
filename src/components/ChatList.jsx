import ChatItem from './ChatItem';
import '../App.css';
export default function ChatList({chats, onSelectChat, searchTerm, onSearch, selectedChat, sortChats}) {
    return (
        <div className={`chat-list ${selectedChat ? "collapsed": ""}`}>
             <h2>Filter by Title/Order ID</h2>
            <div className='chat-widgets-container'>
             <input type="text" placeholder='Start Typing to Search...' value={searchTerm} onChange={(e) => onSearch(e.target.value)} />
             <button className='sort-button' onClick={() => sortChats()}>Sort Chats</button>
            </div>
            {chats.map(chat => (
                <ChatItem 
                    key={chat.id} 
                    chat={chat} 
                    onClick={() => onSelectChat(chat)}
                    isSelected={selectedChat && selectedChat.id === chat.id}
                    timeStamp={chat.latestMessageTimestamp || "NA"}
                />
            ))}
        </div>
    )
  }