import React, { useState } from 'react';
import { Receipt, Landmark, AlertCircle } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Facture {
  id: string;
  numero: string;
  beneficiaire: string;
  rib: string;
  montantTotal: number;
  montantPaye: number;
  dateEmission: string;
  dateEcheance: string;
  status: 'impayee' | 'partielle' | 'payee';
}

export const Factures: React.FC = () => {
  const navigate = useNavigate();
  const [factures] = useState<Facture[]>([
    {
      id: '1',
      numero: 'FACT-2026-0145',
      beneficiaire: 'SARL TechnoService',
      rib: '00500015123456789012',
      montantTotal: 450000,
      montantPaye: 0,
      dateEmission: '2026-04-01',
      dateEcheance: '2026-04-30',
      status: 'impayee'
    },
    {
      id: '2',
      numero: 'FACT-2026-0142',
      beneficiaire: 'EURL GlobalTrade',
      rib: '00300025987654321098',
      montantTotal: 280000,
      montantPaye: 140000,
      dateEmission: '2026-03-28',
      dateEcheance: '2026-04-28',
      status: 'partielle'
    },
    {
      id: '3',
      numero: 'FACT-2026-0138',
      beneficiaire: 'SPA IndustrieAlger',
      rib: '00100035456789012345',
      montantTotal: 720000,
      montantPaye: 0,
      dateEmission: '2026-03-20',
      dateEcheance: '2026-04-20',
      status: 'impayee'
    },
    {
      id: '4',
      numero: 'FACT-2026-0133',
      beneficiaire: 'ETS MedConsult',
      rib: '00600045678901234567',
      montantTotal: 165000,
      montantPaye: 165000,
      dateEmission: '2026-03-15',
      dateEcheance: '2026-04-15',
      status: 'payee'
    },
    {
      id: '5',
      numero: 'FACT-2026-0129',
      beneficiaire: 'SARL BuildCorp',
      rib: '00200055321098765432',
      montantTotal: 890000,
      montantPaye: 445000,
      dateEmission: '2026-03-10',
      dateEcheance: '2026-04-10',
      status: 'partielle'
    }
  ]);

  const [selectedFacture, setSelectedFacture] = useState<Facture | null>(null);

  const getStatusInfo = (status: Facture['status']) => {
    switch (status) {
      case 'impayee':
        return {
          label: 'Impayée',
          color: 'bg-red-500/20 text-red-500',
          borderColor: 'border-red-500'
        };
      case 'partielle':
        return {
          label: 'Paiement partiel',
          color: 'bg-orange-500/20 text-orange-500',
          borderColor: 'border-orange-500'
        };
      case 'payee':
        return {
          label: 'Payée',
          color: 'bg-green-500/20 text-green-500',
          borderColor: 'border-green-500'
        };
    }
  };

  const handlePayerMourabaha = (facture: Facture) => {
    setSelectedFacture(facture);
    setTimeout(() => {
      navigate('/mourabaha');
    }, 500);
  };

  const impayeeCount = factures.filter(f => f.status === 'impayee').length;
  const partielleCount = factures.filter(f => f.status === 'partielle').length;
  const payeeCount = factures.filter(f => f.status === 'payee').length;

  const totalDu = factures.reduce((sum, f) => sum + (f.montantTotal - f.montantPaye), 0);
  const totalPaye = factures.reduce((sum, f) => sum + f.montantPaye, 0);

  // Chart data - montant dû par entreprise
  const entreprises = [...new Set(factures.map(f => f.beneficiaire))];
  const chartData = {
    labels: entreprises,
    datasets: [
      {
        data: entreprises.map(ent =>
          factures
            .filter(f => f.beneficiaire === ent)
            .reduce((sum, f) => sum + (f.montantTotal - f.montantPaye), 0)
        ),
        backgroundColor: [
          'rgba(10, 37, 64, 0.8)',
          'rgba(0, 168, 107, 0.8)',
          'rgba(255, 215, 0, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ],
        borderWidth: 0
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <Receipt style={{ color: 'var(--color-emerald)' }} />
          Gestion des Factures
        </h1>
        <p className="text-sm opacity-70">
          Suivi des factures impayées et partiellement payées
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Total factures</p>
          <p className="text-3xl font-bold">{factures.length}</p>
          <p className="text-xs opacity-70 mt-1">Ce mois</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Impayées</p>
          <p className="text-3xl font-bold text-red-500">{impayeeCount}</p>
          <p className="text-xs opacity-70 mt-1">0% payé</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Partielles</p>
          <p className="text-3xl font-bold text-orange-500">{partielleCount}</p>
          <p className="text-xs opacity-70 mt-1">Paiement en cours</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Montant dû</p>
          <p className="text-2xl font-bold text-red-500">{totalDu.toLocaleString()}</p>
          <p className="text-xs opacity-70 mt-1">DZD</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Déjà payé</p>
          <p className="text-2xl font-bold text-green-500">{totalPaye.toLocaleString()}</p>
          <p className="text-xs opacity-70 mt-1">DZD</p>
        </GlassCard>
      </div>

      {/* Chart */}
      <GlassCard>
        <h3 className="text-lg font-semibold mb-4">Montant dû par entreprise</h3>
        <div style={{ height: '300px' }}>
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </GlassCard>

      {/* Factures table */}
      <GlassCard>
        <h3 className="text-lg font-semibold mb-4">Liste des factures</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-3 text-sm font-medium opacity-70">N° Facture</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Bénéficiaire</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">RIB (20 chiffres)</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Dates</th>
                <th className="text-right p-3 text-sm font-medium opacity-70">Montant total</th>
                <th className="text-right p-3 text-sm font-medium opacity-70">Payé</th>
                <th className="text-right p-3 text-sm font-medium opacity-70">Reste</th>
                <th className="text-center p-3 text-sm font-medium opacity-70">Statut</th>
                <th className="text-center p-3 text-sm font-medium opacity-70">Action</th>
              </tr>
            </thead>
            <tbody>
              {factures.map((facture) => {
                const statusInfo = getStatusInfo(facture.status);
                const reste = facture.montantTotal - facture.montantPaye;

                return (
                  <tr key={facture.id} className="border-b border-border/10 hover:bg-white/5">
                    <td className="p-3 text-sm font-mono">{facture.numero}</td>
                    <td className="p-3 text-sm font-medium">{facture.beneficiaire}</td>
                    <td className="p-3 text-sm font-mono text-xs">
                      {facture.rib.slice(0, 3)}-{facture.rib.slice(3, 8)}-{facture.rib.slice(8)}
                    </td>
                    <td className="p-3 text-sm">
                      <p className="text-xs opacity-70">Émis: {facture.dateEmission}</p>
                      <p className="text-xs font-semibold">Éch: {facture.dateEcheance}</p>
                    </td>
                    <td className="p-3 text-sm text-right font-semibold">
                      {facture.montantTotal.toLocaleString()} DZD
                    </td>
                    <td className="p-3 text-sm text-right text-green-500">
                      {facture.montantPaye.toLocaleString()} DZD
                    </td>
                    <td className="p-3 text-sm text-right font-bold text-red-500">
                      {reste.toLocaleString()} DZD
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {facture.status !== 'payee' && (
                        <button
                          onClick={() => handlePayerMourabaha(facture)}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--color-navy)] to-[var(--color-emerald)] text-white text-xs font-semibold hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                        >
                          <Landmark size={14} />
                          Mourabaha
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Info panel */}
      <GlassCard className="border-l-4 border-[var(--color-emerald)]">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-[var(--color-emerald)] mt-1" size={24} />
          <div>
            <h4 className="font-semibold mb-2">Paiement via Finance Islamique Mourabaha</h4>
            <p className="text-sm opacity-90 mb-3">
              Vous pouvez régler vos factures en utilisant la Mourabaha, un financement conforme à la Charia
              avec marge transparente. Cliquez sur le bouton "Mourabaha" pour simuler le financement.
            </p>
            <ul className="text-sm space-y-1 opacity-90">
              <li>✓ Aucun intérêt (Riba)</li>
              <li>✓ Marge bénéficiaire fixe et transparente</li>
              <li>✓ Mensualités adaptées à votre trésorerie</li>
              <li>✓ Certifié conforme aux principes islamiques</li>
            </ul>
          </div>
        </div>
      </GlassCard>

      {/* Selected facture notification */}
      {selectedFacture && (
        <div className="fixed bottom-8 right-8 glass-strong p-6 rounded-2xl shadow-xl max-w-md animate-in slide-in-from-bottom-4">
          <p className="text-sm opacity-70 mb-1">Redirection vers Mourabaha</p>
          <p className="font-semibold">
            Facture {selectedFacture.numero} - {(selectedFacture.montantTotal - selectedFacture.montantPaye).toLocaleString()} DZD
          </p>
        </div>
      )}
    </div>
  );
};
