import style from '../styles/ChatWindow.module.css'
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { animate, motion } from "framer-motion";
import MessageItem from './messageItem'
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from 'react';
//-------------------SSR OFF
const EmojiPicker = dynamic(
    () => {
        return import("emoji-picker-react");
    },
    { ssr: false }
);

export default function ChatW({ user }) {
    
    //----------------------------codigo microfone (start)
    let recognition = null;
    let SpeechRecognition  = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if(SpeechRecognition !== undefined){
        recognition = new SpeechRecognition();
    }
     //----------------------------codigo microfone (end)

     //--------------------------------------STATES (start)
    const body =useRef();
     const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [listening,setListening]=useState(false);
    const [list,setList]=useState([
        {author: 123, body:"texto de exemplo para a aplicação 1"},
        {author: 123,body:"texto de exemplo 2"},
        {author: 1234,body:"exemplo  3"},
        {author: 123, body:"texto de exemplo para a aplicação 2"},
        {author: 123,body:"texto de exemplo 2"},
        {author: 1234,body:"exemplo  3"},
        {author: 123, body:"texto de exemplo para a aplicação 3"},
        {author: 123,body:"texto de exemplo 2"},
        {author: 1234,body:"exemplo  3"},
        {author: 123, body:"texto de exemplo para a aplicação 4"},
        {author: 123,body:"texto de exemplo 2"},
        {author: 1234,body:"exemplo  3"},
        {author: 123, body:"texto de exemplo para a aplicação 5"},
        {author: 123,body:"texto de exemplo 2"},
        {author: 1234,body:"exemplo  3"},
        {author: 123, body:"texto de exemplo para a aplicação 6"},
        {author: 123,body:"texto de exemplo 2"},
        {author: 1234,body:"exemplo  3"},
        {author: 123, body:"texto de exemplo para a aplicação 7"},
        {author: 123,body:"texto de exemplo 2"},
        {author: 1234,body:"exemplo  3"},
        {author: 123, body:"texto de exemplo para a aplicação 8"},
        {author: 123,body:"texto de exemplo 2"},
        {author: 1234,body:"exemplo  3"}
    ]);
    //--------------------------------------STATES (end)

    useEffect(()=>{
        if(body.current.scrollHeight > body.current.offsetHeight){
           body.current.scrollTop =body.current.scrollHeight - body.current.offsetHeight; 
        }
    },[list])


    const handleOpenEmoji = () => {
        setIsOpen(true);
    }

    const handleEmojiClick = (e, emojiObject) => {
        setText(text + emojiObject.emoji);
    }

     //----------------------------function microfone (start)
    const handleMicClick = () =>{
        if(recognition !== null){
            console.log("ta auqi");
            recognition.onstart = () =>{
                setListening(true);
            }
            recognition.onend = () =>{
                setListening(false);
            }
            recognition.onresult = (e) =>{
                setText(e.results[0][0].transcript);
            }

            recognition.start()
        }
    }
    //----------------------------function microfone (end)

    return (

        <div className={style.windowMain}>
            < div className={style.header2}>
                <div className={style.boxHeader1}>
                    <div className={style.imgPerfil2}>
                        <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg" alt="user" className={style.imgUser} />
                    </div>
                    <div className={style.nomeHeader2}>
                        <span>{user.name}</span>
                    </div>
                </div>
                <div className={style.boxHeader}>
                    <div className={style.svgPesquisarHeader}>
                        <SearchIcon style={{ color: 'white' }} />
                    </div>
                    <div className={style.iconMore}>
                        <MoreVertIcon style={{ color: 'white' }} />

                    </div>
                </div>
            </div>
            <div ref={body} className={style.window}>
                {list.map((item,key)=>(
                    <MessageItem
                    key={key}
                    data={item}
                    user={user}
                    />
                ))}

                <div className={style.boxListEmoji}
                    style={{ display: isOpen ? '' : 'none' }}
                    >
                    < EmojiPicker disableSearchBar disableSkinTonePicker
                        pickerStyle={{ width: 'auto', boxShadow: 'none', border: 'none' }}
                        onEmojiClick={handleEmojiClick} />

                </div>
            </div>
            <div className={style.input}>
                <div className={style.boxInput1}>

                    {isOpen ? <div
                        className={style.emoji}
                        onClick={() => setIsOpen(false)}>
                        <CloseIcon style={{ color: 'white' }} />
                    </div> : ''}
                    <div className={style.emoji} onClick={handleOpenEmoji}>
                        <InsertEmoticonIcon style={{ color: isOpen ? '#00a884' : 'white' }} />
                    </div>

                </div>
                <div className={style.boxInputpMain}>
                    <input type="text"
                        placeholder="Mensagem "
                        className={style.pesquisaInputMain}
                        value={text}
                        onChange={e => setText(e.target.value)} />
                    <div className={style.mic}>
                        {text === '' ?
                            <div onClick={handleMicClick} className={style.emoji}>
                                <MicIcon style={{ color: listening ? "#126ece" : 'white' }} />
                            </div> : 
                            <div className={style.emoji}>
                                <SendIcon style={{ color: 'white' }} />
                            </div>}
                    </div>
                </div>
            </div>
        </div>

    )
}