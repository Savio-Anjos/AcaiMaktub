"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSelector } from "react-redux";
import {
  createAcai,
  selectError,
  selectLoading,
  fetchAcais,
  selectAcais,
} from "@/store/slices/acaiSlice";
import { useAppDispatch } from "@/store";
import { Card } from "@/components/Card";
import Modal from "@/components/Modal";

interface IFormData {
  name: string;
  description: string;
  size: string;
  price: string;
  imageUrl: string;
}

export default function Products() {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const acais = useSelector(selectAcais);

  useEffect(() => {
    dispatch(fetchAcais());
  }, [dispatch]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (formData: IFormData) => {
    dispatch(createAcai({ ...formData, price: parseFloat(formData.price) }))
      .unwrap()
      .then(() => {
        dispatch(fetchAcais());
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Failed to create acai:", err);
      });
  };

  return (
    <>
      <section className={styles.createAcai}>
        <button className={styles.button} onClick={handleOpenModal}>
          Cadastrar Açai
        </button>
      </section>

      <Modal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
      />

      <section className={styles.containerCards}>
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
        <ul>
          <Card acais={acais} />
        </ul>
      </section>
    </>
  );
}
