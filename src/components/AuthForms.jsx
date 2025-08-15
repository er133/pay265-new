import React, { useState } from 'react'
import { DISTRICTS } from '../constants/districts'
import { supabase } from '../lib/supabase'

export function SellerSignup({ onDone }){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [district,setDistrict]=useState(DISTRICTS[0])
  const [busy,setBusy]=useState(false)

  async function submit(){
    setBusy(true)
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { name, role:'seller', district } }
    })
    setBusy(false)
    if(error) return alert(error.message)
    alert('Check your email to verify, then log in.')
    onDone?.()
  }

  return (
    <div className="space-y-2">
      <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <select className="select" value={district} onChange={e=>setDistrict(e.target.value)}>
        {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      <button className="btn btn-green w-full" onClick={submit} disabled={busy}>{busy?'Creating...':'Create seller account'}</button>
    </div>
  )
}

export function BuyerSignup({ onDone }){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [busy,setBusy]=useState(false)

  async function submit(){
    setBusy(true)
    const { error } = await supabase.auth.signUp({
      email, password, options: { data: { name, role:'buyer' } }
    })
    setBusy(false)
    if(error) return alert(error.message)
    alert('Check your email to verify, then log in.')
    onDone?.()
  }

  async function login(){
    setBusy(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if(error) return alert(error.message)
    onDone?.()
  }

  return (
    <div className="space-y-2">
      <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <div className="flex gap-2">
        <button className="btn btn-black flex-1" onClick={submit} disabled={busy}>{busy?'Working...':'Create buyer account'}</button>
        <button className="btn btn-green flex-1" onClick={login} disabled={busy}>{busy?'Signing in...':'Login'}</button>
      </div>
    </div>
  )
}
