import styles from './Home.module.css';

const Home = () => {
  return (
    <section className={styles.home_section}>
      <h1 className={styles.home}>Join us!</h1>
      <div className={styles.hero_shadow}></div>
    </section>
  );
};

export default Home;
