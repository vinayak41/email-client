import React, { FC } from "react";
import styles from "./mail-view.module.css";
import { MailListItem } from "../../types";
import { useQuery } from "../../hooks/useQuery";
import { formatTimestamp } from "../../utils/date-time";
import BodySkeleton from "./body-skeleton";

interface MailViewPropsType extends MailListItem {
  addToFavorite: (id: string) => void;
  removeFromFavorite: (id: string) => void;
  isFavorite: boolean;
}

const MailView: FC<MailViewPropsType> = ({
  id,
  from,
  subject,
  date,
  isFavorite,
  addToFavorite,
  removeFromFavorite,
}) => {
  const { data, isLoading } = useQuery<{ id: string; body: string }>(
    "https://flipkart-email-mock.vercel.app/",
    { id }
  );

  return (
    <main className={styles.wrapper}>
      <section className={styles.content}>
        <div className={styles.header}>
          <span className={styles.avatar}>{from.name.at(0)}</span>
          <div>
            <h1>{subject}</h1>
            <p>{formatTimestamp(date)}</p>
          </div>
          <button
            className={styles.favoriteButton}
            onClick={() =>
              isFavorite ? removeFromFavorite(id) : addToFavorite(id)
            }
          >
            {isFavorite ? "Remove from" : "Mark as"} favorite
          </button>
        </div>
        {isLoading && !data?.body && <BodySkeleton />}
        {data?.body && (
          <article
            dangerouslySetInnerHTML={{
              __html: data.body,
            }}
          />
        )}
      </section>
    </main>
  );
};

export default MailView;
