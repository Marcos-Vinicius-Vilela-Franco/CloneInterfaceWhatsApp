import style from '../styles/ChatlistItem.module.css'

export default function Chatlist({onClick,active,data}) {
    
    return (
        <div className={`${active ? style.chatActive : style.chat}`} onClick={onClick}>
            <div className={style.imgPerfil}>
                <div className={style.imgtemp}>
                
                </div>
            </div>
            <div className={style.cardChat}>
                
                    <div className={style.nome}>
                       <span className={style.spanNome}>{data.title}</span> 
                       <span className={style.spanHora}>ontem</span>
                    </div>
                    <div className={style.lastMsg}>
                       <p className={style.spanmsg}> Ultima mensagem ontelmdm jdfsdf dfsdfsfdfd dsm marcos vinic oelmasd beamvo valoeri come maisq uqe tem comida boa la sei</p> 
                    </div>
                
            </div>
        </div>
    )
}