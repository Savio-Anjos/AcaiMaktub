import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";

export const Header = () => {
  return (
    <main className={styles.container}>
      <nav className={styles.nav}>
        <Link href={"/"}>
          <Image alt="Logo" src={"/logo.png"} width={110} height={85} />
        </Link>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
};
