import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { MENU_PAGES } from '../data/constants';
import {
  Sun, Moon, Menu, X, ChevronRight, Home,
  LayoutDashboard, Send, FileX, Shield, Landmark, FileText, Ban, AlertCircle,
  FileSignature, Receipt, Calendar, Bell, Users, History, Scale, FileSearch,
  UserCog, TrendingUp, Building, DollarSign, FolderOpen, BarChart, Settings,
  ShieldCheck, Mail, CreditCard, GitCompare, Wallet, Upload, Globe
} from 'lucide-react';

const iconMap: Record<string, any> = {
  LayoutDashboard, Send, FileX, Shield, Landmark, FileText, Ban, AlertCircle,
  FileSignature, Receipt, Calendar, Bell, Users, History, Scale, FileSearch,
  UserCog, TrendingUp, Building, Currency: DollarSign, FolderOpen, BarChart, Settings,
  ShieldCheck, Mail, CreditCard, GitCompare, Wallet, Upload, Globe
};

export const RootLayout: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme, selectedCompany, selectedBank } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showStartup, setShowStartup] = useState(false);

  const isHomePage = location.pathname === '/';

  if (isHomePage) {
    return <Outlet />;
  }

  const Icon = ({ name }: { name: string }) => {
    const IconComponent = iconMap[name] || FileText;
    return <IconComponent size={20} />;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 h-screen w-72 glass border-r border-border/30 z-50 transition-transform duration-300 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar header */}
        <div className="p-6 border-b border-border/30 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo size={35} showText={true} />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Company/Bank selection info */}
        {(selectedCompany || selectedBank) && (
          <div className="p-4 border-b border-border/30 bg-gradient-to-br from-[var(--color-navy)]/10 to-[var(--color-emerald)]/10">
            <p className="text-xs opacity-70 mb-1">Session active</p>
            {selectedCompany && (
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-emerald)' }}>
                {selectedCompany}
              </p>
            )}
            {selectedBank && (
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-navy)' }}>
                {selectedBank}
              </p>
            )}
          </div>
        )}

        {/* Navigation menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {MENU_PAGES.map((page) => {
              const isActive = location.pathname === page.path;
              return (
                <li key={page.path}>
                  <Link
                    to={page.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[var(--color-navy)] to-[var(--color-emerald)] text-white'
                        : 'hover:bg-white/10 dark:hover:bg-white/5'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon name={page.icon} />
                    <span className="flex-1 text-sm">{page.label}</span>
                    {isActive && <ChevronRight size={16} />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-border/30 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            <span className="text-sm">
              {theme === 'light' ? 'Mode sombre' : 'Mode clair'}
            </span>
          </button>
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all"
          >
            <Home size={20} />
            <span className="text-sm">Retour accueil</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar (mobile) */}
        <header className="lg:hidden glass border-b border-border/30 p-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-white/10 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <Logo size={30} showText={false} />
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-white/10 rounded-lg"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="glass border-t border-border/30 p-6 mt-auto">
          <div className="max-w-7xl mx-auto">
            {/* Startup section toggle */}
            <div className="text-center mb-4">
              <button
                onClick={() => setShowStartup(!showStartup)}
                className="text-sm font-semibold hover:underline transition-all"
                style={{ color: 'var(--color-emerald)' }}
              >
                {showStartup ? 'Masquer' : 'En savoir plus sur'} notre startup
              </button>
            </div>

            {/* Startup detailed section */}
            {showStartup && <StartupSection />}

            <div className="text-center text-sm opacity-70 mt-4">
              <p>© 2026 InterLink Dz - Digitalisation Bancaire B2B</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const StartupSection: React.FC = () => {
  return (
    <div className="glass-strong p-8 rounded-3xl mb-6 space-y-6">
      <h3 className="text-2xl font-bold text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Notre Startup : InterLink Dz
      </h3>

      {/* Problem / Solution */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--color-danger)' }}>
            <AlertCircle size={20} /> Problème
          </h4>
          <p className="text-sm opacity-90">
            Les entreprises algériennes perdent en moyenne 15 heures par semaine sur des tâches bancaires manuelles :
            déplacements en agence, réconciliations sur papier, absence de traçabilité en temps réel.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--color-emerald)' }}>
            <ShieldCheck size={20} /> Solution
          </h4>
          <p className="text-sm opacity-90">
            InterLink Dz digitalise 100% des opérations bancaires B2B : virements multi-lots, détection fraude IA,
            finance islamique, alertes en temps réel via une plateforme sécurisée conforme aux standards algériens.
          </p>
        </div>
      </div>

      {/* SWOT Analysis */}
      <div>
        <h4 className="font-semibold mb-3">Analyse SWOT</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="glass p-4 rounded-xl">
            <p className="font-semibold mb-2" style={{ color: 'var(--color-emerald)' }}>Forces</p>
            <ul className="list-disc list-inside space-y-1 opacity-90">
              <li>Conformité DZ Mobpay & réglementations locales</li>
              <li>Partenariats avec 12 banques algériennes</li>
              <li>IA de détection fraude propriétaire</li>
            </ul>
          </div>
          <div className="glass p-4 rounded-xl">
            <p className="font-semibold mb-2" style={{ color: 'var(--color-gold)' }}>Opportunités</p>
            <ul className="list-disc list-inside space-y-1 opacity-90">
              <li>Marché B2B algérien inexploité (€120M)</li>
              <li>Plan national digitalisation 2030</li>
              <li>Finance islamique en croissance (+40%/an)</li>
            </ul>
          </div>
          <div className="glass p-4 rounded-xl">
            <p className="font-semibold mb-2" style={{ color: 'var(--color-danger)' }}>Faiblesses</p>
            <ul className="list-disc list-inside space-y-1 opacity-90">
              <li>Startup récente (6 mois d'existence)</li>
              <li>Concurrence indirecte (solutions internationales)</li>
              <li>Adoption digitale lente dans certains secteurs</li>
            </ul>
          </div>
          <div className="glass p-4 rounded-xl">
            <p className="font-semibold mb-2" style={{ color: 'var(--color-navy)' }}>Menaces</p>
            <ul className="list-disc list-inside space-y-1 opacity-90">
              <li>Évolutions réglementaires rapides</li>
              <li>Risques cybersécurité</li>
              <li>Dépendance aux partenaires bancaires</li>
            </ul>
          </div>
        </div>
      </div>

      {/* PCA - Plan de Continuité d'Activité */}
      <div>
        <h4 className="font-semibold mb-2">Plan de Continuité d'Activité (PCA)</h4>
        <div className="glass p-4 rounded-xl text-sm space-y-2">
          <p><strong>Infrastructure :</strong> 3 datacenters (Alger, Oran, Constantine) + backup cloud Azure Europe</p>
          <p><strong>RTO/RPO :</strong> Récupération en &lt;2h, perte de données &lt;15 min</p>
          <p><strong>Cybersécurité :</strong> Certification ISO 27001 en cours, audits trimestriels, chiffrement AES-256</p>
          <p><strong>Support :</strong> Équipe 24/7 en cas d'incident critique bancaire</p>
        </div>
      </div>

      {/* KPI 3 ans */}
      <div>
        <h4 className="font-semibold mb-3">Projections KPI (2026-2029)</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-2">Année</th>
                <th className="text-right p-2">Clients B2B</th>
                <th className="text-right p-2">CA (M DZD)</th>
                <th className="text-right p-2">Transactions/mois</th>
                <th className="text-right p-2">Employés</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/20">
                <td className="p-2 font-semibold">2026</td>
                <td className="text-right p-2">25</td>
                <td className="text-right p-2">45</td>
                <td className="text-right p-2">12 000</td>
                <td className="text-right p-2">12</td>
              </tr>
              <tr className="border-b border-border/20">
                <td className="p-2 font-semibold">2027</td>
                <td className="text-right p-2">80</td>
                <td className="text-right p-2">180</td>
                <td className="text-right p-2">45 000</td>
                <td className="text-right p-2">28</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">2028</td>
                <td className="text-right p-2">200</td>
                <td className="text-right p-2">520</td>
                <td className="text-right p-2">150 000</td>
                <td className="text-right p-2">55</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* RSE */}
      <div>
        <h4 className="font-semibold mb-2">Responsabilité Sociétale (RSE)</h4>
        <div className="glass p-4 rounded-xl text-sm space-y-2">
          <p>✓ <strong>Inclusion :</strong> Parité hommes-femmes (45% équipe féminine), recrutement dans toutes les wilayas</p>
          <p>✓ <strong>Environnement :</strong> Zéro papier, serveurs verts, compensation carbone via plantations locales</p>
          <p>✓ <strong>Social :</strong> 2% du CA dédié à la formation digitale dans les universités algériennes</p>
        </div>
      </div>

      {/* Q&A Juridique */}
      <div>
        <h4 className="font-semibold mb-2">Questions Juridiques Fréquentes</h4>
        <div className="space-y-3 text-sm">
          <details className="glass p-3 rounded-xl">
            <summary className="font-semibold cursor-pointer">Conformité réglementaire algérienne ?</summary>
            <p className="mt-2 opacity-90">
              100% conforme : agrément Banque d'Algérie, respect loi 18-05 sur e-commerce, RGPD algérien (loi 18-07),
              certification DZ Mobpay pour QR codes.
            </p>
          </details>
          <details className="glass p-3 rounded-xl">
            <summary className="font-semibold cursor-pointer">Protection des données bancaires ?</summary>
            <p className="mt-2 opacity-90">
              Hébergement exclusif en Algérie (sovereignty data), chiffrement bout-en-bout, accès biométriques,
              audit annuel obligatoire par autorités bancaires.
            </p>
          </details>
          <details className="glass p-3 rounded-xl">
            <summary className="font-semibold cursor-pointer">Responsabilité en cas d'erreur de virement ?</summary>
            <p className="mt-2 opacity-90">
              Double validation (SMS + biométrie), logs immutables blockchain, assurance cyber 50M DZD,
              procédure contestation sous 48h selon code bancaire algérien.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
};
