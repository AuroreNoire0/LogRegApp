import styles from './Home.module.css';

const Home = () => {
  return (
    <section className={styles.home_section}>
      <h1 className={styles.home}>
        <div className="d-flex justify-content-between">
          <span className="px-5">Join to the best</span>
          <span className={styles.highlight}>journey</span>{' '}
        </div>
        <div>
          <span>of your</span>
          <span className={styles.highlight}>life!</span>
        </div>
      </h1>
      <div className={styles.hero_shadow}></div>
    </section>
  );
};

export default Home;
