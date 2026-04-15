import React, { useState } from 'react';
import { Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface Echeance {
  id: string;
  creditRef: string;
  montant: number;
  taux: string;
  dateEcheance: string;
  status: 'paye' | 'impaye' | 'a_venir';
  banque: string;
}

export const Echeancier: React.FC = () => {
  const today = new Date('2026-04-14');

  const [echeances] = useState<Echeance[]>([
    {
      id: '1',
      creditRef: 'CRD-2024-001',
      montant: 850000,
      taux: '4.5%',
      dateEcheance: '2026-04-15',
      status: 'a_venir',
      banque: 'BNA'
    },
    {
      id: '2',
      creditRef: 'CRD-2024-002',
      montant: 620000,
      taux: '5.2%',
      dateEcheance: '2026-04-20',
      status: 'a_venir',
      banque: 'BEA'
    },
    {
      id: '3',
      creditRef: 'CRD-2023-078',
      montant: 1200000,
      taux: '4.8%',
      dateEcheance: '2026-05-05',
      status: 'a_venir',
      banque: 'CPA'
    },
    {
      id: '4',
      creditRef: 'CRD-2024-015',
      montant: 450000,
      taux: '5.5%',
      dateEcheance: '2026-05-18',
      status: 'a_venir',
      banque: 'BADR'
    },
    {
      id: '5',
      creditRef: 'CRD-2024-001',
      montant: 850000,
      taux: '4.5%',
      dateEcheance: '2026-03-15',
      status: 'paye',
      banque: 'BNA'
    },
    {
      id: '6',
      creditRef: 'CRD-2024-002',
      montant: 620000,
      taux: '5.2%',
      dateEcheance: '2026-03-20',
      status: 'paye',
      banque: 'BEA'
    },
    {
      id: '7',
      creditRef: 'CRD-2023-089',
      montant: 380000,
      taux: '6.0%',
      dateEcheance: '2026-02-28',
      status: 'impaye',
      banque: 'BDL'
    }
  ]);

  const getDaysUntil = (dateStr: string) => {
    const date = new Date(dateStr);
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusInfo = (echeance: Echeance) => {
    if (echeance.status === 'paye') {
      return {
        label: 'Payé',
        color: 'bg-green-500/20 text-green-500 border-green-500',
        icon: CheckCircle,
        alert: false
      };
    }

    if (echeance.status === 'impaye') {
      return {
        label: 'Impayé',
        color: 'bg-red-500/20 text-red-500 border-red-500',
        icon: AlertTriangle,
        alert: true
      };
    }

    const daysUntil = getDaysUntil(echeance.dateEcheance);

    if (daysUntil < 0) {
      return {
        label: 'En retard',
        color: 'bg-red-500/20 text-red-500 border-red-500',
        icon: AlertTriangle,
        alert: true
      };
    } else if (daysUntil <= 7) {
      return {
        label: `${daysUntil}j restant${daysUntil > 1 ? 's' : ''}`,
        color: 'bg-orange-500/20 text-orange-500 border-orange-500',
        icon: AlertTriangle,
        alert: true
      };
    } else {
      return {
        label: `${daysUntil}j restant${daysUntil > 1 ? 's' : ''}`,
        color: 'bg-blue-500/20 text-blue-500 border-blue-500',
        icon: Clock,
        alert: false
      };
    }
  };

  // Group by month for timeline
  const getMonthKey = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  const monthGroups = echeances
    .filter(e => e.status === 'a_venir')
    .reduce((acc, ech) => {
      const key = getMonthKey(ech.dateEcheance);
      if (!acc[key]) acc[key] = [];
      acc[key].push(ech);
      return acc;
    }, {} as Record<string, Echeance[]>);

  const sortedMonths = Object.keys(monthGroups).sort();

  const payeCount = echeances.filter(e => e.status === 'paye').length;
  const impayeCount = echeances.filter(e => e.status === 'impaye').length;
  const aVenirCount = echeances.filter(e => e.status === 'a_venir').length;
  const alerteCount = echeances.filter(e => {
    const info = getStatusInfo(e);
    return info.alert;
  }).length;

  const totalAVenir = echeances
    .filter(e => e.status === 'a_venir')
    .reduce((sum, e) => sum + e.montant, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <Calendar style={{ color: 'var(--color-navy)' }} />
          Échéancier des Crédits
        </h1>
        <p className="text-sm opacity-70">
          Planification et suivi des échéances de remboursement
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Total échéances</p>
          <p className="text-3xl font-bold">{echeances.length}</p>
          <p className="text-xs opacity-70 mt-1">Toutes périodes</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">À venir</p>
          <p className="text-3xl font-bold text-blue-500">{aVenirCount}</p>
          <p className="text-xs opacity-70 mt-1">Prochains mois</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Alertes</p>
          <p className="text-3xl font-bold text-orange-500">{alerteCount}</p>
          <p className="text-xs opacity-70 mt-1">&lt; 7 jours</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Impayées</p>
          <p className="text-3xl font-bold text-red-500">{impayeCount}</p>
          <p className="text-xs opacity-70 mt-1">Action requise</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Montant à venir</p>
          <p className="text-2xl font-bold">{totalAVenir.toLocaleString()}</p>
          <p className="text-xs opacity-70 mt-1">DZD</p>
        </GlassCard>
      </div>

      {/* Timeline horizontale */}
      <GlassCard>
        <h3 className="text-lg font-semibold mb-6">Timeline des 6 prochains mois</h3>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            {sortedMonths.slice(0, 6).map((monthKey, index) => {
              const [year, month] = monthKey.split('-');
              const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
              const monthEcheances = monthGroups[monthKey];
              const monthTotal = monthEcheances.reduce((sum, e) => sum + e.montant, 0);

              return (
                <div key={monthKey} className="relative">
                  {/* Connecting line */}
                  {index < sortedMonths.length - 1 && (
                    <div className="absolute top-8 left-full w-6 h-0.5 bg-border/30" />
                  )}

                  <div className="w-64">
                    {/* Month header */}
                    <div className="glass p-4 rounded-xl mb-4 border-b-4 border-[var(--color-emerald)]">
                      <p className="text-sm font-semibold capitalize">{monthName}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {monthEcheances.length} échéance{monthEcheances.length > 1 ? 's' : ''}
                      </p>
                      <p className="text-lg font-bold mt-2">{monthTotal.toLocaleString()} DZD</p>
                    </div>

                    {/* Echéances cards */}
                    <div className="space-y-2">
                      {monthEcheances.map((ech) => {
                        const statusInfo = getStatusInfo(ech);
                        const Icon = statusInfo.icon;

                        return (
                          <div
                            key={ech.id}
                            className={`p-4 rounded-xl border-l-4 ${statusInfo.color} glass`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="text-xs font-mono opacity-70">{ech.creditRef}</p>
                                <p className="text-sm font-semibold">{ech.banque}</p>
                              </div>
                              <Icon size={16} />
                            </div>
                            <p className="text-lg font-bold mb-1">{ech.montant.toLocaleString()} DZD</p>
                            <div className="flex items-center justify-between text-xs">
                              <span className="opacity-70">Taux: {ech.taux}</span>
                              <span className={statusInfo.color.split(' ')[1]}>
                                {new Date(ech.dateEcheance).getDate()}/{parseInt(month)}
                              </span>
                            </div>
                            <div className="mt-2">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs ${statusInfo.color}`}>
                                {statusInfo.label}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </GlassCard>

      {/* Alertes */}
      {alerteCount > 0 && (
        <GlassCard className="border-l-4 border-orange-500">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-orange-500 mt-1" size={24} />
            <div className="flex-1">
              <h4 className="font-semibold mb-2 text-orange-500">
                {alerteCount} échéance{alerteCount > 1 ? 's' : ''} nécessite{alerteCount > 1 ? 'nt' : ''} votre attention
              </h4>
              <div className="space-y-2">
                {echeances
                  .filter(e => getStatusInfo(e).alert)
                  .map(ech => {
                    const statusInfo = getStatusInfo(ech);
                    return (
                      <div key={ech.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                        <div>
                          <p className="font-semibold">{ech.creditRef} - {ech.banque}</p>
                          <p className="text-sm opacity-70">Échéance: {ech.dateEcheance}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{ech.montant.toLocaleString()} DZD</p>
                          <p className={`text-xs ${statusInfo.color.split(' ')[1]}`}>
                            {statusInfo.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Historique */}
      <GlassCard>
        <h3 className="text-lg font-semibold mb-4">Historique complet</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-3 text-sm font-medium opacity-70">Référence</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Banque</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Date échéance</th>
                <th className="text-right p-3 text-sm font-medium opacity-70">Montant</th>
                <th className="text-center p-3 text-sm font-medium opacity-70">Taux</th>
                <th className="text-center p-3 text-sm font-medium opacity-70">Statut</th>
              </tr>
            </thead>
            <tbody>
              {echeances
                .sort((a, b) => new Date(b.dateEcheance).getTime() - new Date(a.dateEcheance).getTime())
                .map((ech) => {
                  const statusInfo = getStatusInfo(ech);

                  return (
                    <tr key={ech.id} className="border-b border-border/10 hover:bg-white/5">
                      <td className="p-3 text-sm font-mono">{ech.creditRef}</td>
                      <td className="p-3 text-sm font-semibold">{ech.banque}</td>
                      <td className="p-3 text-sm">{ech.dateEcheance}</td>
                      <td className="p-3 text-sm text-right font-bold">{ech.montant.toLocaleString()} DZD</td>
                      <td className="p-3 text-sm text-center">{ech.taux}</td>
                      <td className="p-3 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${statusInfo.color}`}>
                          {statusInfo.label}
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
