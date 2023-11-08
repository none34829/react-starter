import { useState } from "react";

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [todos, setTodos] = useState([]);

  return (
    <main className={`${styles.main} ${inter.className}`}>
      <div className={styles.header}>
        <div className={styles.inputContainer}>
          <input placeholder="Add a todo..." style={{ width: 325 }} />{" "}
          <button>Add todo</button>
        </div>
      </div>
    </main>
  );
}
