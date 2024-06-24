import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
export default function Home() {
  return (
    <>
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

          <Link href="/products">
            <button className={styles.button}>Ver Produtos</button>
          </Link>
        </section>

        <section className={styles.image}>
          <Image alt="Açais" src="/acais.jpg" width={470} height={660} />
        </section>
      </main>
    </>
  );
}
