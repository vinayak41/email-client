import React, { useState } from "react";
import Filter from "./components/filter";
import MailList from "./components/mail-list";
import styles from "./app.module.css";
import MailView from "./components/mail-view/mail-view";
import { MailListItem } from "./types";

const App = () => {
  const [selectedMail, setSelectedMail] = useState<MailListItem | null>(null);
  return (
    <div className={styles.wrapper}>
      <Filter />
      <MailList onSelect={setSelectedMail} selectedId={selectedMail?.id} />
      {selectedMail && <MailView {...selectedMail} />}
    </div>
  );
};

export default App;
