import React, { useState } from "react";
import styles from "./filter.module.css";

const Filter = () => {
  const [selected, setSelected] = useState<string>("Read");

  const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLButtonElement;

    // Check if the clicked element is a button with a value
    if (target.tagName === "BUTTON" && target.value) {
      setSelected(target.value);
    }
  };

  return (
    <header onClick={handleSelect} className={styles.wrapper}>
      <span className={styles.label}>Filter By:</span>
      <div className={styles.options}>
        {["Unread", "Read", "Favorites"].map((filterItm) => (
          <button
            key={filterItm}
            value={filterItm}
            className={`${styles.button} ${
              selected === filterItm ? styles.active : ""
            }`}
          >
            {filterItm}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Filter;
