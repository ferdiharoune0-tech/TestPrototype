import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  selectedCompany: string | null;
  selectedBank: string | null;
  setSelectedCompany: (company: string | null) => void;
  setSelectedBank: (bank: string | null) => void;
  smsCode: string;
  setSmsCode: (code: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('interlink-theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const [selectedCompany, setSelectedCompanyState] = useState<string | null>(() => {
    return localStorage.getItem('interlink-company');
  });

  const [selectedBank, setSelectedBankState] = useState<string | null>(() => {
    return localStorage.getItem('interlink-bank');
  });

  const [smsCode, setSmsCodeState] = useState<string>(() => {
    return localStorage.getItem('interlink-sms-code') || '123456';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('interlink-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setSelectedCompany = (company: string | null) => {
    setSelectedCompanyState(company);
    if (company) {
      localStorage.setItem('interlink-company', company);
    } else {
      localStorage.removeItem('interlink-company');
    }
  };

  const setSelectedBank = (bank: string | null) => {
    setSelectedBankState(bank);
    if (bank) {
      localStorage.setItem('interlink-bank', bank);
    } else {
      localStorage.removeItem('interlink-bank');
    }
  };

  const setSmsCode = (code: string) => {
    setSmsCodeState(code);
    localStorage.setItem('interlink-sms-code', code);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        selectedCompany,
        selectedBank,
        setSelectedCompany,
        setSelectedBank,
        smsCode,
        setSmsCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
