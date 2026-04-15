import React, { useState } from 'react';
import { FileX, AlertTriangle, MessageSquare, CheckCircle } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Cheque {
  id: string;
  numero: string;
  montant: string;
  date: string;
  beneficiaire: string;
  motif: string;
  type: 'financier' | 'technique';
  status: 'ouvert' | 'reclamation' | 'resolu';
}

const MOTIFS_FINANCIERS = [
  'Défaut de provision',
  'Provision insuffisante',
  'Indisponibilité des fonds'
];

const MOTIFS_TECHNIQUES = [
  'Signature non conforme',
  'Chèque irrégulier',
  'Opposition',
  'Chèque prescrit'
];

export const ChequesImpayes: React.FC = () => {
  const [cheques] = useState<Cheque[]>([
    {
      id: '1',
      numero: '7845621',
      montant: '150 000',
      date: '2026-04-10',
      beneficiaire: 'SARL TechnoService',
      motif: 'Provision insuffisante',
      type: 'financier',
      status: 'ouvert'
    },
    {
      id: '2',
      numero: '7845622',
      montant: '85 000',
      date: '2026-04-08',
      beneficiaire: 'ETS MedConsult',
      motif: 'Signature non conforme',
      type: 'technique',
      status: 'reclamation'
    },
    {
      id: '3',
      numero: '7845618',
      montant: '220 000',
      date: '2026-04-05',
      beneficiaire: 'EURL GlobalTrade',
      motif: 'Défaut de provision',
      type: 'financier',
      status: 'ouvert'
    },
    {
      id: '4',
      numero: '7845615',
      montant: '42 000',
      date: '2026-04-02',
      beneficiaire: 'SPA IndustrieAlger',
      motif: 'Opposition',
      type: 'technique',
      status: 'resolu'
    },
    {
      id: '5',
      numero: '7845610',
      montant: '98 000',
      date: '2026-03-28',
      beneficiaire: 'SARL BuildCorp',
      motif: 'Chèque prescrit',
      type: 'technique',
      status: 'resolu'
    }
  ]);

  const [selectedCheque, setSelectedCheque] = useState<Cheque | null>(null);
  const [showReclamation, setShowReclamation] = useState(false);
  const [reclamationMessage, setReclamationMessage] = useState('');

  const handleReclamation = () => {
    if (selectedCheque && reclamationMessage.trim()) {
      alert(`Réclamation envoyée pour le chèque ${selectedCheque.numero}\n\nMessage: ${reclamationMessage}`);
      setShowReclamation(false);
      setReclamationMessage('');
      setSelectedCheque(null);
    }
  };

  // Statistics
  const financierCount = cheques.filter(c => c.type === 'financier').length;
  const techniqueCount = cheques.filter(c => c.type === 'technique').length;
  const totalMontant = cheques.reduce((sum, c) => sum + parseInt(c.montant.replace(/\s/g, '')), 0);

  const chartData = {
    labels: ['Financiers', 'Techniques'],
    datasets: [
      {
        label: 'Nombre de chèques impayés',
        data: [financierCount, techniqueCount],
        backgroundColor: ['rgba(255, 68, 67, 0.8)', 'rgba(255, 215, 0, 0.8)'],
        borderWidth: 0
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Chèques Impayés
        </h1>
        <p className="text-sm opacity-70">
          Gestion des chèques impayés avec workflow de réclamation intégré
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-red-500/20">
              <FileX size={24} className="text-red-500" />
            </div>
          </div>
          <p className="text-sm opacity-70 mb-1">Total Impayés</p>
          <p className="text-3xl font-bold">{cheques.length}</p>
          <p className="text-sm opacity-70 mt-1">{totalMontant.toLocaleString()} DZD</p>
        </div>

        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-red-500/20">
              <AlertTriangle size={24} className="text-red-500" />
            </div>
          </div>
          <p className="text-sm opacity-70 mb-1">Motifs Financiers</p>
          <p className="text-3xl font-bold">{financierCount}</p>
          <ul className="text-xs opacity-70 mt-2 space-y-1">
            {MOTIFS_FINANCIERS.map((m, i) => (
              <li key={i}>• {m}</li>
            ))}
          </ul>
        </div>

        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)' }}>
              <FileX size={24} style={{ color: 'var(--color-gold)' }} />
            </div>
          </div>
          <p className="text-sm opacity-70 mb-1">Motifs Techniques</p>
          <p className="text-3xl font-bold">{techniqueCount}</p>
          <ul className="text-xs opacity-70 mt-2 space-y-1">
            {MOTIFS_TECHNIQUES.map((m, i) => (
              <li key={i}>• {m}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chart */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">Répartition par Type de Motif</h3>
        <div style={{ height: '250px' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Cheques table */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">Liste des Chèques Impayés</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-3 text-sm font-medium opacity-70">N° Chèque</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Date</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Bénéficiaire</th>
                <th className="text-right p-3 text-sm font-medium opacity-70">Montant</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Motif</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Type</th>
                <th className="text-center p-3 text-sm font-medium opacity-70">Statut</th>
                <th className="text-center p-3 text-sm font-medium opacity-70">Action</th>
              </tr>
            </thead>
            <tbody>
              {cheques.map((cheque) => (
                <tr key={cheque.id} className="border-b border-border/10 hover:bg-white/5">
                  <td className="p-3 text-sm font-mono">{cheque.numero}</td>
                  <td className="p-3 text-sm">{cheque.date}</td>
                  <td className="p-3 text-sm">{cheque.beneficiaire}</td>
                  <td className="p-3 text-sm text-right font-semibold">{cheque.montant} DZD</td>
                  <td className="p-3 text-sm">{cheque.motif}</td>
                  <td className="p-3 text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs ${
                        cheque.type === 'financier'
                          ? 'bg-red-500/20 text-red-500'
                          : 'bg-yellow-500/20 text-yellow-500'
                      }`}
                    >
                      {cheque.type === 'financier' ? 'Financier' : 'Technique'}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {cheque.status === 'ouvert' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/20 text-orange-500 text-xs">
                        <AlertTriangle size={14} />
                        Ouvert
                      </span>
                    )}
                    {cheque.status === 'reclamation' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 text-xs">
                        <MessageSquare size={14} />
                        Réclamation
                      </span>
                    )}
                    {cheque.status === 'resolu' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">
                        <CheckCircle size={14} />
                        Résolu
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {cheque.status !== 'resolu' && (
                      <button
                        onClick={() => {
                          setSelectedCheque(cheque);
                          setShowReclamation(true);
                        }}
                        className="px-4 py-2 rounded-lg glass border border-border/30 hover:bg-[var(--color-emerald)]/10 transition-colors text-sm"
                      >
                        Réclamer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reclamation Modal */}
      {showReclamation && selectedCheque && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="glass-strong p-8 rounded-3xl max-w-2xl w-full">
            <h3 className="text-2xl font-bold mb-4">Formulaire de Réclamation</h3>

            <div className="glass p-4 rounded-xl mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="opacity-70">N° Chèque</p>
                  <p className="font-semibold">{selectedCheque.numero}</p>
                </div>
                <div>
                  <p className="opacity-70">Montant</p>
                  <p className="font-semibold">{selectedCheque.montant} DZD</p>
                </div>
                <div>
                  <p className="opacity-70">Bénéficiaire</p>
                  <p className="font-semibold">{selectedCheque.beneficiaire}</p>
                </div>
                <div>
                  <p className="opacity-70">Motif</p>
                  <p className="font-semibold">{selectedCheque.motif}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Message de réclamation</label>
              <textarea
                value={reclamationMessage}
                onChange={(e) => setReclamationMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)] min-h-32"
                placeholder="Décrivez votre réclamation en détail..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReclamation}
                disabled={!reclamationMessage.trim()}
                className="flex-1 bg-gradient-to-r from-[var(--color-navy)] to-[var(--color-emerald)] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                <MessageSquare size={20} />
                Envoyer la réclamation
              </button>
              <button
                onClick={() => {
                  setShowReclamation(false);
                  setReclamationMessage('');
                  setSelectedCheque(null);
                }}
                className="px-6 py-3 rounded-xl glass border border-border/30 hover:bg-white/10 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
