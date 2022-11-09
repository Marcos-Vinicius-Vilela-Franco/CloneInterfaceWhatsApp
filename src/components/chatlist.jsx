import { useEffect, useState } from 'react'
import style from '../styles/ChatlistItem.module.css'
import Image from 'next/image';
export default function Chatlist({ onClick, active, data }) {
    const [time, setTime] = useState('');
    useEffect(() => {
        if (data.lastMessageDate > 0) {
            let d = new Date(data.lastMessageDate.seconds * 1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            setTime(`${hours}:${minutes}`);
        }
    }, [data]);
    return (
        <div className={`${active ? style.chatActive : style.chat}`} onClick={onClick}>
            <div className={style.imgPerfil}>
                <div className={style.imgtemp}>
                    <Image src={data.image} width={50} height={50} alt="Contact Image" />
                </div>
            </div>
            <div className={style.cardChat}>

                <div className={style.nome}>
                    <span className={style.spanNome}>{data.title}</span>
                    <span className={style.spanHora}>{time}</span>
                </div>
                <div className={style.lastMsg}>
                    <p className={style.spanmsg}>{data.lastMsg}</p>
                </div>

            </div>
        </div>
    )
}