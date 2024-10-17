import React from "react";
import Skeleton from "../ui/skeleton";
import styles from "./mail-list-item.module.css";

const MailListSkeleton = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {[...new Array(3)].map(() => (
        <li className={styles.wrapper}>
          <Skeleton
            className={styles.avatar}
            width={"2.6rem"}
            height={"2.6rem"}
            style={{ borderRadius: "50%" }}
          ></Skeleton>
          <div>
            <Skeleton style={{ marginBottom: "12px", width: "80%" }}></Skeleton>
            <Skeleton style={{ marginBottom: "16px", width: "40%" }}></Skeleton>
            <Skeleton style={{ marginBottom: "12px" }}></Skeleton>
            <Skeleton style={{ marginBottom: "12px", width: "30%" }}></Skeleton>
          </div>
        </li>
      ))}
    </div>
  );
};

export default MailListSkeleton;
