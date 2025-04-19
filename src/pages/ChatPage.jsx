import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function ChatPage() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const messages = [
    { from: 'seller', text: 'Hello, how can I help you?' },
    { from: 'you', text: 'Is the item still available?' },
    { from: 'seller', text: 'Yes, it is.' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back</button>
        <div style={styles.headerText}>Chat with Seller</div>
      </div>

      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={msg.from === 'you' ? styles.youBubble : styles.sellerBubble}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputRow}>
        <input type="text" placeholder="Type a message..." style={styles.input} />
        <button style={styles.sendBtn}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: 'var(--white)',
    color: 'var(--text-dark)',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    borderBottom: '1px solid var(--gray-border)',
    backgroundColor: 'var(--white)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  backBtn: {
    fontSize: '1rem',
    marginRight: 10,
    background: 'none',
    border: 'none',
    color: 'var(--primary-green)',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  headerText: {
    fontWeight: 600,
    fontSize: '1.1rem',
  },
  chatBox: {
    flex: 1,
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    overflowY: 'auto',
  },
  sellerBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#d8c555',
    color: 'white',
    padding: '0.5rem 0.8rem',
    borderRadius: 12,
    maxWidth: '75%',
  },
  youBubble: {
    alignSelf: 'flex-end',
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    padding: '0.5rem 0.8rem',
    borderRadius: 12,
    maxWidth: '75%',
  },
  inputRow: {
    position: 'fixed',
    bottom: '3rem', 
    left: 0,
    right: 0,
    padding: '0.75rem 1rem',
    backgroundColor: 'var(--white)',
    borderTop: '1px solid var(--gray-border)',
    display: 'flex',
    zIndex: 99,
  },
  input: {
    flex: 1,
    padding: '0.5rem 0.75rem',
    borderRadius: 20,
    border: '1px solid var(--gray-border)',
    fontSize: '0.9rem',
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: 'var(--primary-green)',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: 20,
    cursor: 'pointer',
  },
};

export default ChatPage;
