import style from '../styles/StyleWhats.module.css'
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import Chatlist from '../components/Chatlist';
import Intro from '../components/chatIntro';
import Chatwindow from '../components/chatWindow';
import NewChat from '../components/newChat';
import Login from '../components/Login';
import Api from '../api/Api';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Home() {

    const [chatList, setChatList] = useState([]);
    const [activeChat, setActiveChat] = useState({});
    const [showNweChat, setShowNewChat] = useState(false);
    const [user, setUser] = useState(null);
      
    useEffect(() => {
        if (user !== null) {
           let unsub =  Api.onChatList(user.id, setChatList);
            return unsub;
        }
    }, [user])
    const handleLoginData = async (user) => {
        const token = await user.getIdToken();
        let newUser = {
            id: user.uid,
            name: user.displayName,
            avatar: user.photoURL,
            token
        };
        await Api.addUser(newUser);
        setUser(newUser);
    }
   
    if (user === null ) {
        return (<Login onReceive={handleLoginData} />);
    }
    function logout(){
        Api.logout();
        setUser(null);
        console.log("ta aqui")
    }
    return (
        <div className={style.center}>
            <div className={style.corpo}>
                <NewChat
                    chatlist={chatList}
                    user={user}
                    show={showNweChat}
                    setShow={setShowNewChat}
                />
                <div className={style.header}>

                    <div className={style.imgBox}>
                        <img src={user.avatar} alt="user" className={style.imgUser} />
                    </div>
                    <div className={style.iconsGroup}>
                        {/* <div className={style.icons}>
                            <DonutLargeIcon style={{ color: 'white' }} />
                        </div> */}
                        <div className={style.icons} onClick={() => setShowNewChat(true)}>
                            <ChatIcon style={{ color: 'white' }} />
                        </div>
                        <div className={style.icons} onClick={logout}>
                            <LogoutIcon style={{ color: 'white' }} />
                        </div>
                    </div>
                </div>

                <div className={style.top}>
                    <div className={style.pesquisar}>
                        <div className={style.svgPesquisar}> <SearchIcon style={{ color: 'rgba(134,150,160,0.15)' }} /></div>
                        <input type="search" placeholder="Pesquisar" className={style.pesquisaInput} />
                    </div>
                </div>
                <div className={style.main}>
                    {chatList.map((item, key) => (
                        <Chatlist
                            key={key}
                            active={activeChat.chatId === chatList[key].chatId}
                            data={item}
                            onClick={() => setActiveChat(chatList[key])}
                        />
                    ))}

                </div>

                <div className={style.intro}>
                    {activeChat.chatId !== undefined && <Chatwindow user={user} data={activeChat}/>}

                    {activeChat.chatId === undefined && <Intro />}
                </div>

            </div>


        </div>

    )
}