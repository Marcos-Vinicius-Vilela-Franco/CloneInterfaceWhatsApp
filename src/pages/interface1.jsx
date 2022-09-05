import style from '../styles/StyleWhats.module.css'
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import Chatlist from '../components/Chatlist';
import Intro from '../components/chatIntro';
import Chatwindow from '../components/chatWindow';
import NewChat from '../components/newChat';



export default function Home() {
    
    const [chatList, setChatList] = useState([
        { chatId: 1, title: 'Claudio', image: "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg" },
        { chatId: 2, title: 'Marcos', image: "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg" },
        { chatId: 3, title: 'Adeir', image: "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg" },
        { chatId: 4, title: 'Fausto Silva', image: "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg" },
        { chatId: 5, title: 'Manoel', image: "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg" },
        { chatId: 6, title: 'Amavelino', image: "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg" },

    ]);
    const [activeChat, setActiveChat] = useState({});
    const[showNweChat,setShowNewChat]=useState(false);
    const [user,setUser]=useState({
        id:1234,
        avatar:"https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg",
        name:"Marcos Vinicius"
    })
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
                        <div className={style.icons}>
                            <DonutLargeIcon style={{ color: 'white' }} />
                        </div>
                        <div className={style.icons} onClick={()=>setShowNewChat(true)}>
                            <ChatIcon style={{ color: 'white' }} />
                        </div>
                        <div className={style.icons}>
                            <MoreVertIcon style={{ color: 'white' }} />
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
                    {activeChat.chatId !== undefined && <Chatwindow  user={user}/> }
                    
                    {activeChat.chatId === undefined && <Intro />}
                </div>

            </div>


        </div>

    )
}