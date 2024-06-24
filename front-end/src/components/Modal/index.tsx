"use client";
import { FormEvent, useState, useEffect } from "react";
import styles from "./styles.module.css";

interface IFormData {
  name: string;
  description: string;
  size: string;
  price: string;
  imageUrl: string;
}

interface ModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  handleSubmit: (formData: IFormData) => void;
  formData: IFormData | null;
}

export default function Modal({
  showModal,
  handleCloseModal,
  handleSubmit,
  formData,
}: ModalProps) {
  const [formState, setFormState] = useState<IFormData>({
    name: "",
    description: "",
    size: "small",
    price: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (formData) {
      setFormState(formData);
    }
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(formState);
  };

  if (!showModal) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={handleCloseModal}>
          &times;
        </button>
        <h2>{formData ? "Editar Açai" : "Cadastrar Açai"}</h2>
        <form className={styles.form} onSubmit={onSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Descrição:
            <input
              type="text"
              name="description"
              value={formState.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Tamanho:
            <select
              name="size"
              value={formState.size}
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
              value={formState.price}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            URL da Imagem:
            <input
              type="text"
              name="imageUrl"
              value={formState.imageUrl}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className={styles.submitButton}>
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
