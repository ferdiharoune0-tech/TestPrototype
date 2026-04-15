import React, { useState } from 'react';
import { Ban, Plus, Filter } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { RIBInput } from '../components/RIBInput';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Opposition {
  id: string;
  date: string;
  beneficiaire: string;
  rib: string;
  montant: string;
  motif: 'ATD' | 'Contrat' | 'Litige' | 'Chèque volé';
  status: 'active' | 'levée';
}

const MOTIFS = ['ATD', 'Contrat', 'Litige', 'Chèque volé'] as const;

export const Oppositions: React.FC = () => {
  const [oppositions, setOppositions] = useState<Opposition[]>([
    {
      id: '1',
      date: '2026-04-10',
      beneficiaire: 'SARL TechnoService',
      rib: '00500015123456789012',
      montant: '250 000',
      motif: 'ATD',
      status: 'active'
    },
    {
      id: '2',
      date: '2026-04-08',
      beneficiaire: 'EURL GlobalTrade',
      rib: '00300025987654321098',
      montant: '180 000',
      motif: 'Litige',
      status: 'active'
    },
    {
      id: '3',
      date: '2026-04-05',
      beneficiaire: 'SPA IndustrieAlger',
      rib: '00100035456789012345',
      montant: '420 000',
      motif: 'Chèque volé',
      status: 'active'
    },
    {
      id: '4',
      date: '2026-03-28',
      beneficiaire: 'ETS MedConsult',
      rib: '00600045678901234567',
      montant: '95 000',
      motif: 'Contrat',
      status: 'levée'
    },
    {
      id: '5',
      date: '2026-03-15',
      beneficiaire: 'SARL BuildCorp',
      rib: '00200055321098765432',
      montant: '310 000',
      motif: 'ATD',
      status: 'levée'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'levée'>('all');
  const [filterMotif, setFilterMotif] = useState<string>('all');

  // New opposition form
  const [newOpposition, setNewOpposition] = useState({
    beneficiaire: '',
    rib: '',
    montant: '',
    motif: 'ATD' as typeof MOTIFS[number]
  });

  const handleSubmitOpposition = (e: React.FormEvent) => {
    e.preventDefault();

    const opposition: Opposition = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      beneficiaire: newOpposition.beneficiaire,
      rib: newOpposition.rib,
      montant: newOpposition.montant,
      motif: newOpposition.motif,
      status: 'active'
    };

    setOppositions([opposition, ...oppositions]);
    setShowModal(false);
    setNewOpposition({
      beneficiaire: '',
      rib: '',
      montant: '',
      motif: 'ATD'
    });
  };

  const filteredOppositions = oppositions.filter(opp => {
    const matchesStatus = filterStatus === 'all' || opp.status === filterStatus;
    const matchesMotif = filterMotif === 'all' || opp.motif === filterMotif;
    return matchesStatus && matchesMotif;
  });

  // Chart data - oppositions par mois
  const chartData = {
    labels: ['Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mar', 'Avr'],
    datasets: [
      {
        label: 'Nouvelles oppositions',
        data: [3, 5, 4, 7, 6, 8, 5],
        backgroundColor: 'rgba(255, 68, 67, 0.8)',
        borderWidth: 0
      },
      {
        label: 'Oppositions levées',
        data: [2, 3, 3, 4, 5, 6, 3],
        backgroundColor: 'rgba(0, 168, 107, 0.8)',
        borderWidth: 0
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
        ticks: {
          stepSize: 2
        }
      }
    }
  };

  const activeCount = oppositions.filter(o => o.status === 'active').length;
  const leveeCount = oppositions.filter(o => o.status === 'levée').length;
  const totalMontant = oppositions
    .filter(o => o.status === 'active')
    .reduce((sum, o) => sum + parseInt(o.montant.replace(/\s/g, '')), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <Ban style={{ color: 'var(--color-danger)' }} />
            Gestion des Oppositions Bancaires
          </h1>
          <p className="text-sm opacity-70">
            Suivi et gestion des oppositions sur comptes et transactions
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-navy)] to-[var(--color-emerald)] text-white font-semibold hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Plus size={20} />
          Nouvelle opposition
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Total oppositions</p>
          <p className="text-3xl font-bold">{oppositions.length}</p>
          <p className="text-xs opacity-70 mt-1">Toutes périodes</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Oppositions actives</p>
          <p className="text-3xl font-bold text-red-500">{activeCount}</p>
          <p className="text-xs opacity-70 mt-1">En cours</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Oppositions levées</p>
          <p className="text-3xl font-bold" style={{ color: 'var(--color-emerald)' }}>
            {leveeCount}
          </p>
          <p className="text-xs opacity-70 mt-1">Résolues</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Montant bloqué</p>
          <p className="text-2xl font-bold">{totalMontant.toLocaleString()}</p>
          <p className="text-xs opacity-70 mt-1">DZD (actives)</p>
        </GlassCard>
      </div>

      {/* Chart */}
      <GlassCard>
        <h3 className="text-lg font-semibold mb-4">Évolution mensuelle des oppositions</h3>
        <div style={{ height: '300px' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </GlassCard>

      {/* Filters */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} />
          <h3 className="text-lg font-semibold">Filtres</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Statut</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Active</option>
              <option value="levée">Levée</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Motif</label>
            <select
              value={filterMotif}
              onChange={(e) => setFilterMotif(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
            >
              <option value="all">Tous les motifs</option>
              {MOTIFS.map(motif => (
                <option key={motif} value={motif}>{motif}</option>
              ))}
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Oppositions table */}
      <GlassCard>
        <h3 className="text-lg font-semibold mb-4">
          Liste des oppositions ({filteredOppositions.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-3 text-sm font-medium opacity-70">Date</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Bénéficiaire</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">RIB (20 chiffres)</th>
                <th className="text-right p-3 text-sm font-medium opacity-70">Montant</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Motif</th>
                <th className="text-center p-3 text-sm font-medium opacity-70">Statut</th>
              </tr>
            </thead>
            <tbody>
              {filteredOppositions.map((opp) => (
                <tr key={opp.id} className="border-b border-border/10 hover:bg-white/5">
                  <td className="p-3 text-sm">{opp.date}</td>
                  <td className="p-3 text-sm font-medium">{opp.beneficiaire}</td>
                  <td className="p-3 text-sm font-mono text-xs">
                    {opp.rib.slice(0, 3)}-{opp.rib.slice(3, 8)}-{opp.rib.slice(8)}
                  </td>
                  <td className="p-3 text-sm text-right font-semibold">{opp.montant} DZD</td>
                  <td className="p-3 text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs ${
                        opp.motif === 'ATD'
                          ? 'bg-red-500/20 text-red-500'
                          : opp.motif === 'Chèque volé'
                          ? 'bg-orange-500/20 text-orange-500'
                          : opp.motif === 'Litige'
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : 'bg-blue-500/20 text-blue-500'
                      }`}
                    >
                      {opp.motif}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {opp.status === 'active' ? (
                      <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-xs font-semibold">
                        Active
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-semibold">
                        Levée
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Modal nouvelle opposition */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="glass-strong p-8 rounded-3xl max-w-2xl w-full">
            <h3 className="text-2xl font-bold mb-6">Nouvelle Opposition Bancaire</h3>

            <form onSubmit={handleSubmitOpposition} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Bénéficiaire <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newOpposition.beneficiaire}
                  onChange={(e) => setNewOpposition({ ...newOpposition, beneficiaire: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
                  placeholder="Nom du bénéficiaire"
                  required
                />
              </div>

              <RIBInput
                value={newOpposition.rib}
                onChange={(rib) => setNewOpposition({ ...newOpposition, rib })}
                required
                showValidation
              />

              <div>
                <label className="block text-sm font-medium mb-2">
                  Montant (DZD) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={newOpposition.montant}
                  onChange={(e) => setNewOpposition({ ...newOpposition, montant: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
                  placeholder="100000"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Motif de l'opposition <span className="text-red-500">*</span>
                </label>
                <select
                  value={newOpposition.motif}
                  onChange={(e) => setNewOpposition({ ...newOpposition, motif: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
                  required
                >
                  {MOTIFS.map(motif => (
                    <option key={motif} value={motif}>{motif}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={newOpposition.rib.length !== 20}
                  className="flex-1 bg-gradient-to-r from-[var(--color-navy)] to-[var(--color-emerald)] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Enregistrer l'opposition
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setNewOpposition({
                      beneficiaire: '',
                      rib: '',
                      montant: '',
                      motif: 'ATD'
                    });
                  }}
                  className="px-6 py-3 rounded-xl glass border border-border/30 hover:bg-white/10 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
