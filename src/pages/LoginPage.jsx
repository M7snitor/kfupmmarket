import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/LogoNameAlphaWhite.png';

function LoginPage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState({
    green: '#00813e',
    lightGreen: '#b6e5ce',
  });

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
          <button style={{ ...styles.tabButton, backgroundColor: theme.green, color: '#fff' }}>
            Log In
          </button>
          <button style={{ ...styles.tabButton, backgroundColor: theme.lightGreen, color: '#fff' }}>
            Sign Up
          </button>
        </div>

        <input type="email" placeholder="Email" style={styles.input} />
        <input type="password" placeholder="Password" style={styles.input} />

        <div style={styles.rememberRow}>
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#" style={{ ...styles.forgot, color: theme.green }}>Forgot Password?</a>
        </div>

        <button style={{ ...styles.loginButton, backgroundColor: theme.green }}>
          Log In
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
