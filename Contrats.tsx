import React, { useState } from 'react';
import { FileSignature, Download, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface Contrat {
  id: string;
  reference: string;
  banqueEmettrice: string;
  entreprise: string;
  montant: string;
  dateDebut: string;
  dateEcheance: string;
  type: string;
  status: 'valide' | 'expire_bientot' | 'expire';
}

export const Contrats: React.FC = () => {
  const [contrats] = useState<Contrat[]>([
    {
      id: '1',
      reference: 'CTR-2024-001',
      banqueEmettrice: 'BNA',
      entreprise: 'SONATRACH',
      montant: '15 000 000',
      dateDebut: '2024-01-15',
      dateEcheance: '2027-01-15',
      type: 'Crédit moyen terme',
      status: 'valide'
    },
    {
      id: '2',
      reference: 'CTR-2025-078',
      banqueEmettrice: 'BEA',
      entreprise: 'SONELGAZ',
      montant: '8 500 000',
      dateDebut: '2025-03-10',
      dateEcheance: '2026-05-20',
      type: 'Ligne de crédit',
      status: 'expire_bientot'
    },
    {
      id: '3',
      reference: 'CTR-2023-045',
      banqueEmettrice: 'CPA',
      entreprise: 'Algérie Télécom',
      montant: '12 000 000',
      dateDebut: '2023-06-01',
      dateEcheance: '2026-06-01',
      type: 'Contrat cadre',
      status: 'valide'
    },
    {
      id: '4',
      reference: 'CTR-2022-189',
      banqueEmettrice: 'BADR',
      entreprise: 'Air Algérie',
      montant: '5 200 000',
      dateDebut: '2022-11-20',
      dateEcheance: '2026-03-15',
      type: 'Garantie bancaire',
      status: 'expire'
    },
    {
      id: '5',
      reference: 'CTR-2025-112',
      banqueEmettrice: 'BDL',
      entreprise: 'COSIDER',
      montant: '22 000 000',
      dateDebut: '2025-02-01',
      dateEcheance: '2028-02-01',
      type: 'Financement projet',
      status: 'valide'
    }
  ]);

  const getStatusInfo = (status: Contrat['status']) => {
    switch (status) {
      case 'valide':
        return {
          label: 'Valide',
          color: 'bg-green-500/20 text-green-500',
          icon: CheckCircle,
          borderColor: 'border-green-500'
        };
      case 'expire_bientot':
        return {
          label: 'Expire dans 30j',
          color: 'bg-orange-500/20 text-orange-500',
          icon: Clock,
          borderColor: 'border-orange-500'
        };
      case 'expire':
        return {
          label: 'Expiré',
          color: 'bg-red-500/20 text-red-500',
          icon: AlertTriangle,
          borderColor: 'border-red-500'
        };
    }
  };

  const handleDownloadPDF = (reference: string) => {
    alert(`Téléchargement du PDF pour le contrat ${reference} (simulation)`);
  };

  const valideCount = contrats.filter(c => c.status === 'valide').length;
  const expireBientotCount = contrats.filter(c => c.status === 'expire_bientot').length;
  const expireCount = contrats.filter(c => c.status === 'expire').length;
  const totalMontant = contrats.reduce((sum, c) => sum + parseInt(c.montant.replace(/\s/g, '')), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <FileSignature style={{ color: 'var(--color-navy)' }} />
          Gestion des Contrats B2B
        </h1>
        <p className="text-sm opacity-70">
          Suivi des contrats bancaires actifs et archivés
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Total contrats</p>
          <p className="text-3xl font-bold">{contrats.length}</p>
          <p className="text-xs opacity-70 mt-1">Portefeuille actif</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Contrats valides</p>
          <p className="text-3xl font-bold text-green-500">{valideCount}</p>
          <p className="text-xs opacity-70 mt-1">En cours</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">À renouveler</p>
          <p className="text-3xl font-bold text-orange-500">{expireBientotCount}</p>
          <p className="text-xs opacity-70 mt-1">Moins de 30 jours</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Montant total</p>
          <p className="text-2xl font-bold">{totalMontant.toLocaleString()}</p>
          <p className="text-xs opacity-70 mt-1">DZD engagés</p>
        </GlassCard>
      </div>

      {/* Contracts grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {contrats.map((contrat) => {
          const statusInfo = getStatusInfo(contrat.status);
          const Icon = statusInfo.icon;

          return (
            <GlassCard
              key={contrat.id}
              className={`border-l-4 ${statusInfo.borderColor} hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-mono text-sm opacity-70 mb-1">{contrat.reference}</p>
                  <h3 className="text-xl font-bold mb-1">{contrat.entreprise}</h3>
                  <p className="text-sm opacity-90">{contrat.type}</p>
                </div>
                <div className={`p-3 rounded-xl ${statusInfo.color} flex items-center gap-2`}>
                  <Icon size={20} />
                  <span className="text-sm font-semibold">{statusInfo.label}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs opacity-70 mb-1">Banque émettrice</p>
                  <p className="font-semibold">{contrat.banqueEmettrice}</p>
                </div>
                <div>
                  <p className="text-xs opacity-70 mb-1">Montant</p>
                  <p className="font-semibold">{parseInt(contrat.montant).toLocaleString()} DZD</p>
                </div>
                <div>
                  <p className="text-xs opacity-70 mb-1">Date début</p>
                  <p className="font-semibold">{contrat.dateDebut}</p>
                </div>
                <div>
                  <p className="text-xs opacity-70 mb-1">Date échéance</p>
                  <p className="font-semibold">{contrat.dateEcheance}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border/30">
                <button
                  onClick={() => handleDownloadPDF(contrat.reference)}
                  className="flex-1 px-4 py-2 rounded-xl glass border border-border/30 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Download size={16} />
                  Télécharger PDF
                </button>
                <button
                  className="flex-1 px-4 py-2 rounded-xl glass border border-border/30 hover:bg-white/10 transition-colors text-sm"
                >
                  Détails
                </button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Summary table */}
      <GlassCard>
        <h3 className="text-lg font-semibold mb-4">Récapitulatif par banque</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-3 text-sm font-medium opacity-70">Banque</th>
                <th className="text-center p-3 text-sm font-medium opacity-70">Nb contrats</th>
                <th className="text-right p-3 text-sm font-medium opacity-70">Montant total</th>
                <th className="text-center p-3 text-sm font-medium opacity-70">Valides</th>
                <th className="text-center p-3 text-sm font-medium opacity-70">À renouveler</th>
              </tr>
            </thead>
            <tbody>
              {['BNA', 'BEA', 'CPA', 'BADR', 'BDL'].map(banque => {
                const banqueContrats = contrats.filter(c => c.banqueEmettrice === banque);
                const banqueMontant = banqueContrats.reduce((sum, c) => sum + parseInt(c.montant.replace(/\s/g, '')), 0);
                const banqueValides = banqueContrats.filter(c => c.status === 'valide').length;
                const banqueExpire = banqueContrats.filter(c => c.status === 'expire_bientot').length;

                return (
                  <tr key={banque} className="border-b border-border/10 hover:bg-white/5">
                    <td className="p-3 text-sm font-semibold">{banque}</td>
                    <td className="p-3 text-sm text-center">{banqueContrats.length}</td>
                    <td className="p-3 text-sm text-right font-semibold">
                      {banqueMontant.toLocaleString()} DZD
                    </td>
                    <td className="p-3 text-center">
                      <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">
                        {banqueValides}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-500 text-xs">
                        {banqueExpire}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
