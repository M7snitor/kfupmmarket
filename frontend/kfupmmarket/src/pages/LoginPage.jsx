import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/LogoNameAlphaWhite.png';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [theme, setTheme] = useState({ green: '#00813e', lightGreen: '#b6e5ce' });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    studentId: '',
    phone: '',
    onCampus: false,
    buildingNumber: '',
    roomNumber: ''
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async () => {
    try {
      const url = isLogin
        ? `${process.env.REACT_APP_API_URL}/api/auth/login`
        : `${process.env.REACT_APP_API_URL}/api/auth/register`;
      const response = await axios.post(url, formData);
      const { user, token } = response.data;
      login(user, token);
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setTheme({
      green: rootStyles.getPropertyValue('--primary-green') || '#00813e',
      lightGreen: rootStyles.getPropertyValue('--light-green') || '#b6e5ce',
    });
  }, []);

  return (
    <div style={{ ...styles.container, backgroundColor: theme.green }}>
      <img src={logo} alt="KFUPM Market" style={styles.logo} />
      <div style={styles.card}>
        <div style={styles.buttonRow}>
          <button
            style={{ ...styles.tabButton, backgroundColor: isLogin ? theme.green : theme.lightGreen }}
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
          <button
            style={{ ...styles.tabButton, backgroundColor: !isLogin ? theme.green : theme.lightGreen }}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" style={styles.input} />
        <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" style={styles.input} />

        {!isLogin && (
          <>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" style={styles.input} />
            <input name="studentId" value={formData.studentId} onChange={handleChange} placeholder="Student ID" style={styles.input} />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" style={styles.input} />
            <label style={{ fontSize: '0.9rem', marginBottom: 8, textAlign: 'left' }}>
              <input type="checkbox" name="onCampus" checked={formData.onCampus} onChange={handleChange} /> Living on campus
            </label>
            {formData.onCampus && (
              <>
                <input name="buildingNumber" value={formData.buildingNumber} onChange={handleChange} placeholder="Building Number" style={styles.input} />
                <input name="roomNumber" value={formData.roomNumber} onChange={handleChange} placeholder="Room Number" style={styles.input} />
              </>
            )}
          </>
        )}

        {isLogin && (
          <div style={styles.rememberRow}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" style={{ ...styles.forgot, color: theme.green }}>Forgot Password?</a>
          </div>
        )}

        <button onClick={handleSubmit} style={{ ...styles.loginButton, backgroundColor: theme.green }}>
          {isLogin ? 'Log In' : 'Register'}
        </button>

        <p style={styles.skip} onClick={() => navigate('/home')}>Skip For Now</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '2rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    marginBottom: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 400,
    borderRadius: 30,
    padding: 30,
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    padding: '0.75rem',
    borderRadius: 25,
    border: 'none',
    fontWeight: 'bold',
    margin: '0 5px',
    cursor: 'pointer',
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: 15,
    borderRadius: 10,
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  rememberRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    marginBottom: 15,
  },
  forgot: {
    textDecoration: 'none',
  },
  loginButton: {
    width: '100%',
    padding: '0.75rem',
    color: 'white',
    border: 'none',
    borderRadius: 10,
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  skip: {
    marginTop: 15,
    color: '#555',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
};

export default LoginPage;
