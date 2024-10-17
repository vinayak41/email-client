import React, { useState } from "react";
import Filter from "./components/filter";
import MailList from "./components/mail-list";
import styles from "./app.module.css";
import MailView from "./components/mail-view/mail-view";
import { MailListItem } from "./types";
import useFavorites from "./hooks/useFavorites";

const App = () => {
  const [selectedMail, setSelectedMail] = useState<MailListItem | null>(null);
  const {
    isFavorite: isEmailFavorited,
    addToFavorite,
    removeFromFavorite,
  } = useFavorites();

  return (
    <div className={styles.wrapper}>
      <Filter />
      <MailList
        onSelect={setSelectedMail}
        selectedId={selectedMail?.id}
        isEmailFavorited={isEmailFavorited}
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
