import styles from '../styles/NewChat.module.css'
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

import { useState } from 'react'
export default function NewChat({show,setShow,user,chatlist}) {
    const [list, setlist] = useState([
        { id: 123, avatar:"https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg", name: "Marcos" },
        { id: 123, avatar:"https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg", name: "Claudio" },
        { id: 123, avatar:"https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg", name: "Renato" },
        { id: 123, avatar:"https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg", name: "Marcos" },
    ]);
     function handle() {
        setShow(false)
    }
    return (

        <div className={show?styles.container:styles.container2}>
            <div className={styles.header}>
                <div className={styles.backbutton} onClick={handle}>
                    <ArrowBackIcon />
                </div>
                <div className={styles.headertitle}>
                    <span>Nova Conversa</span>
                </div>
            </div>
            
                {list.map((item, key) => (
                    <div className={styles.chat} key={key}>
                        <div className={styles.imgPerfil}>
                            <div className={styles.imgtemp}>
                            <img src={item.avatar} alt="user" className={styles.imgUser}/>
                            </div>
                        </div>
                        <div className={styles.cardChat}>
                            <div className={styles.nome}>
                                <span className={styles.spanNome}>{item.name}</span>
                            </div>

                        </div>
                    </div>
                ))}
            


        </div>

    )
}