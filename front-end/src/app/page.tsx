"use client";
import styles from "./page.module.css";
import { useAppDispatch } from "@/store";
import { useAppSelector } from "@/store/hooks";
import {
  fetchAcais,
  selectAcais,
  selectError,
  selectLoading,
} from "@/store/slices/acaiSlice";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const acais = useAppSelector(selectAcais);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchAcais());
  }, [dispatch]);

  const hasLoadedAcais = acais.length > 0;

  return (
    <main className={styles.main}>
      <h1>Açaís</h1>
      {loading && !hasLoadedAcais && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {acais.map((acai) => (
          <li key={acai.id} className={styles.acaiItem}>
            <h2>{acai.name}</h2>
            <p>{acai.description}</p>
            <p>Size: {acai.size}</p>
            <p>Price: {acai.price}</p>
            <img
              src={acai.imageUrl}
              alt={acai.name}
              className={styles.acaiImage}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
