import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { MENU_PAGES } from '../data/constants';
import { FileDown, Search, Filter } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Mock data generator
const generateMockData = (count: number = 7) => {
  const types = ['Virement', 'Prélèvement', 'Chèque', 'Carte', 'Espèces', 'Opposition', 'Contrat'];
  const status = ['En cours', 'Validé', 'Refusé', 'En attente'];
  const data = [];

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      reference: `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      date: new Date(2026, 3, Math.floor(Math.random() * 13) + 1).toISOString().split('T')[0],
      type: types[Math.floor(Math.random() * types.length)],
      montant: (Math.floor(Math.random() * 900000) + 100000).toLocaleString(),
      destinataire: [
        'SARL TechnoService',
        'EURL GlobalTrade',
        'SPA IndustrieAlger',
        'ETS MedConsult',
        'SONATRACH',
        'SONELGAZ'
      ][Math.floor(Math.random() * 6)],
      status: status[Math.floor(Math.random() * status.length)]
    });
  }

  return data;
};

export const GenericPage: React.FC = () => {
  const location = useLocation();
  const currentPage = MENU_PAGES.find(page => page.path === location.pathname);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [mockData] = useState(generateMockData(8));

  const pageTitle = currentPage?.label || 'Page';

  // Chart data
  const chartData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Activité de la semaine',
        data: [12, 19, 15, 25, 22, 18, 14],
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
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5
        }
      }
    }
  };

  const filteredData = mockData.filter(item => {
    const matchesSearch =
      item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.destinataire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === 'all' || item.type === filterType;

    return matchesSearch && matchesFilter;
  });

  const handleExportPDF = () => {
    alert(`Export PDF de la page "${pageTitle}" (simulation)`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Validé':
        return 'bg-green-500/20 text-green-500';
      case 'En cours':
        return 'bg-blue-500/20 text-blue-500';
      case 'Refusé':
        return 'bg-red-500/20 text-red-500';
      case 'En attente':
        return 'bg-yellow-500/20 text-yellow-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {pageTitle}
          </h1>
          <p className="text-sm opacity-70">
            Gestion et suivi de vos {pageTitle.toLowerCase()}
          </p>
        </div>
        <button
          onClick={handleExportPDF}
          className="px-4 py-3 rounded-xl glass border border-border/30 hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <FileDown size={20} />
          <span className="hidden sm:inline">Export PDF</span>
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass p-6 rounded-2xl">
          <p className="text-sm opacity-70 mb-1">Total</p>
          <p className="text-3xl font-bold">{mockData.length}</p>
          <p className="text-xs opacity-70 mt-1">Enregistrements</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <p className="text-sm opacity-70 mb-1">Ce mois</p>
          <p className="text-3xl font-bold">
            {mockData.filter(d => new Date(d.date).getMonth() === 3).length}
          </p>
          <p className="text-xs opacity-70 mt-1">Avril 2026</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <p className="text-sm opacity-70 mb-1">Montant total</p>
          <p className="text-2xl font-bold">
            {mockData.reduce((sum, d) => sum + parseInt(d.montant.replace(/\s/g, '')), 0).toLocaleString()}
          </p>
          <p className="text-xs opacity-70 mt-1">DZD</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <p className="text-sm opacity-70 mb-1">Validés</p>
          <p className="text-3xl font-bold" style={{ color: 'var(--color-emerald)' }}>
            {mockData.filter(d => d.status === 'Validé').length}
          </p>
          <p className="text-xs opacity-70 mt-1">
            {Math.round((mockData.filter(d => d.status === 'Validé').length / mockData.length) * 100)}%
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">Activité hebdomadaire</h3>
        <div style={{ height: '250px' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Filters */}
      <div className="glass p-6 rounded-2xl">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par référence, destinataire, type..."
              className="w-full pl-12 pr-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" size={20} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)] appearance-none"
            >
              <option value="all">Tous les types</option>
              <option value="Virement">Virement</option>
              <option value="Prélèvement">Prélèvement</option>
              <option value="Chèque">Chèque</option>
              <option value="Carte">Carte</option>
              <option value="Espèces">Espèces</option>
              <option value="Opposition">Opposition</option>
              <option value="Contrat">Contrat</option>
            </select>
          </div>
        </div>

        {/* Data table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-3 text-sm font-medium opacity-70">#</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Référence</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Date</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Type</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Destinataire</th>
                <th className="text-right p-3 text-sm font-medium opacity-70">Montant</th>
                <th className="text-center p-3 text-sm font-medium opacity-70">Statut</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="border-b border-border/10 hover:bg-white/5">
                    <td className="p-3 text-sm opacity-70">{item.id}</td>
                    <td className="p-3 text-sm font-mono">{item.reference}</td>
                    <td className="p-3 text-sm">{item.date}</td>
                    <td className="p-3 text-sm">{item.type}</td>
                    <td className="p-3 text-sm">{item.destinataire}</td>
                    <td className="p-3 text-sm text-right font-semibold">{item.montant} DZD</td>
                    <td className="p-3 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center opacity-70">
                    Aucun résultat trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredData.length > 0 && (
          <div className="mt-4 text-sm opacity-70 text-center">
            Affichage de {filteredData.length} sur {mockData.length} enregistrements
          </div>
        )}
      </div>
    </div>
  );
};
