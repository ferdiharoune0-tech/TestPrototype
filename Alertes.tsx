import React, { useState } from 'react';
import { Bell, Mail, MessageSquare } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface AlertConfig {
  id: string;
  type: string;
  label: string;
  description: string;
  enabled: boolean;
  seuil?: string;
  canal: 'sms' | 'email' | 'both';
}

export const Alertes: React.FC = () => {
  const [alertes, setAlertes] = useState<AlertConfig[]>([
    {
      id: '1',
      type: 'solde',
      label: 'Seuil de solde minimum',
      description: 'Alerte lorsque le solde descend en dessous du seuil défini',
      enabled: true,
      seuil: '500000',
      canal: 'both'
    },
    {
      id: '2',
      type: 'cheque_impaye',
      label: 'Chèque impayé détecté',
      description: 'Notification immédiate en cas de chèque impayé',
      enabled: true,
      canal: 'sms'
    },
    {
      id: '3',
      type: 'opposition',
      label: 'Opposition détectée',
      description: 'Alerte en cas de nouvelle opposition sur le compte',
      enabled: true,
      canal: 'both'
    },
    {
      id: '4',
      type: 'atd',
      label: 'Avis à Tiers Détenteur (ATD)',
      description: 'Notification urgente en cas de réception d\'un ATD',
      enabled: true,
      canal: 'both'
    },
    {
      id: '5',
      type: 'virement_important',
      label: 'Virement important',
      description: 'Alerte pour les virements dépassant un montant défini',
      enabled: false,
      seuil: '1000000',
      canal: 'email'
    },
    {
      id: '6',
      type: 'fraude',
      label: 'Détection de fraude IA',
      description: 'Transaction suspecte identifiée par l\'IA',
      enabled: true,
      canal: 'both'
    },
    {
      id: '7',
      type: 'echeance',
      label: 'Échéance de crédit',
      description: 'Rappel 7 jours avant une échéance de crédit',
      enabled: true,
      canal: 'email'
    },
    {
      id: '8',
      type: 'contrat_expire',
      label: 'Contrat expire bientôt',
      description: 'Alerte 30 jours avant l\'expiration d\'un contrat',
      enabled: false,
      canal: 'email'
    }
  ]);

  const toggleAlerte = (id: string) => {
    setAlertes(alertes.map(a =>
      a.id === id ? { ...a, enabled: !a.enabled } : a
    ));
  };

  const updateCanal = (id: string, canal: AlertConfig['canal']) => {
    setAlertes(alertes.map(a =>
      a.id === id ? { ...a, canal } : a
    ));
  };

  const updateSeuil = (id: string, seuil: string) => {
    setAlertes(alertes.map(a =>
      a.id === id ? { ...a, seuil } : a
    ));
  };

  const enabledCount = alertes.filter(a => a.enabled).length;
  const smsCount = alertes.filter(a => a.enabled && (a.canal === 'sms' || a.canal === 'both')).length;
  const emailCount = alertes.filter(a => a.enabled && (a.canal === 'email' || a.canal === 'both')).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <Bell style={{ color: 'var(--color-gold)' }} />
          Alertes Personnalisées
        </h1>
        <p className="text-sm opacity-70">
          Configurez vos notifications bancaires par SMS et Email
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Alertes totales</p>
          <p className="text-3xl font-bold">{alertes.length}</p>
          <p className="text-xs opacity-70 mt-1">Configurables</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Activées</p>
          <p className="text-3xl font-bold text-green-500">{enabledCount}</p>
          <p className="text-xs opacity-70 mt-1">En cours</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Par SMS</p>
          <p className="text-3xl font-bold" style={{ color: 'var(--color-navy)' }}>{smsCount}</p>
          <p className="text-xs opacity-70 mt-1">Notifications rapides</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm opacity-70 mb-1">Par Email</p>
          <p className="text-3xl font-bold" style={{ color: 'var(--color-emerald)' }}>{emailCount}</p>
          <p className="text-xs opacity-70 mt-1">Détails complets</p>
        </GlassCard>
      </div>

      {/* Alertes configuration */}
      <GlassCard>
        <h3 className="text-lg font-semibold mb-6">Configuration des alertes</h3>
        <div className="space-y-4">
          {alertes.map((alerte) => (
            <div
              key={alerte.id}
              className={`p-5 rounded-2xl border-2 transition-all ${
                alerte.enabled
                  ? 'border-[var(--color-emerald)] bg-[var(--color-emerald)]/5'
                  : 'border-border/30 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-lg">{alerte.label}</h4>
                    <button
                      onClick={() => toggleAlerte(alerte.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        alerte.enabled ? 'bg-[var(--color-emerald)]' : 'bg-gray-400'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          alerte.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm opacity-70">{alerte.description}</p>
                </div>
              </div>

              {alerte.enabled && (
                <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/30">
                  {/* Seuil if applicable */}
                  {alerte.seuil !== undefined && (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Seuil (DZD)
                      </label>
                      <input
                        type="number"
                        value={alerte.seuil}
                        onChange={(e) => updateSeuil(alerte.id, e.target.value)}
                        className="w-full px-4 py-2 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
                        min="0"
                      />
                    </div>
                  )}

                  {/* Canal */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Canal de notification
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateCanal(alerte.id, 'sms')}
                        className={`flex-1 px-4 py-2 rounded-xl border transition-all ${
                          alerte.canal === 'sms'
                            ? 'border-[var(--color-navy)] bg-[var(--color-navy)]/20 text-[var(--color-navy)]'
                            : 'border-border/30 hover:bg-white/5'
                        }`}
                      >
                        <MessageSquare size={16} className="inline mr-2" />
                        SMS
                      </button>
                      <button
                        onClick={() => updateCanal(alerte.id, 'email')}
                        className={`flex-1 px-4 py-2 rounded-xl border transition-all ${
                          alerte.canal === 'email'
                            ? 'border-[var(--color-emerald)] bg-[var(--color-emerald)]/20 text-[var(--color-emerald)]'
                            : 'border-border/30 hover:bg-white/5'
                        }`}
                      >
                        <Mail size={16} className="inline mr-2" />
                        Email
                      </button>
                      <button
                        onClick={() => updateCanal(alerte.id, 'both')}
                        className={`flex-1 px-4 py-2 rounded-xl border transition-all ${
                          alerte.canal === 'both'
                            ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/20 text-[var(--color-gold)]'
                            : 'border-border/30 hover:bg-white/5'
                        }`}
                      >
                        Les deux
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Test notification */}
      <GlassCard className="border-l-4 border-[var(--color-emerald)]">
        <h4 className="font-semibold mb-3">Tester les notifications</h4>
        <p className="text-sm opacity-90 mb-4">
          Envoyez une notification de test pour vérifier que vos alertes fonctionnent correctement.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => alert('Notification SMS de test envoyée !')}
            className="px-6 py-3 rounded-xl glass border border-border/30 hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <MessageSquare size={18} />
            Test SMS
          </button>
          <button
            onClick={() => alert('Email de test envoyé !')}
            className="px-6 py-3 rounded-xl glass border border-border/30 hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Mail size={18} />
            Test Email
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
