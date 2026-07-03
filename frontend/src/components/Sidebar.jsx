import { Link, NavLink, useLocation } from 'react-router-dom';
import { useRef, useState, useMemo } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useAuth } from '../context/AuthContext';
import BrandLogo from './BrandLogo';
import HeroIcon from './HeroIcon';
import { cn } from '../lib/utils';
import './Sidebar.css';

const navGroups = [
  {
    label: 'Beranda',
    icon: 'home',
    items: [{ to: '/', icon: 'home', label: 'Beranda Utama' }],
  },
  {
    label: 'Dashboard',
    icon: 'dashboard',
    items: [{ to: '/dashboard', icon: 'dashboard', label: 'Dashboard Kota' }],
  },
  {
    label: 'Monitoring',
    icon: 'map',
    items: [{ to: '/monitoring', icon: 'map', label: 'Pusat Monitoring' }],
  },
  {
    label: 'Layanan',
    icon: 'government',
    items: [{ to: '/layanan', icon: 'government', label: 'Pusat Layanan' }],
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
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState('');
  const searchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
  const groups = navGroups.filter(group => !group.adminOnly || user?.role === 'admin');

  const SEARCHABLE_PAGES = [
    { to: '/dashboard', label: 'Dashboard Kota', desc: 'Statistik, populasi, dan ringkasan kota', tags: ['dashboard', 'statistik', 'populasi', 'warga', 'ringkasan'] },
    { to: '/peta', label: 'Peta Interaktif', desc: 'Lokasi fasilitas, rumah sakit, sekolah, taman', tags: ['peta', 'gis', 'lokasi', 'fasilitas', 'rs', 'sekolah', 'masjid', 'taman', 'pasar', 'kantor pemerintah'] },
    { to: '/lalu-lintas', label: 'Lalu Lintas & CCTV Persimpangan', desc: 'Pantau CCTV ATCS Dishub live', tags: ['cctv', 'lalu lintas', 'jalan', 'macet', 'atcs', 'dishub', 'live', 'streaming'] },
    { to: '/udara', label: 'Kualitas Udara (AQI)', desc: 'Indeks polusi udara PM2.5 & ISPU', tags: ['udara', 'aqi', 'polusi', 'pm2.5', 'ispu', 'cuaca', 'sehat'] },
    { to: '/air-bersih', label: 'Jaringan Air Bersih', desc: 'Status distribusi air PDAM Tirtanadi', tags: ['air', 'air bersih', 'pdam', 'tirtanadi', 'pasokan', 'pipa'] },
    { to: '/sampah', label: 'Pengelolaan Sampah', desc: 'Jadwal armada truk kebersihan & TPS', tags: ['sampah', 'kebersihan', 'tps', 'bank sampah', 'truk', 'jadwal'] },
    { to: '/energi', label: 'Penerangan Jalan & Energi', desc: 'Statistik konsumsi daya PJU kota', tags: ['energi', 'pju', 'listrik', 'daya', 'penerangan', 'jalan'] },
    { to: '/transportasi', label: 'Rute Transportasi Umum', desc: 'Jalur angkot, koridor BRT Mebidang, tarif', tags: ['transportasi', 'rute', 'bus', 'angkot', 'brt', 'terminal', 'tarif'] },
    { to: '/layanan-kota', label: 'Pengaduan Warga & Forum', desc: 'Buat laporan infrastruktur & vote kebijakan', tags: ['pengaduan', 'laporan', 'masalah', 'voting', 'kebijakan', 'aspirasi', 'forum', 'thread'] },
    { to: '/layanan-publik', label: 'Bursa Kerja & UMKM Lokal', desc: 'Lowongan kerja terverifikasi & produk UMKM', tags: ['kerja', 'lowongan', 'loker', 'umkm', 'produk', 'bursa kerja'] },
    { to: '/profil', label: 'Profil Saya & Pengaturan', desc: 'Ubah biodata dan detail akun', tags: ['profil', 'akun', 'password', 'biodata', 'pengaturan'] },
    { to: '/admin', label: 'Panel Admin', desc: 'Moderasi sistem, log aktivitas, master data', tags: ['admin', 'panel', 'moderasi', 'log', 'master data'], adminOnly: true },
  ];

  const availablePages = SEARCHABLE_PAGES.filter(
    (page) => !page.adminOnly || user?.role === 'admin'
  );

  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return availablePages.filter(page =>
      page.label.toLowerCase().includes(q) ||
      page.desc.toLowerCase().includes(q) ||
      page.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }, [searchQuery, availablePages]);

  const isGroupActive = (group) => group.items.some(item => location.pathname === item.to);
  const closeMobileMenu = () => {
    setMobileOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
  };
  const toggleSearch = () => {
    setSearchOpen(open => {
      const nextOpen = !open;
      if (nextOpen) {
        window.setTimeout(() => {
          const input = mobileOpen ? mobileSearchInputRef.current : searchInputRef.current;
          input?.focus();
        }, 0);
      } else {
        setSearchQuery('');
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
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        onBlur={(event) => {
          if (!event.target.value) {
            window.setTimeout(() => {
              setSearchOpen(false);
              setSearchQuery('');
            }, 200);
          }
        }}
      />
      {searchOpen && searchQuery && (
        <div className="dashboard-search-suggestions">
          {suggestions.length > 0 ? (
            suggestions.map(page => (
              <Link
                key={page.to}
                to={page.to}
                className="dashboard-search-suggestion-item"
                onClick={() => {
                  setSearchQuery('');
                  setSearchOpen(false);
                  closeMobileMenu();
                }}
              >
                <div className="suggestion-item-icon">
                  <HeroIcon name={
                    page.to === '/dashboard' ? 'dashboard' :
                    page.to === '/peta' ? 'map' :
                    page.to === '/lalu-lintas' ? 'road' :
                    page.to === '/udara' ? 'cloud' :
                    page.to === '/air-bersih' ? 'water' :
                    page.to === '/sampah' ? 'trash' :
                    page.to === '/energi' ? 'energy' :
                    page.to === '/transportasi' ? 'truck' :
                    page.to === '/layanan-kota' ? 'government' :
                    page.to === '/layanan-publik' ? 'sparkles' :
                    page.to === '/profil' ? 'profile' : 'admin'
                  } />
                </div>
                <div className="suggestion-item-text">
                  <strong>{page.label}</strong>
                  <small>{page.desc}</small>
                </div>
              </Link>
            ))
          ) : (
            <div className="dashboard-search-no-results">
              Tidak ditemukan hasil untuk "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </label>
  );

  const renderSubNav = () => (
    <nav className="dashboard-uniqlo-subnav" aria-label="Kategori navigasi utama">
      {groups.map((group) => {
        const targetTo = group.items[0]?.to || '#';
        const active = isGroupActive(group);
        return (
          <NavLink
            key={group.label}
            to={targetTo}
            className={`dashboard-uniqlo-sublink ${active ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            {group.label}
          </NavLink>
        );
      })}
    </nav>
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

        <div className="dashboard-uniqlo-header-actions">
          <div className="dashboard-mobile-inline-tools">
            {mobileActions}
          </div>

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
                <div className="dashboard-mobile-header">
                  <BrandLogo compact className="dashboard-mobile-logo" />
                  <Dialog.Title className="dashboard-mobile-title">Menu Portal</Dialog.Title>
                  <Dialog.Close className="dashboard-mobile-close" aria-label="Tutup menu dashboard">
                    <HeroIcon name="xMark" />
                  </Dialog.Close>
                </div>
                <nav className={cn('dashboard-nav-menu mobile-open', searchOpen && 'searching')} aria-label="Navigasi dashboard mobile">
                  {renderSearch(mobileSearchInputRef)}
                  {renderGroups()}
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        <nav className={cn('dashboard-nav-menu dashboard-nav-menu-desktop', searchOpen && 'searching')} aria-label="Navigasi dashboard">
          {renderSearch(searchInputRef)}
          {renderGroups()}
        </nav>
      </div>
      {renderSubNav()}
    </header>
  );
}
