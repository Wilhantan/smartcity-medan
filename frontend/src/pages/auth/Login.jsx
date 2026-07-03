import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../../components/BrandLogo';
import HeroIcon from '../../components/HeroIcon';
import api from '../../utils/api';
import './auth.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '1013401569429-demo.apps.googleusercontent.com',
          callback: async (response) => {
            setLoading(true);
            try {
              const res = await api.post('/auth/google', { credential: response.credential });
              login(res.data.user, res.data.token);
              navigate('/profil?edit=1');
            } catch (err) {
              setError(err.response?.data?.message || 'Gagal terhubung ke server (Port backend/frontend tidak cocok atau server mati).');
            } finally {
              setLoading(false);
            }
          }
        });

        const btnContainer = document.getElementById('google-official-btn');
        if (btnContainer) {
          window.google.accounts.id.renderButton(btnContainer, {
            theme: 'outline',
            size: 'large',
            width: 340,
            text: 'signin_with',
            shape: 'pill'
          });
        }
      }
    };
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.user, res.data.token);
      navigate(res.data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      if (err.response?.data?.message === 'UNVERIFIED') {
        navigate('/register', { state: { email: err.response.data.email, step: 2 } });
      } else {
        setError(err.response?.data?.message || 'Gagal login.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/guest');
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal masuk sebagai guest.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <BrandLogo className="auth-brand-logo" variant="white" />
          <p>Portal Digital Warga Kota Medan</p>
        </div>
      </div>

      <div className="auth-right">
        <h2>Selamat Datang</h2>
        <p className="subtitle">Masuk ke akun kamu untuk melanjutkan</p>

        {error && <div className="error-msg">{error}</div>}

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, width: '100%' }}>
          <div id="google-official-btn"></div>
        </div>

        <div className="auth-divider" style={{ marginBottom: 20 }}>atau login dengan email</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="email@example.com"
              value={form.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input name="password" type={showPass ? 'text' : 'password'}
                placeholder="Masukkan password"
                value={form.password} onChange={handleChange} required />
              <button type="button" className="password-toggle"
                onClick={() => setShowPass(!showPass)}>
                <HeroIcon name={showPass ? 'eyeSlash' : 'eye'} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-mid)', cursor: 'pointer' }}>
              <input type="checkbox" name="remember"
                checked={form.remember} onChange={handleChange} />
              Ingat saya
            </label>
            <Link to="/forgot-password" style={{ fontSize: 14 }}>Lupa password?</Link>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Masuk...' : 'Login'}
          </button>
        </form>

        <div className="auth-divider">atau</div>

        <button type="button" className="btn btn-guest" disabled={loading} onClick={handleGuestLogin}>
          Masuk sebagai Guest
        </button>

        <div className="auth-footer">
          Belum punya akun? <Link to="/register">Daftar sekarang</Link>
        </div>
      </div>
    </div>
  );
}
