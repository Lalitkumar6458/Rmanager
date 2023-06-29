/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
const userAuth=localStorage.getItem("User")
  const LogoutFun=()=>{
    localStorage.removeItem("User")
router.push("/login")
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          
            <h1>Logo</h1>
      
        </Link>

        <ul>
          <li> 
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/post">Post</Link>
          </li>
        </ul>
        <div className={styles.auth}>
          {!userAuth ?<>
            <Link href="/login">Login</Link>
            <Link href="/Signup">SignUp</Link>
          </>:null

          }
      

          <Link href="#" onClick={()=>LogoutFun()}>Logout</Link>

     </div>
      </div>
    </div>
  );
};

export default Header;
