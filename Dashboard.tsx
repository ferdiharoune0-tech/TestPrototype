import React from 'react';
import { useApp } from '../context/AppContext';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, CreditCard, Activity, Send } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const Dashboard: React.FC = () => {
  const { selectedCompany, selectedBank } = useApp();

  const kpis = [
    {
      label: 'Solde Total',
      value: '145 678 920 DZD',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'var(--color-emerald)'
    },
    {
      label: 'Encours Crédit',
      value: '45 230 000 DZD',
      change: '-3.2%',
      trend: 'down',
      icon: CreditCard,
      color: 'var(--color-navy)'
    },
    {
      label: 'Fraude Détectée',
      value: '3 tentatives',
      change: '0',
      trend: 'stable',
      icon: AlertTriangle,
      color: 'var(--color-danger)'
    },
    {
      label: 'Virements / Mois',
      value: '2 847',
      change: '+8.7%',
      trend: 'up',
      icon: Send,
      color: 'var(--color-gold)'
    }
  ];

  const balanceData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Solde (M DZD)',
        data: [120, 125, 132, 128, 138, 145],
        borderColor: 'rgb(0, 168, 107)',
        backgroundColor: 'rgba(0, 168, 107, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const transactionData = {
    labels: ['Virements', 'Prélèvements', 'Chèques', 'Cartes', 'Autres'],
    datasets: [
      {
        data: [45, 20, 15, 12, 8],
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

  const alerts = [
    { type: 'warning', message: 'Chèque impayé détecté - 150 000 DZD', time: 'Il y a 2h' },
    { type: 'info', message: 'Opposition enregistrée sur compte N°00125478', time: 'Il y a 5h' },
    { type: 'danger', message: 'ATD (Avis à Tiers Détenteur) reçu', time: 'Hier' }
  ];

  const economicIndicators = [
    { label: 'Taux Directeur', value: '3.00%', change: '0.00%' },
    { label: 'Inflation', value: '7.2%', change: '+0.3%' },
    { label: 'EUR/DZD', value: '142.00', change: '+0.5%' },
    { label: 'USD/DZD', value: '135.00', change: '+0.2%' },
    { label: 'CNY/DZD', value: '19.37', change: '-0.1%' },
    { label: 'GBP/DZD', value: '177.64', change: '+0.7%' }
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Interface de Suivi
          </h1>
          <p className="text-sm opacity-70">
            {selectedCompany} × {selectedBank}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="text-green-500 animate-pulse" />
          <span className="text-sm">Connexion sécurisée</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <div key={index} className="glass p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: `${kpi.color}20` }}
              >
                <kpi.icon size={24} style={{ color: kpi.color }} />
              </div>
              {kpi.trend === 'up' && <TrendingUp size={20} className="text-green-500" />}
              {kpi.trend === 'down' && <TrendingDown size={20} className="text-red-500" />}
            </div>
            <p className="text-sm opacity-70 mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold mb-1">{kpi.value}</p>
            {kpi.change !== '0' && (
              <p
                className={`text-sm ${
                  kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {kpi.change} vs mois dernier
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Balance evolution */}
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">Évolution du Solde (6 derniers mois)</h3>
          <div style={{ height: '300px' }}>
            <Line data={balanceData} options={chartOptions} />
          </div>
        </div>

        {/* Transaction breakdown */}
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">Répartition des Transactions</h3>
          <div style={{ height: '300px' }}>
            <Doughnut data={transactionData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Alerts and Economic indicators */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle size={20} />
            Alertes Récentes
          </h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-l-4 ${
                  alert.type === 'warning'
                    ? 'bg-yellow-500/10 border-yellow-500'
                    : alert.type === 'danger'
                    ? 'bg-red-500/10 border-red-500'
                    : 'bg-blue-500/10 border-blue-500'
                }`}
              >
                <p className="font-medium mb-1">{alert.message}</p>
                <p className="text-xs opacity-70">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Economic indicators */}
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">Indicateurs Économiques</h3>
          <div className="grid grid-cols-2 gap-4">
            {economicIndicators.map((indicator, index) => (
              <div key={index} className="p-3 rounded-xl bg-white/5">
                <p className="text-xs opacity-70 mb-1">{indicator.label}</p>
                <p className="text-xl font-bold">{indicator.value}</p>
                <p
                  className={`text-xs ${
                    indicator.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {indicator.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
