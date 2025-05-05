// src/pages/ChatPage.jsx

import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function ChatPage() {
  const { token, user } = useAuth()
  const { withUserId } = useParams()
  const navigate = useNavigate()
  const API = process.env.REACT_APP_API_URL
  const headers = { headers: { Authorization: `Bearer ${token}` } }

  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (!withUserId) {
      navigate(-1)
      return
    }
    axios
      .get(`${API}/api/messages/${withUserId}`, headers)
      .then(res => setMessages(res.data.messages))
      .catch(() => navigate(-1))
  }, [withUserId, navigate])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    const content = draft.trim()
    if (!content) return
    try {
      const res = await axios.post(
        `${API}/api/messages`,
        { to: withUserId, content },
        headers
      )
      setMessages(prev => [...prev, res.data.data])
      setDraft('')
    } catch {
      alert('Failed to send message')
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back</button>
        <div style={styles.headerText}>Chat</div>
      </div>

      <div style={styles.chatBox}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={m.from === user.id ? styles.youBubble : styles.sellerBubble}
          >
            {m.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputRow}>
        <input
          type="text"
          placeholder="Type a message..."
          value={draft}
          onChange={e => setDraft(e.target.value)}
          style={styles.input}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.sendBtn}>Send</button>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: 'var(--white)',
    color: 'var(--text-dark)'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    borderBottom: '1px solid var(--gray-border)',
    backgroundColor: 'var(--white)',
    position: 'sticky',
    top: 0,
    zIndex: 10
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--primary-green)',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginRight: 10,
    cursor: 'pointer'
  },
  headerText: {
    fontSize: '1.1rem',
    fontWeight: 600
  },
  chatBox: {
    flex: 1,
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    overflowY: 'auto'
  },
  sellerBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#d8c555',
    color: 'white',
    padding: '0.5rem 0.8rem',
    borderRadius: 12,
    maxWidth: '75%'
  },
  youBubble: {
    alignSelf: 'flex-end',
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    padding: '0.5rem 0.8rem',
    borderRadius: 12,
    maxWidth: '75%'
  },
  inputRow: {
    display: 'flex',
    padding: '0.75rem 1rem',
    borderTop: '1px solid var(--gray-border)',
    backgroundColor: 'var(--white)',
    position: 'sticky',
    bottom: 0
  },
  input: {
    flex: 1,
    borderRadius: 20,
    border: '1px solid var(--gray-border)',
    padding: '0.5rem 0.75rem',
    fontSize: '0.9rem',
    marginRight: 8
  },
  sendBtn: {
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: 20,
    cursor: 'pointer'
  }
}
