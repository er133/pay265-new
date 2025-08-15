import React, { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import { DISTRICTS } from './constants/districts'
import NavBar from './components/NavBar'
import { SellerSignup, BuyerSignup } from './components/AuthForms'

const formatKW = (n) => 'MWK ' + Number(n||0).toLocaleString()

export default function App(){
  const [page,setPage]=useState('home')
  const [user,setUser]=useState(null)
  const [products,setProducts]=useState([])
  const [loading,setLoading]=useState(true)

  const [newProduct,setNewProduct]=useState({ title:'', price:'', district: DISTRICTS[0] })

  useEffect(()=>{
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    fetchProducts()
    return () => sub?.subscription?.unsubscribe()
  },[])

  async function fetchProducts(){
    setLoading(true)
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending:false })
    if(error){ console.error(error); setProducts([]) } else { setProducts(data || []) }
    setLoading(false)
  }

  async function signOut(){ await supabase.auth.signOut() }

  async function addProduct(){
    if(!user) return alert('Login as seller to add a product')
    if(!newProduct.title || !newProduct.price) return alert('Add title and price')
    const meta = user.user_metadata || {}
    const { error } = await supabase.from('products').insert([{
      title: newProduct.title,
      price_mwk: Number(newProduct.price),
      seller_name: meta.name || user.email,
      district: newProduct.district
    }])
    if(error) return alert(error.message)
    setNewProduct({ title:'', price:'', district: DISTRICTS[0] })
    fetchProducts()
  }

  async function placeOrder(productId, method){
    if(!user) return alert('Login as buyer first (Buyer tab)')
    const meta = user.user_metadata || {}
    const { error } = await supabase.from('orders').insert([{
      product_id: productId,
      buyer_name: meta.name || user.email,
      method, status:'pending'
    }])
    if(error) return alert(error.message)
    alert('Order placed. Contact the seller to complete.')
  }

  return (
    <div className="min-h-screen">
      <div className="flagbar h-1 w-full"></div>
      <NavBar user={user} onSignOut={signOut} setPage={setPage} />
      <main className="max-w-6xl mx-auto p-4">
        {page==='home' && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Products</h2>
              <div className="text-sm text-gray-600">Across Malawi</div>
            </div>
            {loading ? <div>Loading...</div> : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map(p => (
                  <div key={p.id} className="card flex flex-col">
                    <div className="h-40 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-500">No Image</div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <div className="text-sm text-gray-600">Seller: {p.seller_name} — {p.district}</div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-lg font-bold">{formatKW(p.price_mwk)}</div>
                      <div className="flex items-center gap-2">
                        <select defaultValue="meet" className="select w-auto text-sm" id={`method-${p.id}`}>
                          <option value="meet">Meet in person</option>
                          <option value="transfer">Via transaction</option>
                          <option value="delivery">Seller sends</option>
                        </select>
                        <button className="btn btn-black text-sm" onClick={()=>{
                          const method = document.getElementById(`method-${p.id}`).value
                          placeOrder(p.id, method)
                        }}>Buy</button>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">Status: {p.status || 'available'}</div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {page==='seller' && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Seller Dashboard</h2>
            {!user ? (
              <div className="card">
                <h3 className="font-semibold mb-2">Create seller account</h3>
                <SellerSignup onDone={()=>{}} />
              </div>
            ) : (
              <div className="card">
                <h3 className="font-semibold mb-2">Add product</h3>
                <div className="grid gap-2">
                  <input className="input" placeholder="Title" value={newProduct.title} onChange={e=>setNewProduct({...newProduct, title:e.target.value})} />
                  <input className="input" placeholder="Price (MWK)" value={newProduct.price} onChange={e=>setNewProduct({...newProduct, price:e.target.value})} />
                  <select className="select" value={newProduct.district} onChange={e=>setNewProduct({...newProduct, district:e.target.value})}>
                    {DISTRICTS.map(d=> <option key={d} value={d}>{d}</option>)}
                  </select>
                  <div className="flex gap-2">
                    <button className="btn btn-green" onClick={addProduct}>Add Product</button>
                    <button className="btn btn-red" onClick={()=>setNewProduct({ title:'', price:'', district:DISTRICTS[0] })}>Clear</button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {page==='buyer' && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Buyer Account</h2>
            {!user ? (
              <div className="card">
                <h3 className="font-semibold mb-2">Create or login to buyer account</h3>
                <BuyerSignup onDone={()=>{}} />
              </div>
            ) : (
              <div className="card flex items-center justify-between">
                <div>
                  <div className="font-semibold">{user.email}</div>
                  <div className="text-sm text-gray-600">Buyer account</div>
                </div>
                <button className="btn btn-black" onClick={()=>setPage('home')}>Browse products</button>
              </div>
            )}
          </section>
        )}
      </main>
      <footer className="max-w-6xl mx-auto p-6 text-center text-sm text-gray-500">pay265 — MVP • Prices in MWK • Malawi districts</footer>
    </div>
  )
}
