"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";

type SettingsContextType = {
  settings: Record<string, any>;
  getSetting: <T = string>(key: string, fallback: T) => T;
  setSettingLocally: (key: string, value: any) => void;
};

const SettingsContext = createContext<SettingsContextType>({
  settings: {},
  getSetting: (key, fallback) => fallback,
  setSettingLocally: () => {},
});

export function SettingsProvider({
  initialSettings,
  children,
}: {
  initialSettings: Record<string, any>;
  children: ReactNode;
}) {
  const [settings, setSettings] = useState<Record<string, any>>(initialSettings || {});

  // Update state when initialSettings changes (e.g. from server actions / revalidate)
  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  const getSetting = <T = string>(key: string, fallback: T): T => {
    if (settings[key] !== undefined && settings[key] !== null && settings[key] !== "") {
      return settings[key] as T;
    }
    return fallback;
  };

  const setSettingLocally = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, getSetting, setSettingLocally }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
