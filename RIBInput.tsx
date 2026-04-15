import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface RIBInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  showValidation?: boolean;
}

/**
 * Format RIB Algérien : 20 chiffres
 * - 3 premiers : 001-006 ou 008-015 (jamais 007, jamais 016+)
 * - Chiffres 4-8 : 00001-00700
 * - 12 derniers : libres
 */
export const RIBInput: React.FC<RIBInputProps> = ({
  value,
  onChange,
  label = 'RIB (20 chiffres)',
  placeholder = '00500015XXXXXXXXXXXX',
  required = false,
  showValidation = true
}) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (value.length === 0) {
      setIsValid(null);
      setErrorMessage('');
      return;
    }

    if (value.length !== 20) {
      setIsValid(false);
      setErrorMessage('Le RIB doit contenir exactement 20 chiffres');
      return;
    }

    // Validation des 3 premiers chiffres
    const firstThree = value.substring(0, 3);
    const firstThreeNum = parseInt(firstThree);

    if (firstThree === '007') {
      setIsValid(false);
      setErrorMessage('Le code 007 n\'est pas autorisé');
      return;
    }

    if (firstThreeNum < 1 || firstThreeNum > 15 || (firstThreeNum === 7)) {
      setIsValid(false);
      setErrorMessage('Les 3 premiers chiffres doivent être entre 001-006 ou 008-015');
      return;
    }

    // Validation des chiffres 4-8 (positions 3-7 en index 0-based)
    const nextFive = value.substring(3, 8);
    const nextFiveNum = parseInt(nextFive);

    if (nextFiveNum < 1 || nextFiveNum > 700) {
      setIsValid(false);
      setErrorMessage('Les chiffres 4 à 8 doivent être entre 00001 et 00700');
      return;
    }

    setIsValid(true);
    setErrorMessage('');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, ''); // Only digits
    if (newValue.length <= 20) {
      onChange(newValue);
    }
  };

  const formatDisplay = (val: string) => {
    // Format: XXX-XXXXX-XXXXXXXXXXXX
    if (val.length <= 3) return val;
    if (val.length <= 8) return `${val.slice(0, 3)}-${val.slice(3)}`;
    return `${val.slice(0, 3)}-${val.slice(3, 8)}-${val.slice(8)}`;
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          value={formatDisplay(value)}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl glass border ${
            isValid === false
              ? 'border-red-500 focus:ring-red-500'
              : isValid === true
              ? 'border-green-500 focus:ring-green-500'
              : 'border-border/30 focus:ring-[var(--color-emerald)]'
          } focus:outline-none focus:ring-2 font-mono`}
          placeholder={placeholder}
          required={required}
        />
        {showValidation && value.length === 20 && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {isValid ? (
              <CheckCircle size={20} className="text-green-500" />
            ) : (
              <XCircle size={20} className="text-red-500" />
            )}
          </div>
        )}
      </div>
      {showValidation && errorMessage && (
        <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
      )}
      {showValidation && isValid && (
        <p className="text-xs text-green-500 mt-1">✓ RIB valide</p>
      )}
      <p className="text-xs opacity-70 mt-1">
        Format: 001-006 ou 008-015 | 00001-00700 | 12 chiffres libres
      </p>
    </div>
  );
};
