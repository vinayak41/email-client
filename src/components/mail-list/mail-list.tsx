import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import styles from "./mail-list.module.css";
import { useQuery } from "../../hooks/useQuery";
import { MailListItem as MailListItemType } from "../../types";
import MailListItem from "./mail-list-item";
import MailListSkeleton from "./mail-list-skeleton";

type MailListPropsType = {
  onSelect: (selectedMail: MailListItemType) => void;
  selectedId?: string;
  isEmailFavorited: (id: string) => boolean;
  isEmailRead: (id: string) => boolean;
  filter?: string;
};

const MailList: FC<MailListPropsType> = ({
  onSelect,
  selectedId,
  isEmailFavorited,
  isEmailRead,
  filter,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const { data: listData, isLoading } = useQuery<{
    list: MailListItemType[];
    total: number;
  }>("https://flipkart-email-mock.vercel.app/", {
    page: currentPage.toString(),
  });
  const listRef = useRef<HTMLUListElement | null>(null);

  const filteredEmails = useMemo(
    () =>
      listData?.list.filter((email) => {
        switch (filter) {
          case "Unread":
            return !isEmailRead(email.id);
          case "Read":
            return isEmailRead(email.id);
          case "Favorites":
            return isEmailFavorited(email.id);
          default:
            return true;
        }
      }),
    [filter, listData?.list]
  );

  const getPageSize = () => {
    if (listData && currentPage === 1 && !numberOfPages) {
      setNumberOfPages(Math.ceil(listData.total / listData.list.length));
    }
  };

  // get page size
  useEffect(() => getPageSize(), [listData?.list.length, currentPage]);
  useEffect(() => {
    listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <aside
      className={`${styles.wrapper} ${!selectedId ? styles.fullWidth : ""}`}
    >
      <ul ref={listRef} className={styles.list}>
        {isLoading && <MailListSkeleton />}
        {filteredEmails?.length === 0 && (
          <p className={styles.noMailForFilter}>
            No matching emails for the selected filter.
          </p>
        )}
        {filteredEmails?.map((email) => (
          <MailListItem
            onClick={() => onSelect(email)}
            {...email}
            selected={selectedId === email.id}
            isFavorite={isEmailFavorited(email.id)}
            isRead={isEmailRead(email.id)}
          />
        ))}
      </ul>
      <div className={styles.pagination}>
        <span>Page: </span>{" "}
        {Array.from({ length: numberOfPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? styles.active : ""}
            >
              {page}
            </button>
          )
        )}
      </div>
    </aside>
  );
};

export default MailList;
