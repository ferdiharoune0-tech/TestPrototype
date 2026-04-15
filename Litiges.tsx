import React, { useState } from 'react';
import { Scale, Paperclip, MessageCircle } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface Litige {
  id: string;
  reference: string;
  type: string;
  montant: string;
  dateOuverture: string;
  beneficiaire: string;
  statut: 'ouvert' | 'en_cours' | 'resolu' | 'rejete';
  timeline: {
    date: string;
    action: string;
    acteur: string;
  }[];
  piecesJointes: {
    nom: string;
    type: 'pdf' | 'img';
  }[];
  messages: number;
}

export const Litiges: React.FC = () => {
  const [litiges] = useState<Litige[]>([
    {
      id: '1',
      reference: 'LIT-2026-0012',
      type: 'Virement non reçu',
      montant: '850 000',
      dateOuverture: '2026-04-10',
      beneficiaire: 'SARL TechnoService',
      statut: 'en_cours',
      timeline: [
        { date: '2026-04-10', action: 'Ouverture du litige', acteur: 'Client' },
        { date: '2026-04-11', action: 'Prise en charge par le service', acteur: 'Banque' },
        { date: '2026-04-12', action: 'Demande de pièces complémentaires', acteur: 'Banque' },
        { date: '2026-04-13', action: 'Documents fournis', acteur: 'Client' }
      ],
      piecesJointes: [
        { nom: 'justificatif_virement.pdf', type: 'pdf' },
        { nom: 'releve_bancaire.pdf', type: 'pdf' },
        { nom: 'capture_ecran.png', type: 'img' }
      ],
      messages: 5
    },
    {
      id: '2',
      reference: 'LIT-2026-0008',
      type: 'Frais incorrects',
      montant: '12 500',
      dateOuverture: '2026-04-02',
      beneficiaire: 'BEA',
      statut: 'resolu',
      timeline: [
        { date: '2026-04-02', action: 'Ouverture du litige', acteur: 'Client' },
        { date: '2026-04-03', action: 'Analyse du dossier', acteur: 'Banque' },
        { date: '2026-04-04', action: 'Remboursement effectué', acteur: 'Banque' },
        { date: '2026-04-05', action: 'Litige clos', acteur: 'Banque' }
      ],
      piecesJointes: [
        { nom: 'releve_frais.pdf', type: 'pdf' }
      ],
      messages: 3
    },
    {
      id: '3',
      reference: 'LIT-2026-0005',
      type: 'Chèque rejeté à tort',
      montant: '420 000',
      dateOuverture: '2026-03-28',
      beneficiaire: 'SPA IndustrieAlger',
      statut: 'rejete',
      timeline: [
        { date: '2026-03-28', action: 'Ouverture du litige', acteur: 'Client' },
        { date: '2026-03-29', action: 'Vérification signature', acteur: 'Banque' },
        { date: '2026-03-30', action: 'Signature confirmée non conforme', acteur: 'Banque' },
        { date: '2026-03-31', action: 'Litige rejeté', acteur: 'Banque' }
      ],
      piecesJointes: [
        { nom: 'cheque_scanne.pdf', type: 'pdf' },
        { nom: 'specimen_signature.pdf', type: 'pdf' }
      ],
      messages: 7
    }
  ]);

  const [selectedLitige, setSelectedLitige] = useState<Litige | null>(null);

  const getStatusInfo = (statut: Litige['statut']) => {
    switch (statut) {
      case 'ouvert':
        return { label: 'Ouvert', color: 'bg-blue-500/20 text-blue-500 border-blue-500' };
      case 'en_cours':
        return { label: 'En cours', color: 'bg-orange-500/20 text-orange-500 border-orange-500' };
      case 'resolu':
        return { label: 'Résolu', color: 'bg-green-500/20 text-green-500 border-green-500' };
      case 'rejete':
        return { label: 'Rejeté', color: 'bg-red-500/20 text-red-500 border-red-500' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <Scale style={{ color: 'var(--color-gold)' }} />
          Gestion des Litiges
        </h1>
        <p className="text-sm opacity-70">
          Suivi des litiges bancaires avec workflow complet
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['ouvert', 'en_cours', 'resolu', 'rejete'].map(status => {
          const count = litiges.filter(l => l.statut === status).length;
          const statusInfo = getStatusInfo(status as Litige['statut']);
          return (
            <GlassCard key={status}>
              <p className="text-sm opacity-70 mb-1 capitalize">{statusInfo.label}</p>
              <p className={`text-3xl font-bold ${statusInfo.color.split(' ')[1]}`}>{count}</p>
            </GlassCard>
          );
        })}
      </div>

      {/* Litiges list */}
      <div className="space-y-4">
        {litiges.map((litige) => {
          const statusInfo = getStatusInfo(litige.statut);

          return (
            <GlassCard
              key={litige.id}
              className={`border-l-4 ${statusInfo.color.split(' ')[2]} hover:scale-[1.01] transition-transform cursor-pointer`}
              onClick={() => setSelectedLitige(litige)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-mono opacity-70 mb-1">{litige.reference}</p>
                  <h3 className="text-xl font-bold mb-1">{litige.type}</h3>
                  <p className="text-sm opacity-90">{litige.beneficiaire}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold mb-1">{litige.montant} DZD</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs opacity-70 mb-1">Date ouverture</p>
                  <p className="font-semibold">{litige.dateOuverture}</p>
                </div>
                <div>
                  <p className="text-xs opacity-70 mb-1">Pièces jointes</p>
                  <p className="font-semibold flex items-center gap-2">
                    <Paperclip size={16} />
                    {litige.piecesJointes.length} document{litige.piecesJointes.length > 1 ? 's' : ''}
                  </p>
                </div>
                <div>
                  <p className="text-xs opacity-70 mb-1">Messages</p>
                  <p className="font-semibold flex items-center gap-2">
                    <MessageCircle size={16} />
                    {litige.messages} échange{litige.messages > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Timeline preview */}
              <div className="pt-4 border-t border-border/30">
                <p className="text-xs font-semibold opacity-70 mb-2">Dernière action</p>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-emerald)]" />
                  <div>
                    <p className="text-sm font-semibold">
                      {litige.timeline[litige.timeline.length - 1].action}
                    </p>
                    <p className="text-xs opacity-70">
                      {litige.timeline[litige.timeline.length - 1].date} - {litige.timeline[litige.timeline.length - 1].acteur}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Litige detail modal */}
      {selectedLitige && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-strong p-8 rounded-3xl max-w-4xl w-full my-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm font-mono opacity-70 mb-1">{selectedLitige.reference}</p>
                <h2 className="text-2xl font-bold">{selectedLitige.type}</h2>
              </div>
              <button
                onClick={() => setSelectedLitige(null)}
                className="text-2xl hover:bg-white/10 rounded-lg p-2"
              >
                ×
              </button>
            </div>

            {/* Timeline */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Timeline du litige</h3>
              <div className="space-y-4">
                {selectedLitige.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        index === selectedLitige.timeline.length - 1
                          ? 'bg-[var(--color-emerald)]'
                          : 'bg-white/30'
                      }`} />
                      {index < selectedLitige.timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-white/10 flex-1 my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-semibold">{event.action}</p>
                      <p className="text-sm opacity-70">
                        {event.date} • {event.acteur}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pièces jointes */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Pièces jointes ({selectedLitige.piecesJointes.length})</h3>
              <div className="grid grid-cols-2 gap-3">
                {selectedLitige.piecesJointes.map((piece, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl glass border border-border/30"
                  >
                    <div className={`p-2 rounded-lg ${
                      piece.type === 'pdf' ? 'bg-red-500/20' : 'bg-blue-500/20'
                    }`}>
                      <Paperclip size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{piece.nom}</p>
                      <p className="text-xs opacity-70 uppercase">{piece.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedLitige(null)}
              className="w-full px-6 py-3 rounded-xl glass border border-border/30 hover:bg-white/10 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
