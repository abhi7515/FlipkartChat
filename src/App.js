import { useEffect, useRef, useState, useCallback, createContext } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import './App.css';
export default function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const searchRef = useRef(null);
  const fetchChats = async () => {
    try {
      const response = await fetch('https://my-json-server.typicode.com/codebuds-fk/chat/chats');
      const data = await response.json();
      setChats(data);
      setFilteredChats(data);
    } catch (error) {
      console.error('error fetching chats from api:', error);
    }
  }
  useEffect(() => {
    fetchChats();
  },[]);

  const debouncedSearch = (value) => {
    setSearchTerm(value);
    if(searchRef.current) {
      clearTimeout(searchRef.current)
    }
    searchRef.current = setTimeout(() => {
        const filteredChats = chats.filter(chat => chat.title.toLowerCase().includes(searchTerm.toLowerCase()) || chat.orderId.toString().includes(searchTerm));
        setFilteredChats(filteredChats);
    }, 2000);
  }

  const sortChats = () => {
    // function compareNumbers(a, b) {
    //   return a - b;
    // }
    // const sortedChats = chats.sort(compareNumbers)
    // setChats(sortedChats);
  }

  return (
    <div className='app-container'>
      <ChatList chats={filteredChats} selectedChat={selectedChat} onSelectChat={setSelectedChat} searchTerm={searchTerm} onSearch={debouncedSearch} sortChats={sortChats} />
      <ChatWindow chat={selectedChat} />
    </div>
  );
};
