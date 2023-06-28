import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <i className="fab fa-facebook-square"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-twitter-square"></i>
      </div>
    </div>
  );
};

export default Footer;
