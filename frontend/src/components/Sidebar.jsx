import { Link, NavLink, useLocation } from 'react-router-dom';
import { useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useAuth } from '../context/AuthContext';
import BrandLogo from './BrandLogo';
import HeroIcon from './HeroIcon';
import { cn } from '../lib/utils';
import './Sidebar.css';

const navGroups = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    items: [{ to: '/dashboard', icon: 'dashboard', label: 'Dashboard Kota' }],
  },
  {
    label: 'Monitoring',
    icon: 'map',
    items: [
      { to: '/peta', icon: 'map', label: 'Peta Interaktif' },
      { to: '/udara', icon: 'cloud', label: 'Kualitas Udara' },
      { to: '/lalu-lintas', icon: 'road', label: 'Lalu Lintas' },
      { to: '/transportasi', icon: 'truck', label: 'Transportasi' },
      { to: '/energi', icon: 'energy', label: 'Energi' },
      { to: '/air-bersih', icon: 'water', label: 'Air Bersih' },
      { to: '/sampah', icon: 'trash', label: 'Sampah' },
    ],
  },
  {
    label: 'Layanan',
    icon: 'government',
    items: [
      { to: '/layanan-kota', icon: 'government', label: 'Layanan Kota' },
      { to: '/layanan-publik', icon: 'health', label: 'Layanan Publik' },
    ],
  },
  {
    label: 'Akun',
    icon: 'profile',
    items: [{ to: '/profil', icon: 'profile', label: 'Profil Saya' }],
  },
  {
    label: 'Admin',
    icon: 'admin',
    adminOnly: true,
    items: [{ to: '/admin', icon: 'admin', label: 'Panel Admin' }],
  },
];

export default function Sidebar({ mobileActions = null }) {
  const { user } = useAuth();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState('Monitoring');
  const searchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
  const groups = navGroups.filter(group => !group.adminOnly || user?.role === 'admin');

  const isGroupActive = (group) => group.items.some(item => location.pathname === item.to);
  const closeMobileMenu = () => {
    setMobileOpen(false);
    setSearchOpen(false);
  };
  const toggleSearch = () => {
    setSearchOpen(open => {
      const nextOpen = !open;
      if (nextOpen) {
        window.setTimeout(() => {
          const input = mobileOpen ? mobileSearchInputRef.current : searchInputRef.current;
          input?.focus();
        }, 0);
      }
      return nextOpen;
    });
  };

  const renderSearch = (inputRef = searchInputRef) => (
    <label className={`dashboard-nav-search ${searchOpen ? 'open' : ''}`}>
      <button
        type="button"
        aria-label={searchOpen ? 'Tutup search dashboard' : 'Buka search dashboard'}
        onClick={toggleSearch}
      >
        <HeroIcon name="search" />
      </button>
      <input
        ref={inputRef}
        type="search"
        placeholder="Search dashboard"
        aria-label="Search dashboard"
        onBlur={(event) => {
          if (!event.target.value) setSearchOpen(false);
        }}
      />
    </label>
  );

  const renderGroups = () => groups.map(group => (
    <div className={`dashboard-nav-group ${isGroupActive(group) ? 'active' : ''} ${openGroup === group.label ? 'open' : ''}`} key={group.label}>
      {group.items.length === 1 ? (
        <NavLink
          to={group.items[0].to}
          className={({ isActive }) => `dashboard-nav-trigger ${isActive ? 'active' : ''}`}
          onClick={closeMobileMenu}
        >
          <HeroIcon name={group.icon} />
          <span>{group.label}</span>
        </NavLink>
      ) : (
        <>
          <button
            className="dashboard-nav-trigger"
            type="button"
            aria-expanded={openGroup === group.label}
            onClick={() => setOpenGroup(openGroup === group.label ? '' : group.label)}
          >
            <HeroIcon name={group.icon} />
            <span>{group.label}</span>
            <HeroIcon name="chevronDown" className="dashboard-nav-caret" />
          </button>
          <div className="dashboard-nav-dropdown">
            {group.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="dashboard-nav-item-icon"><HeroIcon name={item.icon} /></span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </>
      )}
    </div>
  ));

  return (
    <header className="dashboard-nav">
      <div className="dashboard-nav-inner">
        <Link className="dashboard-nav-brand" to="/dashboard" aria-label="Dashboard Smart City">
          <BrandLogo compact className="dashboard-nav-logo" />
        </Link>

        <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
          <Dialog.Trigger asChild>
            <button
              className="dashboard-nav-toggle"
              type="button"
              aria-label={mobileOpen ? 'Tutup menu dashboard' : 'Buka menu dashboard'}
            >
              <HeroIcon name={mobileOpen ? 'xMark' : 'bars'} />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="dashboard-mobile-overlay" />
            <Dialog.Content className="dashboard-mobile-sheet">
              <Dialog.Title className="dashboard-mobile-title">Menu Dashboard</Dialog.Title>
              <Dialog.Close className="dashboard-mobile-close" aria-label="Tutup menu dashboard">
                <HeroIcon name="xMark" />
              </Dialog.Close>
              <nav className={cn('dashboard-nav-menu mobile-open', searchOpen && 'searching')} aria-label="Navigasi dashboard mobile">
                {renderSearch(mobileSearchInputRef)}
                {renderGroups()}
                {mobileActions && (
                  <div className="dashboard-mobile-actions">
                    {mobileActions}
                  </div>
                )}
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <nav className={cn('dashboard-nav-menu dashboard-nav-menu-desktop', searchOpen && 'searching')} aria-label="Navigasi dashboard">
          {renderSearch(searchInputRef)}
          {renderGroups()}
        </nav>
      </div>
    </header>
  );
}
