import styles from '../styles/Login.module.css';
import Api from '../api/Api';

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
            <button onClick={handleFaceLogin}>Logar com Facebook</button>
            <button onClick={handleGoogleLogin}>Logar com Google</button>

        </div>
    )
}