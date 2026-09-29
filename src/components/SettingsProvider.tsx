"use client";

import { createContext, useContext, ReactNode, useState } from "react";

type SettingsContextType = {
  settings: Record<string, unknown>;
  getSetting: <T = string>(key: string, fallback: T) => T;
  setSettingLocally: (key: string, value: unknown) => void;
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
  initialSettings: Record<string, unknown>;
  children: ReactNode;
}) {
  const [settings, setSettings] = useState<Record<string, unknown>>(initialSettings || {});
  const [prevInitial, setPrevInitial] = useState<Record<string, unknown>>(initialSettings);

  // Sync state if initialSettings prop changes without triggering cascading effect renders
  if (initialSettings !== prevInitial) {
    setPrevInitial(initialSettings);
    setSettings(initialSettings || {});
  }

  const getSetting = <T = string>(key: string, fallback: T): T => {
    if (settings[key] !== undefined && settings[key] !== null && settings[key] !== "") {
      return settings[key] as T;
    }
    return fallback;
  };

  const setSettingLocally = (key: string, value: unknown) => {
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
