// Digital Income Mastery — Multi-page React app + Static HTML export
// Project layout and files are embedded below. Drop these into a Vite + React + Tailwind project.
// Whop product URL: https://whop.com/digital-income-mastery-ai-a/digital-income-mastery-ai-a-07/
// Pricing: original $100 / month, monthly discount 12% -> discounted price $88 / month

/*
FILE: package.json (snippet)
{
  "name": "digital-income-mastery",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.1"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0"
  }
}
*/

// FILE: src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css' // Tailwind entry

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// FILE: src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Curriculum from './pages/Curriculum'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Nav from './components/Nav'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

// FILE: src/components/Nav.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Nav(){
  const navigate = useNavigate()
  const isAuthed = Boolean(localStorage.getItem('dim_token'))
  const logout = () => { localStorage.removeItem('dim_token'); navigate('/') }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-bold">DIM</div>
          <Link to="/" className="font-bold">Digital Income Mastery</Link>
        </div>
        <nav className="flex gap-4 items-center">
          <Link to="/curriculum" className="text-sm">Curriculum</Link>
          <Link to="/pricing" className="text-sm">Pricing</Link>
          {isAuthed ? (
            <>
              <Link to="/dashboard" className="text-sm">Dashboard</Link>
              <button onClick={logout} className="text-sm text-red-600">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-sm">Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}

// FILE: src/components/ProtectedRoute.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }){
  const token = localStorage.getItem('dim_token')
  if(!token) return <Navigate to="/login" replace />
  return children
}

// FILE: src/pages/Home.jsx
import React from 'react'

const WHOP_PRODUCT_URL = 'https://whop.com/digital-income-mastery-ai-a/digital-income-mastery-ai-a-07/'

export default function Home(){
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-extrabold">Digital Income Mastery</h1>
          <p className="mt-4 text-gray-700 text-lg">Master AI & Automation to build recurring income streams.</p>
          <div className="mt-6 flex gap-3">
            <a href={WHOP_PRODUCT_URL} target="_blank" rel="noreferrer" className="bg-indigo-600 text-white px-5 py-3 rounded-lg">Buy on Whop</a>
            <a href="/curriculum" className="px-5 py-3 border rounded-lg">See curriculum</a>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="text-sm text-gray-500">What you'll get</div>
          <ul className="mt-3 list-disc list-inside text-sm text-gray-700">
            <li>All modules & templates</li>
            <li>Automation blueprints</li>
            <li>Private community</li>
          </ul>
        </div>
      </section>
    </main>
  )
}

// FILE: src/pages/Curriculum.jsx
import React from 'react'

const lessons = [
  'AI Mindset & Foundation',
  'AI Content Creation System',
  'AI Marketing & Sales Automation',
  'AI Business Operations',
  'Advanced AI Income Streams',
  'AI Monetization',
  'E-commerce'
]

export default function Curriculum(){
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold">Curriculum</h2>
      <ol className="mt-4 space-y-3">
        {lessons.map((l, i) => (
          <li key={l} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="font-medium">{String(i+1).padStart(2,'0')}. {l}</div>
            <div className="text-sm text-gray-500 mt-1">Actionable lessons, templates & prompts.</div>
          </li>
        ))}
      </ol>
    </main>
  )
}

// FILE: src/pages/Pricing.jsx
import React from 'react'

const ORIGINAL = 100
const DISCOUNT_PERCENT = 12
const DISCOUNTED = (ORIGINAL * (1 - DISCOUNT_PERCENT / 100)).toFixed(2) // $88.00
const WHOP_PRODUCT_URL = 'https://whop.com/digital-income-mastery-ai-a/digital-income-mastery-ai-a-07/'

export default function Pricing(){
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold">Pricing</h2>
      <div className="mt-4 bg-white p-6 rounded-lg shadow-sm">
        <div className="text-sm text-gray-500">Monthly subscription</div>
        <div className="mt-2 text-3xl font-extrabold">${DISCOUNTED} <span className="text-base font-medium text-gray-500">/ month</span></div>
        <div className="text-sm text-gray-500 mt-1">Original: ${ORIGINAL} / month — {DISCOUNT_PERCENT}% off</div>
        <a href={WHOP_PRODUCT_URL} target="_blank" rel="noreferrer" className="mt-6 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg">Buy on Whop</a>
      </div>
    </main>
  )
}

// FILE: src/pages/Login.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const nav = useNavigate()

  const handle = (e) => {
    e.preventDefault()
    // Fake auth: in production, validate via your backend/Whop access tokens
    if(!email) return alert('Enter email')
    localStorage.setItem('dim_token', btoa(email + '|' + Date.now()))
    localStorage.setItem('dim_user_email', email)
    nav('/dashboard')
  }

  return (
    <main className="max-w-md mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold">Student login</h2>
      <form onSubmit={handle} className="mt-4 bg-white p-6 rounded-lg shadow-sm space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border rounded-md px-3 py-2" />
        <input value={pwd} onChange={e=>setPwd(e.target.value)} type="password" placeholder="Password (not used in demo)" className="w-full border rounded-md px-3 py-2" />
        <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md">Login</button>
      </form>
    </main>
  )
}

