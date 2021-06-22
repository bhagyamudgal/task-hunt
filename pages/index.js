import Navigation from "../components/Navigation";
import Button from "../components/Button";
import styles from "../styles/home.module.css";

function HomePage(params) {
  return (
    <div className={styles.body_home}>
      <Navigation page="home"></Navigation>
      <div className={styles.heading_div}>
        <h1>
          A well designed solution for tracking Assignments.
        </h1>
      </div>

      <div className={styles.button_div}>
      <Button target="/signup" width="240px" text="Register Now" boxshadow="true" boxtype="true">Signup</Button>
      <Button target="/login" text="Login" width="200px" boxshadow="true" boxtype="true">Login</Button>
      </div>
    </div>
  );
}

export default HomePage;
