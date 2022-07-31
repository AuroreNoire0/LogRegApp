import AdminPanel from './views/AdminPanel';
import styles from './AdminView.module.css';

const AdminView = () => {
  return (
    <section className={styles.background}>
      {/* <p>sf</p> */}
      <AdminPanel></AdminPanel>
      <div className={styles.hero_shadow}></div>
    </section>
  );
};

export default AdminView;
