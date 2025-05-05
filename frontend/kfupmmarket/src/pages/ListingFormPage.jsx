import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { ReactComponent as AddIcon } from '../assets/icons/add.svg'
import logo from '../assets/LogoNameAlpha.png'

const categories = ['Electronics','Furniture','Books','Art','Sports']
const modes      = ['Sale','Auction','Both']

export default function ListingFormPage() {
  const { token } = useAuth()
  const navigate  = useNavigate()
  const { state } = useLocation()
  const editItem  = state?.editItem

  const fileRef   = useRef()
  const [active, setActive]       = useState(0)
  const [files, setFiles]         = useState([null,null,null])
  const [previews, setPreviews]   = useState(['','',''])
  const [cats, setCats]           = useState([])
  const [mode, setMode]           = useState('')
  const [form, setForm] = useState({
    name:'', description:'',
    width:'', length:'', height:'', weight:'',
    price:'', quantity:'1', bid:'', duration:''
  })

  useEffect(() => {
    if (!editItem) return
    setForm({
      name:        editItem.name        || '',
      description: editItem.description || '',
      width:       editItem.width?.toString()   || '',
      length:      editItem.length?.toString()  || '',
      height:      editItem.height?.toString()  || '',
      weight:      editItem.weight?.toString()  || '',
      price:       editItem.price?.toString()   || '',
      quantity:    editItem.quantity?.toString()|| '1',
      bid:         editItem.startingBid?.toString() || '',
      duration:    editItem.auctionEndDate
                    ? Math.ceil((new Date(editItem.auctionEndDate)-Date.now())/(1000*60*60*24)).toString()
                    : ''
    })
    setCats(editItem.categories||[])
    setMode(editItem.type||'')
    // prefill previews with existing URLs
    setPreviews([
      editItem.images[0]||'',
      editItem.images[1]||'',
      editItem.images[2]||''
    ])
    setFiles([null,null,null])
  }, [editItem])

  const pickCat = c => {
    setCats(prev =>
      prev.includes(c)
        ? prev.filter(x=>x!==c)
        : prev.length<2
          ? [...prev,c]
          : prev
    )
  }

  const chooseMode = m => {
    const upd = {...form}
    if (m==='Sale')    { upd.bid=''; upd.duration='' }
    if (m==='Auction') { upd.price=''; upd.quantity='1' }
    setForm(upd)
    setMode(m)
  }

  const change = (f,v) => {
    const ints = ['price','quantity','bid','duration','width','length','height']
    const decs = ['weight']
    let vv = v
    if (ints.includes(f)) vv = vv.replace(/[^0-9]/g,'')
    if (decs.includes(f)) vv = vv.replace(/[^0-9.]/g,'')
    setForm(x=>({...x,[f]:vv}))
  }

  const pickSlot = i => {
    setActive(i)
    fileRef.current.click()
  }

  const handleFile = e => {
    const file = e.target.files[0]
    if (!file) return
    const nf = [...files]; nf[active]=file; setFiles(nf)
    const reader = new FileReader()
    reader.onload = () => {
      const pr = [...previews]; pr[active]=reader.result; setPreviews(pr)
    }
    reader.readAsDataURL(file)
    e.target.value=''
  }

  const submit = async () => {
    if (!form.name.trim())        return alert('Name is required')
    if (!form.description.trim()) return alert('Description is required')
    if (previews.filter(p=>p).length<1) return alert('At least one image')
    if (cats.length<1)            return alert('Pick at least one category')
    if (!mode)                    return alert('Select a selling method')
    if ((mode==='Sale'||mode==='Both')  && !form.price)
      return alert('Price required for sale')
    let bd = form.bid, dr = form.duration
    if ((mode==='Auction'||mode==='Both')) {
      if (!bd) bd='0'
      if (!dr) dr='7'
    }

    const fd = new FormData()
    fd.append('name',        form.name)
    fd.append('description', form.description)
    fd.append('width',       form.width)
    fd.append('length',      form.length)
    fd.append('height',      form.height)
    fd.append('weight',      form.weight)
    fd.append('quantity',    form.quantity||'1')
    fd.append('type',        mode)
    fd.append('categories',  cats.join(','))
    fd.append('price',       form.price)
    fd.append('startingBid', bd)
    fd.append('duration',    dr)             // ← send days here
    files.forEach(f=> f instanceof File && fd.append('images', f))

    try {
      const cfg = {
        headers:{
          Authorization:`Bearer ${token}`,
          'Content-Type':'multipart/form-data'
        }
      }
      const API = process.env.REACT_APP_API_URL
      if (editItem) {
        await axios.put(`${API}/api/items/${editItem._id}`, fd, cfg)
      } else {
        await axios.post(`${API}/api/items/post-item`, fd, cfg)
      }
      navigate('/account')
    } catch {
      alert('Submission failed')
    }
  }

  return (
    <div style={styles.wrapper}>
      <img src={logo} alt="" style={styles.logo}/>
      <h3 style={styles.header}>{editItem?'Edit Listing':'New Listing'}</h3>

      <div style={styles.imgGrid}>
        {[0,1,2].map(i=>(
          <div key={i}
               style={styles.imgSlot}
               onClick={()=>pickSlot(i)}>
            {previews[i]
              ? <img src={previews[i]} alt="" style={styles.preview}/>
              : <span style={styles.plus}>＋</span>
            }
          </div>
        ))}
        <input type="file" accept="image/*"
               ref={fileRef}
               onChange={handleFile}
               style={{display:'none'}}/>
      </div>

      <input style={styles.input}
             placeholder="Name…"
             value={form.name}
             onChange={e=>change('name',e.target.value)} />

      <textarea style={styles.textarea}
                placeholder="Description…"
                value={form.description}
                onChange={e=>change('description',e.target.value)} />

      <div style={styles.dimRow}>
        {['width','length','height','weight'].map((f,i)=>(
          <input key={f}
                 style={styles.dimInput}
                 type="number"
                 min={f==='weight'?'0.01':'1'}
                 step={f==='weight'?'0.01':'1'}
                 placeholder={['Width','Length','Height','Weight'][i]}
                 value={form[f]}
                 onChange={e=>change(f,e.target.value)}/>
        ))}
      </div>

      <p style={styles.label}>Categories (up to 2):</p>
      <div style={styles.btnRow}>
        {categories.map(c=>(
          <button key={c}
                  onClick={()=>pickCat(c)}
                  style={{
                    ...styles.toggle,
                    backgroundColor: cats.includes(c)
                      ? 'var(--primary-green)' : 'var(--white)',
                    color: cats.includes(c)
                      ? 'var(--white)'       : 'var(--text-dark)'
                  }}>
            {c}
          </button>
        ))}
      </div>

      <p style={styles.label}>Selling Method:</p>
      <div style={styles.btnRow}>
        {modes.map(m=>(
          <button key={m}
                  onClick={()=>chooseMode(m)}
                  style={{
                    ...styles.toggle,
                    backgroundColor: mode===m
                      ? 'var(--primary-green)' : 'var(--white)',
                    color: mode===m
                      ? 'var(--white)'         : 'var(--text-dark)'
                  }}>
            {m}
          </button>
        ))}
      </div>

      <div style={styles.sellRow}>
        {(mode==='Sale'||mode==='Both') && (
          <>
            <input style={styles.sellInput}
                   placeholder="Price"
                   value={form.price}
                   onChange={e=>change('price',e.target.value)}/>
            <input style={styles.sellInput}
                   placeholder="Quantity"
                   value={form.quantity}
                   onChange={e=>change('quantity',e.target.value)}/>
          </>
        )}
        {(mode==='Auction'||mode==='Both') && (
          <>
            <input style={styles.sellInput}
                   placeholder="Starting Bid"
                   value={form.bid}
                   onChange={e=>change('bid',e.target.value)}/>
            <input style={styles.sellInput}
                   placeholder="Duration (days)"
                   value={form.duration}
                   onChange={e=>change('duration',e.target.value)}/>
          </>
        )}
      </div>

      <button onClick={submit} style={styles.submit}>
        <AddIcon style={{width:18,height:18,fill:'white',marginRight:6}}/>
        {editItem?'Update':'Post'} Listing
      </button>
    </div>
  )
}

