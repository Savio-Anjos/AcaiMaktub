import Image from "next/image";
import styles from "./style.module.css";

export const Header = () => {
  return (
    <main className={styles.container}>
      <nav className={styles.nav}>
        <Image alt="Logo" src={"/logo.png"} width={75} height={65} />
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    </main>
  );
};
