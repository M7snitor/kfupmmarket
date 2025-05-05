// src/pages/ChatsPage.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function ChatsPage() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const API = process.env.REACT_APP_API_URL
  const headers = { headers: { Authorization: `Bearer ${token}` } }

  const [peers, setPeers] = useState([])

  useEffect(() => {
    axios
      .get(`${API}/api/messages/conversations`, headers)
      .then(res => {
        // each item has: { user: { accountId, name }, lastMessage, timestamp }
        setPeers(res.data.conversations || [])
      })
      .catch(() => setPeers([]))
  }, [])

  return (
    <div style={styles.wrapper}>
      {peers.map(p => (
        <div
          key={p.user.accountId}
          style={styles.card}
          onClick={() => navigate(`/chat/${p.user.accountId}`)}
        >
          <div style={styles.name}>{p.user.name}</div>
        </div>
      ))}
    </div>
  )
}

const styles = {
  wrapper: {
    padding: '1rem',
    backgroundColor: 'var(--white)',
    color: 'var(--text-dark)',
    minHeight: '100vh'
  },
  card: {
    padding: '0.75rem 1rem',
    borderBottom: '1px solid var(--gray-border)',
    cursor: 'pointer'
  },
  name: {
    fontWeight: 'bold',
    fontSize: '1rem'
  }
}
