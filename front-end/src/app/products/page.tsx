"use client";

import { FormEvent, useEffect, useState } from "react";
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
import { Trash2, Edit } from "react-feather";
import { Card } from "@/components/Card";

interface IFormData {
  name: string;
  description: string;
  size: string;
  price: string;
  imageUrl: string;
}

export default function Products() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    description: "",
    size: "small",
    price: "",
    imageUrl: "",
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createAcai({ ...formData, price: parseFloat(formData.price) }))
      .unwrap()
      .then(() => {
        dispatch(fetchAcais());
        handleCloseModal();
        setFormData({
          name: "",
          description: "",
          size: "Small",
          price: "",
          imageUrl: "",
        });
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

        {showModal && (
          <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                &times;
              </button>
              <h2>Cadastrar Açai</h2>
              <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                  Nome:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Descrição:
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Tamanho:
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    required
                  >
                    <option value="Small">Pequeno</option>
                    <option value="Average">Médio</option>
                    <option value="Big">Grande</option>
                    <option value="Extra Big">Extra Grande</option>
                  </select>
                </label>
                <label>
                  Preço:
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  URL da Imagem:
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    required
                  />
                </label>
                <button type="submit" className={styles.submitButton}>
                  Cadastrar
                </button>
              </form>
            </div>
          </div>
        )}
      </section>

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
