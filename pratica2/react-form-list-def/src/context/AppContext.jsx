import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems(prev => [...prev, item]);
  };

  return (
    <AppContext.Provider value={{ items, addItem }}>
      {children}
    </AppContext.Provider>
  );
}
