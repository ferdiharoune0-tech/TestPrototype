import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Brain, XCircle } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Transaction {
  id: string;
  date: string;
  type: string;
  montant: string;
  beneficiaire: string;
  riskScore: number;
  status: 'safe' | 'suspect' | 'blocked';
  justification: string;
}

export const FraudeIA: React.FC = () => {
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2026-04-13 14:32',
      type: 'Virement',
      montant: '250 000',
      beneficiaire: 'SARL TechnoService',
      riskScore: 15,
      status: 'safe',
      justification: 'Bénéficiaire habituel, montant cohérent avec historique'
    },
    {
      id: '2',
      date: '2026-04-13 11:28',
      type: 'Virement',
      montant: '1 500 000',
      beneficiaire: 'COMPTE INCONNU',
      riskScore: 87,
      status: 'blocked',
      justification: 'Montant inhabituel (+450% vs moyenne), nouveau bénéficiaire sans historique, localisation IP suspecte (Russie)'
    },
    {
      id: '3',
      date: '2026-04-13 09:15',
      type: 'Retrait',
      montant: '450 000',
      beneficiaire: 'GAB Alger Centre',
      riskScore: 62,
      status: 'suspect',
      justification: 'Montant élevé, horaire inhabituel, 3ème retrait en 24h'
    },
    {
      id: '4',
      date: '2026-04-12 16:45',
      type: 'Virement',
      montant: '85 000',
      beneficiaire: 'EURL GlobalTrade',
      riskScore: 8,
      status: 'safe',
      justification: 'Transaction normale, bénéficiaire récurrent depuis 2 ans'
    },
    {
      id: '5',
      date: '2026-04-12 14:20',
      type: 'Prélèvement',
      montant: '320 000',
      beneficiaire: 'SONELGAZ',
      riskScore: 5,
      status: 'safe',
      justification: 'Prélèvement régulier mensuel, montant attendu'
    },
    {
      id: '6',
      date: '2026-04-12 10:30',
      type: 'Virement',
      montant: '950 000',
      beneficiaire: 'SPA IndustrieAlger',
      riskScore: 45,
      status: 'suspect',
      justification: 'Montant 200% au-dessus de la moyenne habituelle avec ce bénéficiaire'
    },
    {
      id: '7',
      date: '2026-04-11 15:50',
      type: 'Virement',
      montant: '120 000',
      beneficiaire: 'SARL BuildCorp',
      riskScore: 12,
      status: 'safe',
      justification: 'Transaction conforme aux patterns habituels'
    },
    {
      id: '8',
      date: '2026-04-11 09:05',
      type: 'Virement International',
      montant: '2 800 000',
      beneficiaire: 'IBAN FR76...',
      riskScore: 92,
      status: 'blocked',
      justification: 'Premier virement international, montant très élevé, pays à risque, pas de justificatif'
    }
  ]);

  const safeCount = transactions.filter(t => t.status === 'safe').length;
  const suspectCount = transactions.filter(t => t.status === 'suspect').length;
  const blockedCount = transactions.filter(t => t.status === 'blocked').length;

  const chartData = {
    labels: transactions.map(t => t.date.split(' ')[0]).reverse(),
    datasets: [
      {
        label: 'Score de risque moyen journalier',
        data: [12, 8, 45, 62, 15, 28, 35, 22],
        borderColor: 'rgb(255, 68, 67)',
        backgroundColor: 'rgba(255, 68, 67, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Seuil de blocage (80)',
        data: Array(8).fill(80),
        borderColor: 'rgb(255, 215, 0)',
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Score de risque'
        }
      }
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-500';
    if (score < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRiskBgColor = (score: number) => {
    if (score < 30) return 'bg-green-500/20';
    if (score < 70) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <Shield className="text-[var(--color-emerald)]" />
          Détection Fraude IA
        </h1>
        <p className="text-sm opacity-70">
          Surveillance en temps réel avec intelligence artificielle
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <Brain size={24} className="text-blue-500" />
            </div>
          </div>
          <p className="text-sm opacity-70 mb-1">Transactions Analysées</p>
          <p className="text-3xl font-bold">{transactions.length}</p>
          <p className="text-xs opacity-70 mt-1">Dernières 48h</p>
        </div>

        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-green-500/20">
              <CheckCircle size={24} className="text-green-500" />
            </div>
          </div>
          <p className="text-sm opacity-70 mb-1">Transactions Sûres</p>
          <p className="text-3xl font-bold">{safeCount}</p>
          <p className="text-xs opacity-70 mt-1">{Math.round((safeCount / transactions.length) * 100)}% du total</p>
        </div>

        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-yellow-500/20">
              <AlertTriangle size={24} className="text-yellow-500" />
            </div>
          </div>
          <p className="text-sm opacity-70 mb-1">Suspectes</p>
          <p className="text-3xl font-bold">{suspectCount}</p>
          <p className="text-xs opacity-70 mt-1">Nécessitent validation</p>
        </div>

        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-red-500/20">
              <XCircle size={24} className="text-red-500" />
            </div>
          </div>
          <p className="text-sm opacity-70 mb-1">Bloquées</p>
          <p className="text-3xl font-bold">{blockedCount}</p>
          <p className="text-xs opacity-70 mt-1">Score &gt; 80</p>
        </div>
      </div>

      {/* Chart */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">Évolution du Score de Risque</h3>
        <div style={{ height: '300px' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* How AI works */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Brain size={20} />
          Comment fonctionne notre IA ?
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/5">
            <p className="font-semibold mb-2" style={{ color: 'var(--color-emerald)' }}>Analyse comportementale</p>
            <p className="text-sm opacity-90">
              Comparaison avec l'historique des 12 derniers mois : montants moyens, fréquence, bénéficiaires récurrents
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <p className="font-semibold mb-2" style={{ color: 'var(--color-gold)' }}>Détection d'anomalies</p>
            <p className="text-sm opacity-90">
              Machine Learning pour identifier les patterns suspects : horaires, géolocalisation, changements brutaux
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <p className="font-semibold mb-2" style={{ color: 'var(--color-navy)' }}>Bases de données externes</p>
            <p className="text-sm opacity-90">
              Vérification contre listes noires internationales, sanctions, comptes à risque
            </p>
          </div>
        </div>
      </div>

      {/* Transactions table */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">Transactions Récentes</h3>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`p-4 rounded-xl border-l-4 ${
                transaction.status === 'safe'
                  ? 'bg-green-500/10 border-green-500'
                  : transaction.status === 'suspect'
                  ? 'bg-yellow-500/10 border-yellow-500'
                  : 'bg-red-500/10 border-red-500'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold">{transaction.type}</p>
                    <span className="text-sm opacity-70">{transaction.date}</span>
                  </div>
                  <p className="text-sm opacity-90">
                    {transaction.beneficiaire} • <span className="font-semibold">{transaction.montant} DZD</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${getRiskBgColor(transaction.riskScore)}`}>
                    <p className={`text-2xl font-bold ${getRiskColor(transaction.riskScore)}`}>
                      {transaction.riskScore}
                    </p>
                    <p className="text-xs opacity-70">/100</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-black/10 mt-2">
                <p className="text-xs font-semibold opacity-70 mb-1">Analyse IA :</p>
                <p className="text-sm opacity-90">{transaction.justification}</p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {transaction.status === 'safe' && (
                    <>
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-sm text-green-500 font-semibold">Transaction approuvée</span>
                    </>
                  )}
                  {transaction.status === 'suspect' && (
                    <>
                      <AlertTriangle size={16} className="text-yellow-500" />
                      <span className="text-sm text-yellow-500 font-semibold">Validation manuelle requise</span>
                    </>
                  )}
                  {transaction.status === 'blocked' && (
                    <>
                      <XCircle size={16} className="text-red-500" />
                      <span className="text-sm text-red-500 font-semibold">Transaction bloquée</span>
                    </>
                  )}
                </div>
                {transaction.status !== 'safe' && (
                  <button
                    onClick={() => alert(`Action sur transaction ${transaction.id}`)}
                    className="px-4 py-2 rounded-lg glass border border-border/30 hover:bg-white/10 transition-colors text-sm"
                  >
                    {transaction.status === 'blocked' ? 'Débloquer' : 'Valider'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
