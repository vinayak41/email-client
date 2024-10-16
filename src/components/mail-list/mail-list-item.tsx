import React, { FC } from "react";
import { MailListItem as MailListItemType } from "../../types";
import styles from "./mail-list-item.module.css";
import { formatTimestamp } from "../../utils/date-time";

console.log(styles)

const MailListItem: FC<MailListItemType> = ({
  from,
  date,
  subject,
  short_description,
}) => {
  return (
    <li className={styles.wrapper}>
      <span className={styles.avatar}>{from.name.at(0)}</span>
      <div>
        <p className={styles.from}>
          From:{" "}
          <strong>
            {from.name} {from.email}
          </strong>{" "}
        </p>
        <p className={styles.subject}>
          Subject: <strong>{subject}</strong>{" "}
        </p>
        <p className={styles.shortDescription}>{short_description}</p>
        <div className={styles.dateAndFavButtonWrapper} >
          <p>{formatTimestamp(date)} </p> <button className={styles.favorite} >Favorite</button>
        </div>
      </div>
    </li>
  );
};

export default MailListItem;
