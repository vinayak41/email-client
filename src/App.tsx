import React from "react";
import Filter from "./components/filter";
import MailList from "./components/mail-list";
import styles from "./app.module.css";
import MailView from "./components/mail-view/mail-view";

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Filter />
      <MailList />
      <MailView />
    </div>
  );
};

export default App;
