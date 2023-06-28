/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "../styles/Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <Link href="/">
          <a className={styles.a}>
            <h1>Image Carousel</h1>
          </a>
        </Link>
        <Link href="/">
          <a className={styles.a}>
            <i className="fas fa-image"></i>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Header;
