import React, { FC, useState } from "react";
import styles from "./filter.module.css";

type FilterPropsType = {
  value: string;
  onChange: (value: string) => void;
};

const Filter: FC<FilterPropsType> = ({ value, onChange }) => {
  const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLButtonElement;

    if (target.tagName === "BUTTON" && target.value) {
      onChange(target.value === value ? "" : target.value);
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
              value === filterItm ? styles.active : ""
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
