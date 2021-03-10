import React, { useState, useEffect, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [session, setSession] = useState({
    token: null,
    userId: null,
    username: null,
    userFirstName: null,
    userLastName: null,
    userPicture: null,
    userCrop: null,
    userIsSetup: false,
  });

  // Set session based on localStorage when App is mounted
  useEffect(() => {
    const mybookSession = JSON.parse(localStorage.getItem("@mybook:session"));
    if (mybookSession) {
      setSession(mybookSession);
    }
  }, []);

  // Store session in localStorage when session chaneges
  useEffect(() => {
    localStorage.setItem("@mybook:session", JSON.stringify(session));
  }, [session]);

  return (
    <GlobalContext.Provider
      value={{
        session: session,
        setSession: setSession,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
