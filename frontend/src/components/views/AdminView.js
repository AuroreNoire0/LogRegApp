import AdminPanel from './AdminPanel';
import styles from './AdminView.module.css';

const AdminView = props => {
  return (
    <section className={styles.background}>
      <AdminPanel onLogout={props.onLogout}></AdminPanel>
      <div className={styles.hero_shadow}></div>
    </section>
  );
};

export default AdminView;
