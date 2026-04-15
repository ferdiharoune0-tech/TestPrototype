import React, { useState } from 'react';
import { FileSearch, TrendingUp } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Line } from 'react-chartjs-2';

export const Audit: React.FC = () => {
  const [periode, setPeriode] = useState<'mois' | 'trimestre' | 'annee'>('mois');

  const kpis = [
    { label: 'Transactions auditées', value: '12 847', icon: '📊' },
    { label: 'Anomalies détectées', value: '23', icon: '⚠️' },
    { label: 'Taux de conformité', value: '99.8%', icon: '✓' }
  ];

  const chartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Taux de conformité (%)',
        data: [99.2, 99.5, 99.7, 99.6, 99.8, 99.8],
        borderColor: 'rgb(0, 168, 107)',
        backgroundColor: 'rgba(0, 168, 107, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <FileSearch style={{ color: 'var(--color-navy)' }} />
          Rapports d'Audit
        </h1>
        <p className="text-sm opacity-70">Conformité et contrôle des opérations bancaires</p>
      </div>

      <div className="flex gap-3">
        {(['mois', 'trimestre', 'annee'] as const).map(p => (
          <button
            key={p}
            onClick={() => setPeriode(p)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              periode === p
                ? 'bg-gradient-to-r from-[var(--color-navy)] to-[var(--color-emerald)] text-white'
                : 'glass border border-border/30 hover:bg-white/10'
            }`}
          >
            {p === 'mois' ? 'Mois' : p === 'trimestre' ? 'Trimestre' : 'Année'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((kpi, i) => (
          <GlassCard key={i}>
            <p className="text-4xl mb-2">{kpi.icon}</p>
            <p className="text-sm opacity-70 mb-1">{kpi.label}</p>
            <p className="text-3xl font-bold">{kpi.value}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <h3 className="text-lg font-semibold mb-4">Tendance mensuelle de conformité</h3>
        <div style={{ height: '300px' }}>
          <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </GlassCard>
    </div>
  );
};
