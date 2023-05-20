import styles from "./page.module.css";
import Session from "@/components/Session";
export default function Home() {
  return (
    <main className={styles.main}>
      <Session />
    </main>
  );
}
