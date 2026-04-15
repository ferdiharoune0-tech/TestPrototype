import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, Upload, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { RIBInput } from '../components/RIBInput';

// Mock beneficiaries for autocomplete - RIB format 20 chiffres
const BENEFICIARIES = [
  { name: 'SARL TechnoService', rib: '00500015123456789012' },
  { name: 'EURL GlobalTrade', rib: '00300025987654321098' },
  { name: 'SPA IndustrieAlger', rib: '00100035456789012345' },
  { name: 'ETS MedConsult', rib: '00600045678901234567' }
];

interface Transfer {
  id: string;
  beneficiary: string;
  rib: string;
  amount: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export const Virement: React.FC = () => {
  const { smsCode } = useApp();
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [rib, setRib] = useState('');
  const [amount, setAmount] = useState('');
  const [motif, setMotif] = useState('');
  const [showSmsValidation, setShowSmsValidation] = useState(false);
  const [smsInput, setSmsInput] = useState('');
  const [suggestions, setSuggestions] = useState<typeof BENEFICIARIES>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([
    { id: '1', beneficiary: 'SARL TechnoService', rib: '00500015123456789012', amount: '125 000', date: '2026-04-10', status: 'completed' },
    { id: '2', beneficiary: 'EURL GlobalTrade', rib: '00300025987654321098', amount: '78 500', date: '2026-04-09', status: 'completed' },
    { id: '3', beneficiary: 'SPA IndustrieAlger', rib: '00100035456789012345', amount: '340 000', date: '2026-04-08', status: 'pending' }
  ]);

  const handleBeneficiaryChange = (value: string) => {
    setBeneficiaryName(value);
    if (value.length > 0) {
      const filtered = BENEFICIARIES.filter(b =>
        b.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectBeneficiary = (beneficiary: typeof BENEFICIARIES[0]) => {
    setBeneficiaryName(beneficiary.name);
    setRib(beneficiary.rib);
    setSuggestions([]);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rib.length !== 20) {
      alert('RIB invalide. Le RIB doit contenir exactement 20 chiffres.');
      return;
    }
    setShowSmsValidation(true);
  };

  const handleSmsValidation = () => {
    if (smsInput === smsCode) {
      const newTransfer: Transfer = {
        id: Date.now().toString(),
        beneficiary: beneficiaryName,
        rib,
        amount,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      setTransfers([newTransfer, ...transfers]);

      // Reset form
      setBeneficiaryName('');
      setRib('');
      setAmount('');
      setMotif('');
      setShowSmsValidation(false);
      setSmsInput('');

      alert('Virement enregistré avec succès !');
    } else {
      alert('Code SMS incorrect. Le code correct est : ' + smsCode);
    }
  };

  const ribValid = rib.length === 24 && validateRib(rib);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Virement Bancaire
        </h1>
        <p className="text-sm opacity-70">
          Effectuer un virement unique ou en lot avec validation SMS
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transfer form */}
        <div className="lg:col-span-2">
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Send size={20} />
              Nouveau Virement
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Beneficiary with autocomplete */}
              <div className="relative">
                <label className="block text-sm font-medium mb-2">Bénéficiaire</label>
                <input
                  type="text"
                  value={beneficiaryName}
                  onChange={(e) => handleBeneficiaryChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
                  placeholder="Nom du bénéficiaire"
                  required
                />
                {suggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 glass-strong rounded-xl border border-border/30 overflow-hidden">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => selectBeneficiary(s)}
                        className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors"
                      >
                        <p className="font-medium">{s.name}</p>
                        <p className="text-xs opacity-70">{s.rib}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* RIB */}
              <RIBInput
                value={rib}
                onChange={setRib}
                required
                showValidation
              />

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium mb-2">Montant (DZD)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
                  placeholder="10000"
                  min="1"
                  required
                />
              </div>

              {/* Motif */}
              <div>
                <label className="block text-sm font-medium mb-2">Motif</label>
                <input
                  type="text"
                  value={motif}
                  onChange={(e) => setMotif(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
                  placeholder="Paiement facture, Salaire, etc."
                  required
                />
              </div>

              {/* Submit buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[var(--color-navy)] to-[var(--color-emerald)] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Valider le virement
                </button>
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl glass border border-border/30 hover:bg-white/10 transition-colors flex items-center gap-2"
                  onClick={() => alert('Fonctionnalité import Excel (simulation)')}
                >
                  <Upload size={20} />
                  Import Excel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info panel */}
        <div className="space-y-4">
          

          <div className="glass p-6 rounded-2xl">
            <h4 className="font-semibold mb-3">Validation SMS</h4>
            <div className="text-sm space-y-2 opacity-90">
              <p>Code actuel : <strong className="font-mono">{smsCode}</strong></p>
              <p className="text-xs opacity-70">
                (Stocké en localStorage)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SMS Validation Modal */}
      {showSmsValidation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="glass-strong p-8 rounded-3xl max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Validation SMS</h3>
            <p className="mb-6 opacity-90">
              Un code de validation a été envoyé à votre mobile. Veuillez le saisir ci-dessous.
            </p>
            <input
              type="text"
              value={smsInput}
              onChange={(e) => setSmsInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)] text-center text-2xl font-mono mb-6"
              placeholder="123456"
              maxLength={6}
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={handleSmsValidation}
                className="flex-1 bg-gradient-to-r from-[var(--color-navy)] to-[var(--color-emerald)] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                Valider
              </button>
              <button
                onClick={() => {
                  setShowSmsValidation(false);
                  setSmsInput('');
                }}
                className="px-6 py-3 rounded-xl glass border border-border/30 hover:bg-white/10 transition-colors"
              >
                Annuler
              </button>
            </div>
            <p className="text-xs text-center mt-4 opacity-70">
              Code de démonstration : {smsCode}
            </p>
          </div>
        </div>
      )}

      {/* Transfer history */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">Historique des Virements</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-3 text-sm font-medium opacity-70">Date</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">Bénéficiaire</th>
                <th className="text-left p-3 text-sm font-medium opacity-70">RIB</th>
                <th className="text-right p-3 text-sm font-medium opacity-70">Montant</th>
                <th className="text-center p-3 text-sm font-medium opacity-70">Statut</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.id} className="border-b border-border/10 hover:bg-white/5">
                  <td className="p-3 text-sm">{transfer.date}</td>
                  <td className="p-3 text-sm font-medium">{transfer.beneficiary}</td>
                  <td className="p-3 text-sm font-mono text-xs">{transfer.rib}</td>
                  <td className="p-3 text-sm text-right font-semibold">{transfer.amount} DZD</td>
                  <td className="p-3 text-center">
                    {transfer.status === 'completed' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">
                        <CheckCircle size={14} />
                        Validé
                      </span>
                    )}
                    {transfer.status === 'pending' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-xs">
                        <Clock size={14} />
                        En cours
                      </span>
                    )}
                    {transfer.status === 'failed' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-xs">
                        <AlertCircle size={14} />
                        Échoué
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
