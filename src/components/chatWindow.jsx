import style from '../styles/ChatWindow.module.css'
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import MessageItem from './messageItem'
import dynamic from "next/dynamic";
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Api from '../api/Api';
//-------------------SSR OFF
const EmojiPicker = dynamic(
    () => {
        return import("emoji-picker-react");
    },
    { ssr: false }
);

export default function ChatW({ user, data }) {

    //----------------------------codigo microfone (start)
    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }
    //----------------------------codigo microfone (end)

    //--------------------------------------STATES (start)
    const body = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [listening, setListening] = useState(false);
    const [list, setList] = useState([]);
    const [users,setUsers] =useState([]);
    //--------------------------------------STATES (end)
    useEffect(() => {
        setList([]);
        let unsub = Api.onChatContent(data.chatId, setList,setUsers);
        return unsub;
    }, [data.chatId])


    useEffect(() => {
        if (body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
    }, [list])

    
    const handleOpenEmoji = () => {
        setIsOpen(true);
    }

    const handleEmojiClick = (e, emojiObject) => {
        setText(text + emojiObject.emoji);
    }
    //-Enviar messagem se tecla Enter for pressionada
    const handleInputKeyUp = (e) => {
        
        if (e.keyCode == 13) {
            handleSendClick();
        }
    }
    const handleSendClick = () => {
        if (text !== '') {
            Api.sendMessage(data, user.id, 'text', text,users);
            setText('');
            setIsOpen(false);
        }
    }
    //----------------------------function microfone (start)
    const handleMicClick = () => {
        if (recognition !== null) {
            console.log("ta auqi");
            recognition.onstart = () => {
                setListening(true);
            }
            recognition.onend = () => {
                setListening(false);
            }
            recognition.onresult = (e) => {
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
                        <div className={style.imgUser} >
                            <Image src={data.image} width={40} height={40} alt="User Image" />
                        </div>
                    </div>
                    <div className={style.nomeHeader2}>
                        <span>{data.title}</span>
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
                {list.map((item, key) => (
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
                        onChange={e => setText(e.target.value)}
                        onKeyUp={handleInputKeyUp}
                    />
                    <div className={style.mic}>
                        {text === '' ?
                            <div onClick={handleMicClick} className={style.emoji}>
                                <MicIcon style={{ color: listening ? "#126ece" : 'white' }} />
                            </div> :
                            <div className={style.emoji} onClick={handleSendClick}>
                                <SendIcon style={{ color: 'white' }} />
                            </div>}
                    </div>
                </div>
            </div>
        </div>

    )
}