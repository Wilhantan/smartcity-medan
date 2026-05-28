import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import './Layout.css';

export default function Layout({ children, title, subtitle }) {
  const { user } = useAuth();

  return (
    <div className="layout">
      <Sidebar />
      <main className="layout-main">
        {(title || subtitle) && (
          <div className="layout-header">
            <div className="layout-heading">
              {title && <h1 className="layout-title">{title}</h1>}
              {subtitle && <p className="layout-subtitle">{subtitle}</p>}
            </div>
            <div className="layout-tools" aria-label="Dashboard tools">
              <label className="layout-search">
                <span>⌕</span>
                <input type="search" placeholder="Search" aria-label="Search dashboard" />
              </label>
              <button className="layout-notification" type="button" aria-label="Notifikasi">
                <span>•</span>
              </button>
              <Link to="/profil" className="layout-profile" aria-label="Profil pengguna">
                <span className="layout-avatar">{user?.nama?.[0]?.toUpperCase() || 'U'}</span>
                <span className="layout-user">
                  <strong>{user?.nama || 'Pengguna'}</strong>
                  <small>{user?.role || 'warga'}</small>
                </span>
              </Link>
              <Link to="/" className="layout-home-link">
                Home
              </Link>
            </div>
          </div>
        )}
        <div className="layout-content">{children}</div>
      </main>
    </div>
  );
}
