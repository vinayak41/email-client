import React, { useEffect, useState } from "react";
import Filter from "./components/filter";
import MailList from "./components/mail-list";
import styles from "./app.module.css";
import MailView from "./components/mail-view/mail-view";
import { MailListItem } from "./types";
import useFavorites from "./hooks/useFavorites";
import useReadEmailIds from "./hooks/useReadEmails";

const App = () => {
  const [selectedMail, setSelectedMail] = useState<MailListItem | null>(null);
  const [filter, setFilter] = useState("");
  const {
    isFavorite: isEmailFavorited,
    addToFavorite,
    removeFromFavorite,
  } = useFavorites();
  const { isEmailRead, markEmailAsRead } = useReadEmailIds();

  useEffect(() => {
    if (selectedMail?.id) {
      markEmailAsRead(selectedMail.id);
    }
  }, [selectedMail]);

  return (
    <div className={styles.wrapper}>
      <Filter value={filter} onChange={setFilter} />
      <MailList
        onSelect={setSelectedMail}
        selectedId={selectedMail?.id}
        isEmailFavorited={isEmailFavorited}
        isEmailRead={isEmailRead}
        filter={filter}
      />
      {selectedMail && (
        <MailView
          {...selectedMail}
          addToFavorite={addToFavorite}
          removeFromFavorite={removeFromFavorite}
          isFavorite={isEmailFavorited(selectedMail.id)}
        />
      )}
    </div>
  );
};

export default App;
