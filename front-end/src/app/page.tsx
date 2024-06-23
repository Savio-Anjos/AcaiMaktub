import styles from "./page.module.css";
import Image from "next/image";
import { Header } from "./components/Header";
export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <section className={styles.content}>
          <div className={styles.title}>
            <div className={styles.wordWaves}>
              <span>Açaiteria</span>
              <span>Açaiteria</span>
            </div>
          </div>
          <h3>
            Os melhores açaís, com sabores únicos e frescor incomparável, você
            só encontra aqui!
          </h3>

          <button className={styles.button}>Ver Produtos</button>
        </section>

        <section className={styles.image}>
          <Image alt="Açais" src="/acais.jpg" width={470} height={660} />
        </section>
      </main>
    </>
  );
}
