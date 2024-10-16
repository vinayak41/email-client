import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./mail-list.module.css";
import { useQuery } from "../../hooks/useQuery";
import { MailListItem as MailListItemType } from "../../types";
import MailListItem from "./mail-list-item";

const MailList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const { data: listData, isLoading } = useQuery<{
    list: MailListItemType[];
    total: number;
  }>("https://flipkart-email-mock.vercel.app/", {
    page: currentPage.toString(),
  });
  const listRef = useRef<HTMLUListElement | null>(null);

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
    <aside className={styles.wrapper}>
      <ul ref={listRef} className={styles.list}>
        {listData?.list.map((email) => (
          <MailListItem {...email} />
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
