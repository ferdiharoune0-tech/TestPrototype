import React from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { COMPANIES, BANKS } from '../data/constants';
import { Logo } from '../components/Logo';
import { Sun, Moon, ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme, selectedCompany, selectedBank, setSelectedCompany, setSelectedBank } = useApp();

  const handleNavigate = () => {
    if (selectedCompany && selectedBank) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-emerald)] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[var(--color-emerald)] to-[var(--color-gold)] rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-8 py-6 flex items-center justify-between">
        <Logo size={50} showText={true} />
        <button
          onClick={toggleTheme}
          className="glass p-3 rounded-xl hover:bg-white/20 transition-all"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            InterLink <span style={{ color: 'var(--color-emerald)' }}>Dz</span>
          </h1>
          <p className="text-2xl mb-2" style={{ color: 'var(--color-navy)' }}>
            Première Plateforme B2B de Digitalisation Bancaire en Algérie
          </p>
          <p className="text-lg opacity-70">
            Connectez votre entreprise à votre banque en quelques clics
          </p>
        </div>

        {/* Companies grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sélectionnez votre entreprise</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {COMPANIES.map((company) => (
              <button
                key={company}
                onClick={() => setSelectedCompany(company)}
                className={`glass p-6 rounded-2xl transition-all hover:scale-105 ${
                  selectedCompany === company
                    ? 'ring-2 ring-[var(--color-emerald)] bg-[var(--color-emerald)]/10'
                    : 'hover:bg-white/30'
                }`}
              >
                <div className="text-center font-medium">{company}</div>
                {selectedCompany === company && (
                  <div className="mt-2 w-2 h-2 rounded-full bg-[var(--color-emerald)] mx-auto" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Banks grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sélectionnez votre banque</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {BANKS.map((bank) => (
              <button
                key={bank}
                onClick={() => setSelectedBank(bank)}
                className={`glass p-6 rounded-2xl transition-all hover:scale-105 ${
                  selectedBank === bank
                    ? 'ring-2 ring-[var(--color-navy)] bg-[var(--color-navy)]/10'
                    : 'hover:bg-white/30'
                }`}
              >
                <div className="text-center font-medium">{bank}</div>
                {selectedBank === bank && (
                  <div className="mt-2 w-2 h-2 rounded-full bg-[var(--color-navy)] mx-auto" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Selection summary and CTA */}
        <div className="glass-strong p-8 rounded-3xl max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <p className="text-lg mb-2">Sélection actuelle :</p>
            <p className="text-2xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {selectedCompany ? (
                <span style={{ color: 'var(--color-emerald)' }}>{selectedCompany}</span>
              ) : (
                <span className="opacity-50">Aucune entreprise</span>
              )}
              <span className="mx-4">×</span>
              {selectedBank ? (
                <span style={{ color: 'var(--color-navy)' }}>{selectedBank}</span>
              ) : (
                <span className="opacity-50">Aucune banque</span>
              )}
            </p>
          </div>

          <button
            onClick={handleNavigate}
            disabled={!selectedCompany || !selectedBank}
            className={`px-8 py-4 rounded-xl font-semibold text-white flex items-center gap-3 mx-auto transition-all ${
              selectedCompany && selectedBank
                ? 'bg-gradient-to-r from-[var(--color-navy)] to-[var(--color-emerald)] hover:scale-105 hover:shadow-xl'
                : 'bg-gray-400 cursor-not-allowed opacity-50'
            }`}
          >
            Interface de suivi
            <ArrowRight size={20} />
          </button>

          {(!selectedCompany || !selectedBank) && (
            <p className="mt-4 text-sm opacity-70">
              Veuillez sélectionner une entreprise et une banque pour continuer
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 mt-16 border-t border-border/30">
        <p className="text-sm opacity-70">
          © 2026 InterLink Dz - Digitalisation Bancaire B2B
        </p>
      </footer>
    </div>
  );
};
