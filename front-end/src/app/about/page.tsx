import styles from "./page.module.css";

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1>Sobre a Empresa</h1>
      <p>
        Somos apaixonados por açaís de qualidade e queremos compartilhar essa
        paixão com você! Nossa empresa foi fundada com o objetivo de oferecer os
        melhores açaís, preparados com ingredientes naturais e cuidadosamente
        selecionados.
      </p>
      <p>
        Valorizamos a sustentabilidade e a saúde, por isso trabalhamos com
        produtores locais e sustentáveis para garantir que cada tigela de açaí
        que servimos não apenas seja deliciosa, mas também contribua para um
        mundo melhor.
      </p>
      <p>
        Além de açaís deliciosos, também oferecemos uma variedade de opções
        personalizadas para atender a todos os gostos e necessidades. Nossa
        missão é proporcionar uma experiência incrível a cada cliente que visita
        nossa loja ou faz um pedido online.
      </p>
      <p>
        Venha nos visitar e descubra por que somos a escolha número um para
        amantes de açaí em nossa comunidade. Estamos ansiosos para servi-lo!
      </p>
    </div>
  );
};

export default About;
