"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSelector } from "react-redux";
import {
  createAcai,
  updateAcai,
  selectError,
  selectLoading,
  fetchAcais,
  selectAcais,
  deleteAcai,
} from "@/store/slices/acaiSlice";
import { useAppDispatch } from "@/store";
import { Card } from "@/components/Card";
import Modal from "@/components/Modal";
import { IAcai, IAcaiState } from "@/store/slices/acaiSlice";

interface IFormData {
  name: string;
  description: string;
  size: string;
  price: string;
  imageUrl: string;
}

export default function Products() {
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAcai, setSelectedAcai] = useState<IAcai | null>(null);
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

  const handleOpenModal = (acai: IAcai | null = null) => {
    if (acai) {
      setSelectedAcai(acai);
      setFormData({
        name: acai.name,
        description: acai.description,
        size: acai.size,
        price: acai.price.toString(),
        imageUrl: acai.imageUrl,
      });
      setIsEditMode(true);
    } else {
      setSelectedAcai(null);
      setFormData({
        name: "",
        description: "",
        size: "small",
        price: "",
        imageUrl: "",
      });
      setIsEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (formData: IFormData) => {
    if (isEditMode && selectedAcai) {
      dispatch(
        updateAcai({
          ...selectedAcai,
          ...formData,
          price: parseFloat(formData.price),
        })
      )
        .unwrap()
        .then(() => {
          dispatch(fetchAcais());
          handleCloseModal();
        })
        .catch((err) => {
          console.error("Failed to update acai:", err);
        });
    } else {
      dispatch(
        createAcai({
          ...formData,
          price: parseFloat(formData.price),
        })
      )
        .unwrap()
        .then(() => {
          dispatch(fetchAcais());
          handleCloseModal();
        })
        .catch((err) => {
          console.error("Failed to create acai:", err);
        });
    }
  };

  return (
    <>
      <section className={styles.createAcai}>
        <button className={styles.button} onClick={() => handleOpenModal()}>
          Cadastrar Açai
        </button>
      </section>

      <Modal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        formData={formData} // Passa formData para o modal
      />

      <section className={styles.containerCards}>
        {loading && <p>Carregando...</p>}
        {error && <p>{error}</p>}
        <ul>
          <Card
            acais={acais}
            onEdit={(acai) => handleOpenModal(acai)}
            onDelete={(id) => dispatch(deleteAcai(id))}
          />
        </ul>
      </section>
    </>
  );
}
