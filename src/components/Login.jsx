import styles from '../styles/Login.module.css';
import Api from '../api/Api';
import Image from 'next/image';

export default function Login({ onReceive }) {

    const handleFaceLogin = async () => {
        let result = await Api.fbPopup();
        if (result) {
            onReceive(result.user);
        } else {
            alert("erro!");
        }
    }
    const handleGoogleLogin = async () => {
        let result = await Api.googlePopup();
        if (result) {
            onReceive(result.user);
        } else {
            alert("erro!");
        }
    }

    return (
        <div className={styles.container}>

            <div className={styles.login}>
                <div className={styles.title}>
                    <span>Login</span>
                </div>
                <div className={styles.groupButtons}>
                    <button className={styles.buttonFace} onClick={handleFaceLogin}>
                        <Image src="/FaceLogo.svg" width={40} height={40} />
                        <span> Logar com Facebook</span>
                    </button>
                    <button className={styles.buttonGoogle} onClick={handleGoogleLogin}>
                        <Image src="/googleLogo.svg" width={40} height={40} />
                        <span>Logar com Google</span>
                    </button>
                </div>
            </div>
        </div>
    )
}