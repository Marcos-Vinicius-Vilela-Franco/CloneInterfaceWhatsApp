import { useEffect, useState } from 'react'
import styles from '../styles/MessageItem.module.css'
export default function MessageItem({data,user}) {
    const [time, setTime] = useState('');
    useEffect(() => {
        if (data.date > 0) {
            let d = new Date(data.date.seconds * 1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            setTime(`${hours}:${minutes}`);
        }
    }, [data]);
    return (
        <div 
        className={ user.id === data.author ? styles.line : styles.line2}
        

        >
            <div className={styles.posiTriangulo}>
            <span className={user.id === data.author ? styles.triangulo2 : styles.triangulo}></span>
            </div>
            <div className={user.id === data.author ? styles.message2 : styles.message}>
                <div className={styles.text}>
                    <span>{data.body}</span>
                </div>
                <div className={styles.date}>
                    <span>{time}</span>
                </div>
            </div>
        </div>
    )
}