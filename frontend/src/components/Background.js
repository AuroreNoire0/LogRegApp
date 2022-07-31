import AdminPanel from './views/AdminPanel';
import styles from './Background.module.css';

const Background = () => {
  return (
    <section className={styles.background}>
      <AdminPanel></AdminPanel>
      <div className={styles.hero_shadow}></div>
    </section>
  );
};

export default Background;
