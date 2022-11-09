import styles from '../styles/NewChat.module.css'
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useState, useEffect } from 'react'
import Api from '../api/Api'

export default function NewChat({ show, setShow, user, chatlist }) {
    const [list, setlist] = useState([]);

    useEffect(() => {
        const getList = async () => {
            if (user !== null) {
                let results = await Api.getContactList(user.id)
                setlist(results);
            }
        }
        getList()
    }, [user])

    function handleClose() {
        setShow(false)
    }
    const addNewChat = async (user2) => {
            await Api.addNewChat(user,user2);
            handleClose();
    }


    return (

        <div className={show ? styles.container : styles.container2}>
            <div className={styles.header}>
                <div className={styles.backbutton} onClick={handleClose}>
                    <ArrowBackIcon />
                </div>
                <div className={styles.headertitle}>
                    <span>Nova Conversa</span>
                </div>
            </div>

            {list.map((item, key) => (
                <div onClick={() => addNewChat(item)} className={styles.chat} key={key}>
                    <div className={styles.imgPerfil}>
                        <div className={styles.imgtemp}>
                            <img src={item.avatar} alt="user" className={styles.imgUser} />
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