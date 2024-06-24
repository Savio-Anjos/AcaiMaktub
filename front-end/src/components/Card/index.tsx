import { Edit, Trash2 } from "react-feather";
import styles from "./styles.module.css";
import { IAcai } from "@/store/slices/acaiSlice";

interface CardProps {
  acais: IAcai[];
  onEdit: (acai: IAcai) => void;
  onDelete: (id: string) => void;
}

export function Card({ acais, onEdit, onDelete }: CardProps) {
  return (
    <div className={styles.cards}>
      {acais.map((acai) => (
        <div className={styles.card} key={acai._id}>
          <li>
            <img src={acai.imageUrl} alt={acai.name} />
            <div className={styles.contentCard}>
              <div className={styles.cardCol1}>
                <h4>{acai.name}</h4>
                <p>{acai.description}</p>
              </div>
              <div>
                <p>{acai.size}</p>
                <p>R$ {acai.price.toFixed(2)}</p>
              </div>
            </div>
            <div className={styles.icons}>
              <Edit className={styles.icon} onClick={() => onEdit(acai)} />
              <Trash2
                className={styles.icon}
                onClick={() => onDelete(acai._id)}
              />
            </div>
          </li>
        </div>
      ))}
    </div>
  );
}
