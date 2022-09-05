import style from '../styles/Intro.module.css'

export default function Intro() {
    return (
        <div className={style.container}>
            <h1>Clone WhatsApp</h1>
            <p>Agora você pode enviar e receber mensagens
                sem precisar manter seu celular conectado à internet.</p>
        </div>
    )
}