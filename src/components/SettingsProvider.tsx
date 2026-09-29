"use client";

import { createContext, useContext, ReactNode } from "react";

type SettingsContextType = {
  settings: Record<string, string>;
  getSetting: (key: string, fallback: string) => string;
};

const SettingsContext = createContext<SettingsContextType>({
  settings: {},
  getSetting: (key, fallback) => fallback,
});

export function SettingsProvider({
  initialSettings,
  children,
}: {
  initialSettings: Record<string, string>;
  children: ReactNode;
}) {
  const getSetting = (key: string, fallback: string) => {
    return initialSettings[key] || fallback;
  };

  return (
    <SettingsContext.Provider value={{ settings: initialSettings, getSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
