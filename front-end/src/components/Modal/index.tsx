import { FormEvent, useState } from "react";
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
}

export default function Modal({
  showModal,
  handleCloseModal,
  handleSubmit,
}: ModalProps) {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    description: "",
    size: "Small",
    price: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={handleCloseModal}>
          &times;
        </button>
        <h2>Cadastrar Açai</h2>
        <form className={styles.form} onSubmit={onSubmit}>
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
  );
}