const styles = {
  wrapper:   { backgroundColor:'var(--white)', padding:'1rem', minHeight:'100vh' },
  logo:      { width:240, margin:'0 auto', display:'block' },
  header:    { textAlign:'center', color:'var(--text-dark)' },
  imgGrid:   { display:'flex', gap:8, justifyContent:'center', margin:'1rem 0' },
  imgSlot:   {
    width:80, height:80,
    border:'2px dashed var(--gray-border)',
    borderRadius:8,
    display:'flex', alignItems:'center', justifyContent:'center',
    cursor:'pointer', overflow:'hidden'
  },
  preview:   { width:'100%', height:'100%', objectFit:'cover' },
  plus:      { fontSize:24, color:'var(--text-light)' },
  input:     { width:'100%', padding:'.6rem', margin:'.5rem 0', border:'1px solid var(--gray-border)', borderRadius:8 },
  textarea:  { width:'100%', padding:'.6rem', margin:'.5rem 0', border:'1px solid var(--gray-border)', borderRadius:8, minHeight:80, resize:'vertical' },
  dimRow:    { display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8, margin:'.5rem 0' },
  dimInput:  { padding:'.6rem', border:'1px solid var(--gray-border)', borderRadius:8 },
  label:     { color:'var(--text-light)', margin:'1rem 0 .5rem' },
  btnRow:    { display:'flex', gap:8, flexWrap:'wrap' },
  toggle:    { padding:'.5rem 1rem', border:'1px solid var(--gray-border)', borderRadius:20, fontSize:'.85rem', cursor:'pointer' },
  sellRow:   { display:'flex', gap:8, flexWrap:'wrap', margin:'1rem 0' },
  sellInput: { flex:'1 1 120px', padding:'.6rem', border:'1px solid var(--gray-border)', borderRadius:8 },
  submit:    {
    width:'100%', padding:'.75rem',
    background:'var(--primary-green)', color:'white',
    border:'none', borderRadius:8,
    display:'flex', justifyContent:'center', alignItems:'center',
    marginTop:12, cursor:'pointer'
  }
}
