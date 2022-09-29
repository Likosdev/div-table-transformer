import { ReactElement } from "react";
import Navigation from "./Navigation";
import styles from "../styles/Home.module.css";
interface LayoutProps {
  children?: ReactElement | ReactElement[]
}

const Layout = (props: LayoutProps) => {
  return (
    <>
      <Navigation></Navigation>
      <main className="container"> 
        {props.children}
      </main>
      <footer className={styles.footer}>
      </footer>
    </>
  );
}

export default Layout;