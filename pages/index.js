import Navigation from "../components/Navigation";
import styles from "../styles/home.module.css";

function HomePage(params) {
  return (
    <div className={styles.body_home}>
      <Navigation page="home"></Navigation>
    </div>
  );
}

export default HomePage;
