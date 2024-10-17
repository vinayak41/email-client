import { useEffect, useState, useCallback, useMemo } from "react";

const useReadEmailIds = () => {
  const [readEmailIds, setReadEmailIds] = useState<string[]>([]);

  const isEmailRead = useCallback(
    (emailId: string) => readEmailIds.includes(emailId),
    [readEmailIds]
  );

  const markEmailAsRead = useCallback(
    (emailId: string) => {
      if (!isEmailRead(emailId)) {
        setReadEmailIds((prevIds) => [...prevIds, emailId]);
      }
    },
    [isEmailRead]
  );

  const markEmailAsUnread = useCallback(
    (emailId: string) => {
      if (isEmailRead(emailId)) {
        setReadEmailIds((prevIds) => prevIds.filter((id) => id !== emailId));
      }
    },
    [isEmailRead]
  );

  useEffect(() => {
    const storedReadEmailIds = localStorage.getItem("readEmailIds");
    if (storedReadEmailIds) {
      setReadEmailIds(storedReadEmailIds.split(","));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("readEmailIds", readEmailIds.join(","));
  }, [readEmailIds]);

  return useMemo(
    () => ({
      isEmailRead,
      markEmailAsRead,
      markEmailAsUnread,
      readEmailIds,
    }),
    [isEmailRead, markEmailAsRead, markEmailAsUnread, readEmailIds]
  );
};

export default useReadEmailIds;
