import React, { useState } from 'react';
import { UserCog, Check, X } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface Role {
  id: string;
  nom: string;
  color: string;
  permissions: {
    lecture: boolean;
    ecriture: boolean;
    validation: boolean;
    suppression: boolean;
  };
}

export const Droits: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      nom: 'Admin',
      color: '#0A2540',
      permissions: { lecture: true, ecriture: true, validation: true, suppression: true }
    },
    {
      id: '2',
      nom: 'Chef Comptable',
      color: '#00A86B',
      permissions: { lecture: true, ecriture: true, validation: true, suppression: false }
    },
    {
      id: '3',
      nom: 'Comptable',
      color: '#FFD700',
      permissions: { lecture: true, ecriture: true, validation: false, suppression: false }
    },
    {
      id: '4',
      nom: 'Auditeur',
      color: '#6366F1',
      permissions: { lecture: true, ecriture: false, validation: false, suppression: false }
    }
  ]);

  const permissions = ['lecture', 'ecriture', 'validation', 'suppression'] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <UserCog style={{ color: 'var(--color-emerald)' }} />
          Gestion des Droits
        </h1>
        <p className="text-sm opacity-70">Matrice des permissions par rôle</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map(role => (
          <GlassCard
            key={role.id}
            className="cursor-pointer hover:scale-105 transition-transform"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: `${role.color}20` }}
            >
              <UserCog size={32} style={{ color: role.color }} />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">{role.nom}</h3>
            <div className="space-y-2">
              {permissions.map(perm => (
                <div key={perm} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <span className="text-sm capitalize">{perm}</span>
                  {role.permissions[perm] ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <X size={16} className="text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <h3 className="text-lg font-semibold mb-4">Matrice de permissions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-3 text-sm font-medium opacity-70">Rôle</th>
                {permissions.map(perm => (
                  <th key={perm} className="text-center p-3 text-sm font-medium opacity-70 capitalize">
                    {perm}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.map(role => (
                <tr key={role.id} className="border-b border-border/10 hover:bg-white/5">
                  <td className="p-3 font-semibold">{role.nom}</td>
                  {permissions.map(perm => (
                    <td key={perm} className="p-3 text-center">
                      {role.permissions[perm] ? (
                        <Check size={20} className="text-green-500 mx-auto" />
                      ) : (
                        <X size={20} className="text-red-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