// FILE: src/pages/Dashboard.jsx
import React from 'react'

const lessons = [
  { id: 'm1', title: 'AI Mindset & Foundation', content: 'Video lessons and workbook.' },
  { id: 'm2', title: 'AI Content Creation System', content: 'Prompts, templates & workflows.' },
  { id: 'm3', title: 'AI Marketing & Sales Automation', content: 'Funnels & automations.' },
  { id: 'm4', title: 'AI Business Operations', content: 'SOPs & team automation.' },
  { id: 'm5', title: 'Advanced AI Income Streams', content: 'Scaling ideas & offers.' },
  { id: 'm6', title: 'AI Monetization', content: 'Monetization frameworks.' },
  { id: 'm7', title: 'E-commerce', content: 'Ecom playbooks & templates.' }
]

export default function Dashboard(){
  const email = localStorage.getItem('dim_user_email') || 'student@example.com'
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Welcome back</div>
            <div className="font-bold">{email}</div>
          </div>
          <div className="text-sm text-gray-500">Member since: Demo</div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.map(l => (
            <div key={l.id} className="p-4 border rounded-lg">
              <div className="font-medium">{l.title}</div>
              <div className="text-sm text-gray-600 mt-1">{l.content}</div>
              <div className="mt-3">
                <a href="#" className="text-indigo-600 text-sm">Open lesson</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

// FILE: src/index.css (Tailwind minimal entry)
/* Replace with your Tailwind config */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Basic body style for demo */
body { background-color: #f8fafc }

/*
STATIC EXPORT: public/static-index.html
A simple static HTML version of the landing + pricing + curriculum (no React required).
Save as public/static-index.html and open in browser.
*/

/*
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Digital Income Mastery</title>
  <style>
    body{font-family:Inter,ui-sans-serif,system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; background:#f8fafc; color:#0f172a; margin:0}
    .wrap{max-width:980px;margin:40px auto;padding:20px}
    .card{background:#fff;border-radius:12px;padding:20px;box-shadow:0 6px 18px rgba(2,6,23,.08)}
    .btn{display:inline-block;background:#4338ca;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none}
    h1{font-size:28px;margin:0}
    ul{padding-left:20px}
    .price{font-size:28px;font-weight:700}
  </style>
</head>
<body>
  <div class="wrap">
    <header class="card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-weight:700">Digital Income Mastery</div>
          <div style="color:#6b7280;font-size:14px">AI & Automation</div>
        </div>
        <a class="btn" href="https://whop.com/digital-income-mastery-ai-a/digital-income-mastery-ai-a-07/" target="_blank">Buy on Whop</a>
      </div>
    </header>

    <main style="margin-top:20px">
      <section class="card">
        <h1>Master AI & Automation to build recurring income</h1>
        <p>Practical modules, prompts and automation blueprints.</p>
      </section>

      <section class="card" style="margin-top:16px">
        <h2>Pricing</h2>
        <div class="price">$88.00 <span style="font-size:14px;color:#6b7280">/ month</span></div>
        <div style="color:#6b7280">Original $100.00 — 12% discount</div>
        <a class="btn" style="margin-top:12px;display:inline-block" href="https://whop.com/digital-income-mastery-ai-a/digital-income-mastery-ai-a-07/" target="_blank">Buy on Whop</a>
      </section>

      <section class="card" style="margin-top:16px">
        <h2>Curriculum</h2>
        <ul>
          <li>AI Mindset & Foundation</li>
          <li>AI Content Creation System</li>
          <li>AI Marketing & Sales Automation</li>
          <li>AI Business Operations</li>
          <li>Advanced AI Income Streams</li>
          <li>AI Monetization</li>
          <li>E-commerce</li>
        </ul>
      </section>

      <footer style="text-align:center;margin-top:18px;color:#9ca3af;font-size:13px">© Digital Income Mastery</footer>
    </main>
  </div>
</body>
</html>
*/

/*
INSTRUCTIONS
1) For React dev: create a Vite React app, add Tailwind, paste files under src, run:
   npm install
   npm run dev

2) The demo auth is client-side only. For production, exchange Whop webhooks or OAuth to validate purchases and create server-side user sessions.

3) To enable discounted checkout variants on Whop: create a coupon or pricing variant in your Whop product dashboard and use the variant checkout link. The code shows the discounted $88/month price for display only.

4) Static export: open public/static-index.html in a browser. This is a lightweight landing + pricing + curriculum page that points to your Whop product link.
*/
