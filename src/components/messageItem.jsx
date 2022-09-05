
import { style } from '@mui/system'
import styles from '../styles/MessageItem.module.css'
export default function MessageItem({data,user}) {
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
                    <span>18:11</span>
                </div>
            </div>
        </div>
    )
}