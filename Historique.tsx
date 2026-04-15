import React, { useState } from 'react';
import { History, FileDown, Filter } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface Transaction {
  id: string;
  date: string;
  type: 'virement' | 'cheque' | 'opposition' | 'prelevement' | 'carte';
  beneficiaire: string;
  montant: number;
  statut: 'validé' | 'en cours' | 'refusé';
  banque: string;
  reference: string;
}

export const Historique: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState('all');
  const [filterStatut, setFilterStatut] = useState('all');
  const [filterBanque, setFilterBanque] = useState('all');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');

  const [transactions] = useState<Transaction[]>(
    Array.from({ length: 50 }, (_, i) => ({
      id: `txn-${i + 1}`,
      date: new Date(2026, 3, 14 - i).toISOString().split('T')[0],
      type: (['virement', 'cheque', 'opposition', 'prelevement', 'carte'] as const)[Math.floor(Math.random() * 5)],
      beneficiaire: ['SARL TechnoService', 'EURL GlobalTrade', 'SPA IndustrieAlger', 'ETS MedConsult', 'SONELGAZ'][Math.floor(Math.random() * 5)],
      montant: Math.floor(Math.random() * 900000) + 100000,
      statut: (['validé', 'en cours', 'refusé'] as const)[Math.floor(Math.random() * 3)],
      banque: ['BNA', 'BEA', 'CPA', 'BADR'][Math.floor(Math.random() * 4)],
      reference: `REF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    }))
  );

  const filteredTransactions = transactions.filter(txn => {
    const matchType = filterType === 'all' || txn.type === filterType;
    const matchStatut = filterStatut === 'all' || txn.statut === filterStatut;
    const matchBanque = filterBanque === 'all' || txn.banque === filterBanque;
    const matchDateDebut = !dateDebut || txn.date >= dateDebut;
    const matchDateFin = !dateFin || txn.date <= dateFin;
    return matchType && matchStatut && matchBanque && matchDateDebut && matchDateFin;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleExportCSV = () => {
    alert(`Export CSV de ${filteredTransactions.length} transactions (simulation)`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <History style={{ color: 'var(--color-navy)' }} />
            Historique Complet
          </h1>
          <p className="text-sm opacity-70">
            Consultation de toutes vos transactions bancaires
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-6 py-3 rounded-xl glass border border-border/30 hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <FileDown size={20} />
          Export CSV
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Total transactions</p>
          <p className="text-3xl font-bold">{filteredTransactions.length}</p>
          <p className="text-xs opacity-70 mt-1">Période sélectionnée</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Validées</p>
          <p className="text-3xl font-bold text-green-500">
            {filteredTransactions.filter(t => t.statut === 'validé').length}
          </p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">En cours</p>
          <p className="text-3xl font-bold text-orange-500">
            {filteredTransactions.filter(t => t.statut === 'en cours').length}
          </p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Volume total</p>
          <p className="text-2xl font-bold">
            {filteredTransactions.reduce((sum, t) => sum + t.montant, 0).toLocaleString()}
          </p>
          <p className="text-xs opacity-70 mt-1">DZD</p>
        </GlassCard>
      </div>

      {/* Filters */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} />
          <h3 className="text-lg font-semibold">Filtres avancés</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Type de transaction</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
            >
              <option value="all">Tous les types</option>
              <option value="virement">Virement</option>
              <option value="cheque">Chèque</option>
              <option value="opposition">Opposition</option>
              <option value="prelevement">Prélèvement</option>
              <option value="carte">Carte</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Statut</label>
            <select
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
            >
              <option value="all">Tous les statuts</option>
              <option value="validé">Validé</option>
              <option value="en cours">En cours</option>
              <option value="refusé">Refusé</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Banque</label>
            <select
              value={filterBanque}
              onChange={(e) => setFilterBanque(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
            >
              <option value="all">Toutes les banques</option>
              <option value="BNA">BNA</option>
              <option value="BEA">BEA</option>
              <option value="CPA">CPA</option>
              <option value="BADR">BADR</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Date début</label>
            <input
              type="date"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date fin</label>
            <input
              type="date"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
            />
          </div>
        </div>
      </GlassCard>

      {/* Transactions table */}
      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-3 text-sm font-medium opacity-70">Référence</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Date</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Type</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Bénéficiaire</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Banque</th>
                <th className="text-right p-3 text-sm font-medium opacity-70">Montant</th>
                <th className="text-center p-3 text-sm font-medium opacity-70">Statut</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((txn) => (
                <tr key={txn.id} className="border-b border-border/10 hover:bg-white/5">
                  <td className="p-3 text-sm font-mono">{txn.reference}</td>
                  <td className="p-3 text-sm">{txn.date}</td>
                  <td className="p-3 text-sm capitalize">{txn.type}</td>
                  <td className="p-3 text-sm">{txn.beneficiaire}</td>
                  <td className="p-3 text-sm font-semibold">{txn.banque}</td>
                  <td className="p-3 text-sm text-right font-bold">{txn.montant.toLocaleString()} DZD</td>
                  <td className="p-3 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                      txn.statut === 'validé' ? 'bg-green-500/20 text-green-500' :
                      txn.statut === 'en cours' ? 'bg-orange-500/20 text-orange-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {txn.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/30">
          <p className="text-sm opacity-70">
            Page {page} sur {totalPages} • {filteredTransactions.length} résultats
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl glass border border-border/30 hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl glass border border-border/30 hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
