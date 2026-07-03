import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../../components/BrandLogo';
import HeroIcon from '../../components/HeroIcon';
import api from '../../utils/api';
import './auth.css';

const SECURITY_QUESTIONS = [
  'Nama hewan peliharaan pertama kamu?',
  'Nama sekolah dasar kamu?',
  'Nama kota kelahiran ibu kamu?',
  'Nama panggilan masa kecil kamu?',
  'Makanan favorit kamu waktu kecil?'
];

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({
    nama: '', email: '', password: '', kota: 'Medan',
    security_question: SECURITY_QUESTIONS[0], security_answer: ''
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [signupToken, setSignupToken] = useState('');

  useEffect(() => {
    if (location.state?.email && location.state?.step) {
      setForm(prev => ({ ...prev, email: location.state.email }));
      setStep(location.state.step);
      setResendCountdown(60);
      setSuccess('Silakan masukkan kode verifikasi OTP yang telah dikirim ke email Anda.');
    }
  }, [location.state]);

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
              navigate('/dashboard');
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
            text: 'signup_with',
            shape: 'rectangular'
          });
        }
      }
    };
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const password = form.password;
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasDot = /\./.test(password);

  useEffect(() => {
    let interval = null;
    if (resendCountdown > 0) {
      interval = setInterval(() => {
        setResendCountdown(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [resendCountdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasMinLength || !hasUppercase || !hasDot) {
      return setError('Password harus memenuhi semua syarat: minimal 6 karakter, memiliki huruf besar, dan memiliki tanda titik (.).');
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.post('/auth/register', form);
      if (res.data.status === 'OTP_SENT') {
        setSuccess('Kode verifikasi OTP telah dikirim ke email Anda.');
        setSignupToken(res.data.signupToken || '');
        setStep(2);
        setResendCountdown(60);
      } else {
        setSuccess('Registrasi berhasil! Silakan login.');
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal registrasi.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      return setError('Kode OTP harus terdiri dari 6 digit.');
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.post('/auth/verify-otp', { email: form.email, otp, signupToken });
      setSuccess(res.data.message || 'Verifikasi berhasil! Akun Anda siap digunakan.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Kode OTP salah atau kedaluwarsa.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCountdown > 0) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.post('/auth/resend-otp', { email: form.email, signupToken });
      setSuccess('Kode OTP baru telah terkirim.');
      if (res.data.signupToken) {
        setSignupToken(res.data.signupToken);
      }
      setResendCountdown(60);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengirim ulang OTP.');
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
        {step === 1 ? (
          <>
            <h2>Buat Akun Baru</h2>
            <p className="subtitle">Daftar untuk mengakses layanan kota digital</p>

            {error && <div className="error-msg">{error}</div>}
            {success && <div className="success-msg">{success}</div>}

            <div id="google-official-btn" style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}></div>

            <div className="auth-divider" style={{ marginBottom: 20 }}>atau daftar dengan email</div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input name="nama" placeholder="Masukkan nama lengkap"
                  value={form.nama} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" placeholder="email@example.com"
                  value={form.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="password-wrapper">
                  <input name="password" type={showPass ? 'text' : 'password'}
                    placeholder="Minimal 6 karakter"
                    value={form.password} onChange={handleChange} required />
                  <button type="button" className="password-toggle"
                    onClick={() => setShowPass(!showPass)}>
                    <HeroIcon name={showPass ? 'eyeSlash' : 'eye'} />
                  </button>
                </div>
                {form.password && (
                  <div className="password-requirements">
                    <div className={`requirement-item ${hasMinLength ? 'valid' : ''}`}>
                      <HeroIcon name={hasMinLength ? 'check' : 'xCircle'} className="req-icon" />
                      <span>Minimal 6 karakter</span>
                    </div>
                    <div className={`requirement-item ${hasUppercase ? 'valid' : ''}`}>
                      <HeroIcon name={hasUppercase ? 'check' : 'xCircle'} className="req-icon" />
                      <span>Setidaknya 1 huruf besar</span>
                    </div>
                    <div className={`requirement-item ${hasDot ? 'valid' : ''}`}>
                      <HeroIcon name={hasDot ? 'check' : 'xCircle'} className="req-icon" />
                      <span>Setidaknya 1 tanda titik (.)</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Kota</label>
                <input name="kota" placeholder="Kota tempat tinggal"
                  value={form.kota} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Pertanyaan Keamanan</label>
                <select name="security_question" value={form.security_question}
                  onChange={handleChange}>
                  {SECURITY_QUESTIONS.map(q => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Jawaban Keamanan</label>
                <input name="security_answer" placeholder="Jawaban kamu"
                  value={form.security_answer} onChange={handleChange} required />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
              </button>
            </form>

            <div className="auth-footer">
              Sudah punya akun? <Link to="/login">Login di sini</Link>
            </div>
          </>
        ) : (
          <>
            <h2>Verifikasi Email Anda</h2>
            <p className="subtitle" style={{ marginBottom: 20 }}>
              Kami telah mengirimkan 6 digit kode OTP ke alamat email <strong>{form.email}</strong>. Silakan masukkan kode tersebut di bawah ini.
            </p>

            {error && <div className="error-msg">{error}</div>}
            {success && <div className="success-msg">{success}</div>}

            <form onSubmit={handleVerifyOtp}>
              <div className="form-group">
                <label style={{ textAlign: 'center', display: 'block', marginBottom: 12 }}>Kode Verifikasi OTP</label>
                <input
                  name="otp"
                  type="text"
                  maxLength="6"
                  placeholder="------"
                  value={otp}
                  onChange={e => { setOtp(e.target.value.replace(/\D/g, '')); setError(''); }}
                  style={{
                    letterSpacing: '8px',
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#043CB1',
                    background: '#f8faff',
                    border: '2px solid #e4e8f1',
                    borderRadius: 'var(--radius-control)',
                    padding: '12px 14px'
                  }}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: 10 }}>
                {loading ? 'Memverifikasi...' : 'Verifikasi Akun'}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleResendOtp}
                disabled={loading || resendCountdown > 0}
                style={{
                  width: '100%',
                  marginTop: 10,
                  background: 'transparent',
                  border: '1.5px solid #043CB1',
                  color: '#043CB1',
                  fontWeight: '700'
                }}
              >
                {resendCountdown > 0 ? `Kirim Ulang OTP (${resendCountdown}s)` : 'Kirim Ulang OTP'}
              </button>
            </form>

            <div className="auth-footer" style={{ marginTop: 24, textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => { setStep(1); setError(''); setSuccess(''); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#7b8190',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Kembali ke Pendaftaran / Ubah Email
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
