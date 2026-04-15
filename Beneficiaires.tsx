import React, { useState } from 'react';
import { Users, Send, Clock } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface Beneficiaire {
  id: string;
  nom: string;
  initiales: string;
  rib: string;
  dernierVirement: {
    date: string;
    montant: string;
  };
  frequence: number;
  color: string;
}

export const Beneficiaires: React.FC = () => {
  const [beneficiaires] = useState<Beneficiaire[]>([
    {
      id: '1',
      nom: 'SARL TechnoService',
      initiales: 'TS',
      rib: '00500015123456789012',
      dernierVirement: {
        date: '2026-04-10',
        montant: '250 000'
      },
      frequence: 42,
      color: '#0A2540'
    },
    {
      id: '2',
      nom: 'EURL GlobalTrade',
      initiales: 'GT',
      rib: '00300025987654321098',
      dernierVirement: {
        date: '2026-04-08',
        montant: '180 000'
      },
      frequence: 38,
      color: '#00A86B'
    },
    {
      id: '3',
      nom: 'SPA IndustrieAlger',
      initiales: 'IA',
      rib: '00100035456789012345',
      dernierVirement: {
        date: '2026-04-05',
        montant: '420 000'
      },
      frequence: 35,
      color: '#FFD700'
    },
    {
      id: '4',
      nom: 'ETS MedConsult',
      initiales: 'MC',
      rib: '00600045678901234567',
      dernierVirement: {
        date: '2026-04-02',
        montant: '95 000'
      },
      frequence: 28,
      color: '#6366F1'
    },
    {
      id: '5',
      nom: 'SARL BuildCorp',
      initiales: 'BC',
      rib: '00200055321098765432',
      dernierVirement: {
        date: '2026-03-28',
        montant: '310 000'
      },
      frequence: 24,
      color: '#EC4899'
    },
    {
      id: '6',
      nom: 'SONELGAZ',
      initiales: 'SG',
      rib: '00400065789012345678',
      dernierVirement: {
        date: '2026-03-25',
        montant: '520 000'
      },
      frequence: 22,
      color: '#10B981'
    },
    {
      id: '7',
      nom: 'Algérie Télécom',
      initiales: 'AT',
      rib: '00500075234567890123',
      dernierVirement: {
        date: '2026-03-20',
        montant: '145 000'
      },
      frequence: 18,
      color: '#F59E0B'
    },
    {
      id: '8',
      nom: 'COSIDER',
      initiales: 'CS',
      rib: '00100085567890123456',
      dernierVirement: {
        date: '2026-03-15',
        montant: '680 000'
      },
      frequence: 15,
      color: '#8B5CF6'
    }
  ]);

  const [selectedBenef, setSelectedBenef] = useState<Beneficiaire | null>(null);

  const handleVirementRapide = (benef: Beneficiaire) => {
    setSelectedBenef(benef);
    setTimeout(() => setSelectedBenef(null), 3000);
    alert(`Virement rapide vers ${benef.nom}\nRIB: ${benef.rib.slice(0, 3)}-${benef.rib.slice(3, 8)}-${benef.rib.slice(8)}`);
  };

  const totalFrequence = beneficiaires.reduce((sum, b) => sum + b.frequence, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <Users style={{ color: 'var(--color-emerald)' }} />
          Bénéficiaires Fréquents
        </h1>
        <p className="text-sm opacity-70">
          Accès rapide à vos bénéficiaires les plus utilisés
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Bénéficiaires enregistrés</p>
          <p className="text-3xl font-bold">{beneficiaires.length}</p>
          <p className="text-xs opacity-70 mt-1">Top utilisés</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Virements totaux</p>
          <p className="text-3xl font-bold">{totalFrequence}</p>
          <p className="text-xs opacity-70 mt-1">Derniers 6 mois</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Gain de temps</p>
          <p className="text-3xl font-bold">~85%</p>
          <p className="text-xs opacity-70 mt-1">Vs saisie manuelle</p>
        </GlassCard>
      </div>

      {/* Beneficiaires grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {beneficiaires.map((benef) => (
          <GlassCard
            key={benef.id}
            className="hover:scale-105 transition-transform cursor-pointer"
            noPadding
          >
            <div className="p-6">
              {/* Avatar with initials */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${benef.color}20` }}
              >
                <span
                  className="text-3xl font-bold"
                  style={{ color: benef.color }}
                >
                  {benef.initiales}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-semibold text-center mb-2 min-h-[2.5rem]">
                {benef.nom}
              </h3>

              {/* RIB truncated */}
              <p className="text-xs font-mono text-center opacity-70 mb-1">
                {benef.rib.slice(0, 3)}-***-****
              </p>

              {/* Last transfer */}
              <div className="flex items-center justify-center gap-1 text-xs opacity-70 mb-4">
                <Clock size={12} />
                <span>{benef.dernierVirement.date}</span>
              </div>

              {/* Frequence badge */}
              <div className="text-center mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs bg-white/10">
                  {benef.frequence} virements
                </span>
              </div>
            </div>

            {/* Quick action */}
            <button
              onClick={() => handleVirementRapide(benef)}
              className="w-full py-3 rounded-b-2xl bg-gradient-to-r from-[var(--color-navy)] to-[var(--color-emerald)] text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Send size={16} />
              Virement rapide
            </button>
          </GlassCard>
        ))}
      </div>

      {/* Detailed table */}
      <GlassCard>
        <h3 className="text-lg font-semibold mb-4">Détails des bénéficiaires</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-3 text-sm font-medium opacity-70">Bénéficiaire</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">RIB (20 chiffres)</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Dernier virement</th>
                <th className="text-right p-3 text-sm font-medium opacity-70">Montant</th>
                <th className="text-center p-3 text-sm font-medium opacity-70">Fréquence</th>
              </tr>
            </thead>
            <tbody>
              {beneficiaires.map((benef) => (
                <tr key={benef.id} className="border-b border-border/10 hover:bg-white/5">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${benef.color}20` }}
                      >
                        <span className="font-bold" style={{ color: benef.color }}>
                          {benef.initiales}
                        </span>
                      </div>
                      <span className="font-semibold">{benef.nom}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm font-mono">
                    {benef.rib.slice(0, 3)}-{benef.rib.slice(3, 8)}-{benef.rib.slice(8)}
                  </td>
                  <td className="p-3 text-sm">{benef.dernierVirement.date}</td>
                  <td className="p-3 text-sm text-right font-semibold">
                    {benef.dernierVirement.montant} DZD
                  </td>
                  <td className="p-3 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-emerald)]/20 text-[var(--color-emerald)] text-xs font-semibold">
                      {benef.frequence}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
