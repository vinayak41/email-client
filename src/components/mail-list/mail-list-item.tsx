import React, { FC } from "react";
import { MailListItem as MailListItemType } from "../../types";
import styles from "./mail-list-item.module.css";
import { formatTimestamp } from "../../utils/date-time";

interface MailListItemPropsType extends MailListItemType {
  onClick: () => void;
  selected: boolean;
}

const MailListItem: FC<MailListItemPropsType> = ({
  from,
  date,
  subject,
  short_description,
  selected = false,
  onClick,
}) => {
  return (
    <li
      onClick={onClick}
      className={`${styles.wrapper} ${selected ? styles.selected : ""}`}
    >
      <span className={styles.avatar}>{from.name.at(0)}</span>
      <div>
        <p className={styles.from}>
          From:{" "}
          <strong>
            {from.name}
            {" <"}
            {from.email}
            {">"}
          </strong>{" "}
        </p>
        <p className={styles.subject}>
          Subject: <strong>{subject}</strong>{" "}
        </p>
        <p className={styles.shortDescription}>{short_description}</p>
        <div className={styles.dateAndFavButtonWrapper}>
          <p>{formatTimestamp(date)} </p>{" "}
          <button className={styles.favorite}>Favorite</button>
        </div>
      </div>
    </li>
  );
};

export default MailListItem;
