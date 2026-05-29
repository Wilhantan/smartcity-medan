import { useState } from 'react';
import './BrandLogo.css';

export default function BrandLogo({ className = '', compact = false, variant = 'blue' }) {
  const [failed, setFailed] = useState(false);
  const logoSrc = variant === 'white' ? '/logo-putih.png' : '/logo-biru.png';

  if (failed) {
    return (
      <span className={`brand-logo brand-logo-fallback ${variant} ${compact ? 'compact' : ''} ${className}`}>
        Medan Smart City
      </span>
    );
  }

  return (
    <img
      className={`brand-logo ${variant} ${compact ? 'compact' : ''} ${className}`}
      src={logoSrc}
      alt="Medan Smart City"
      onError={() => setFailed(true)}
    />
  );
}
