import React, { useState, useEffect } from 'react';
import { Landmark, QrCode, Calculator, CheckCircle, Clock } from 'lucide-react';
import QRCodeLib from 'qrcode';

interface QRCodeData {
  id: string;
  type: 'static' | 'dynamic';
  montant?: string;
  reference: string;
  status: 'pending' | 'paid';
  dateCreation: string;
}

export const Mourabaha: React.FC = () => {
  const [prixRevient, setPrixRevient] = useState('');
  const [tauxMarge, setTauxMarge] = useState('5');
  const [duree, setDuree] = useState('12');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([
    {
      id: '1',
      type: 'static',
      reference: 'QR-STATIC-001',
      status: 'paid',
      dateCreation: '2026-04-10'
    },
    {
      id: '2',
      type: 'dynamic',
      montant: '250 000',
      reference: 'QR-DYN-4523',
      status: 'pending',
      dateCreation: '2026-04-13'
    }
  ]);
  const [showQrGenerator, setShowQrGenerator] = useState(false);
  const [qrType, setQrType] = useState<'static' | 'dynamic'>('dynamic');
  const [qrMontant, setQrMontant] = useState('');

  // Calculations
  const prixRevientNum = parseFloat(prixRevient) || 0;
  const tauxMargeNum = parseFloat(tauxMarge) || 0;
  const dureeNum = parseFloat(duree) || 1;

  const margeBeneficiaire = prixRevientNum * (tauxMargeNum / 100);
  const prixVente = prixRevientNum + margeBeneficiaire;
  const mensualite = prixVente / dureeNum;

  const generateQRCode = async () => {
    const reference = `QR-${qrType === 'static' ? 'STATIC' : 'DYN'}-${Date.now().toString().slice(-4)}`;
    const qrData = qrType === 'dynamic'
      ? `DZ_MOBPAY:${reference}:${qrMontant}:DZD`
      : `DZ_MOBPAY:${reference}:VARIABLE:DZD`;

    try {
      const url = await QRCodeLib.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#0A2540',
          light: '#FFFFFF'
        }
      });

      setQrCodeUrl(url);

      const newQr: QRCodeData = {
        id: Date.now().toString(),
        type: qrType,
        montant: qrType === 'dynamic' ? qrMontant : undefined,
        reference,
        status: 'pending',
        dateCreation: new Date().toISOString().split('T')[0]
      };

      setQrCodes([newQr, ...qrCodes]);
    } catch (error) {
      console.error('Erreur génération QR code:', error);
    }
  };

  const handleQrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateQRCode();
    setShowQrGenerator(false);
    setQrMontant('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <Landmark style={{ color: 'var(--color-emerald)' }} />
          Finance Islamique Mourabaha
        </h1>
        <p className="text-sm opacity-70">
          Financement conforme à la Charia avec transparence totale
        </p>
      </div>

      {/* Info panel */}
      <div className="glass p-6 rounded-2xl" style={{ borderLeft: '4px solid var(--color-emerald)' }}>
        <h3 className="font-semibold mb-2">Qu'est-ce que la Mourabaha ?</h3>
        <p className="text-sm opacity-90 mb-3">
          La Mourabaha est un contrat de vente à coût majoré conforme aux principes de la finance islamique.
          La banque achète un bien pour le client, puis le lui revend avec une marge bénéficiaire transparente,
          connue et acceptée dès le départ.
        </p>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="p-3 rounded-lg bg-white/5">
            <p className="font-semibold mb-1" style={{ color: 'var(--color-emerald)' }}>✓ Transparence</p>
            <p className="opacity-90">Coût et marge clairement affichés</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5">
            <p className="font-semibold mb-1" style={{ color: 'var(--color-emerald)' }}>✓ Sans intérêt (Riba)</p>
            <p className="opacity-90">Marge fixe, pas de taux variable</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5">
            <p className="font-semibold mb-1" style={{ color: 'var(--color-emerald)' }}>✓ Certifié Charia</p>
            <p className="opacity-90">Validé par comité islamique</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Mourabaha calculator */}
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calculator size={20} />
            Simulateur Mourabaha
          </h3>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Prix de revient (DZD)</label>
              <input
                type="number"
                value={prixRevient}
                onChange={(e) => setPrixRevient(e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
                placeholder="1000000"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Taux de marge (%)</label>
              <input
                type="number"
                value={tauxMarge}
                onChange={(e) => setTauxMarge(e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
                placeholder="5"
                min="0"
                step="0.1"
              />
              <p className="text-xs opacity-70 mt-1">Marge transparente approuvée par le comité Charia</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Durée (mois)</label>
              <input
                type="number"
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
                placeholder="12"
                min="1"
              />
            </div>
          </div>

          {prixRevient && (
            <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-[var(--color-navy)]/10 to-[var(--color-emerald)]/10">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-70">Prix de revient</span>
                <span className="font-semibold">{prixRevientNum.toLocaleString()} DZD</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-70">Marge bénéficiaire ({tauxMarge}%)</span>
                <span className="font-semibold" style={{ color: 'var(--color-emerald)' }}>
                  +{margeBeneficiaire.toLocaleString()} DZD
                </span>
              </div>
              <div className="h-px bg-border/30 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Prix de vente total</span>
                <span className="text-xl font-bold" style={{ color: 'var(--color-navy)' }}>
                  {prixVente.toLocaleString()} DZD
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border/30">
                <span className="text-sm opacity-70">Mensualité sur {duree} mois</span>
                <span className="text-lg font-bold" style={{ color: 'var(--color-emerald)' }}>
                  {mensualite.toLocaleString()} DZD
                </span>
              </div>
            </div>
          )}
        </div>

        {/* QR Code generator */}
        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <QrCode size={20} />
              QR Code DZ Mobpay
            </h3>
            <button
              onClick={() => setShowQrGenerator(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--color-navy)] to-[var(--color-emerald)] text-white font-semibold hover:scale-105 transition-transform text-sm"
            >
              Générer QR Code
            </button>
          </div>

          {qrCodeUrl && (
            <div className="mb-6 p-4 rounded-xl bg-white flex flex-col items-center">
              <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
              <p className="text-sm mt-2" style={{ color: 'var(--color-navy)' }}>
                Scannez avec DZ Mobpay
              </p>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="font-semibold text-sm opacity-70">Historique QR Codes</h4>
            {qrCodes.map((qr) => (
              <div key={qr.id} className="p-4 rounded-xl glass border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-sm">{qr.reference}</p>
                    <p className="text-xs opacity-70">{qr.dateCreation}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        qr.type === 'static' ? 'bg-blue-500/20 text-blue-500' : 'bg-purple-500/20 text-purple-500'
                      }`}
                    >
                      {qr.type === 'static' ? 'Statique' : 'Dynamique'}
                    </span>
                    {qr.status === 'paid' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">
                        <CheckCircle size={12} />
                        Payé
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-xs">
                        <Clock size={12} />
                        En attente
                      </span>
                    )}
                  </div>
                </div>
                {qr.montant && (
                  <p className="text-sm font-semibold">{qr.montant} DZD</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QR Generator Modal */}
      {showQrGenerator && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="glass-strong p-8 rounded-3xl max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Générer QR Code DZ Mobpay</h3>

            <form onSubmit={handleQrSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type de QR Code</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setQrType('static')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      qrType === 'static'
                        ? 'border-[var(--color-emerald)] bg-[var(--color-emerald)]/10'
                        : 'border-border/30 hover:border-border/50'
                    }`}
                  >
                    <p className="font-semibold mb-1">Statique</p>
                    <p className="text-xs opacity-70">Montant variable</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQrType('dynamic')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      qrType === 'dynamic'
                        ? 'border-[var(--color-emerald)] bg-[var(--color-emerald)]/10'
                        : 'border-border/30 hover:border-border/50'
                    }`}
                  >
                    <p className="font-semibold mb-1">Dynamique</p>
                    <p className="text-xs opacity-70">Montant fixe</p>
                  </button>
                </div>
              </div>

              {qrType === 'dynamic' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Montant (DZD)</label>
                  <input
                    type="number"
                    value={qrMontant}
                    onChange={(e) => setQrMontant(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass border border-border/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald)]"
                    placeholder="100000"
                    required
                    min="1"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[var(--color-navy)] to-[var(--color-emerald)] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
                >
                  Générer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowQrGenerator(false);
                    setQrMontant('');
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
