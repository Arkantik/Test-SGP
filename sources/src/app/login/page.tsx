import Image from "next/image";
import styles from "./login.module.css";
import LoginForm from "@/features/login/LoginForm";

export default function LoginPage() {
    return (
        <div className={styles.page}>
            <div className={styles.formPanel}>
                <h1 className={styles.title}>Les ateliers du Baobab</h1>
                <div className={styles.form}>
                    <LoginForm />
                </div>
            </div>

            <div className={styles.illustrationPanel}>
                <div className={styles.blob} />
                <Image
                    className={styles.illustration}
                    src="/illustration.svg"
                    alt="Illustration"
                    width={480}
                    height={372}
                    priority
                />
            </div>
        </div>
    );
}