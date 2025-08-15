import React from 'react'

export default function NavBar({ user, onSignOut, setPage }){
  return (
    <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flagbar">265</div>
        <div>
          <h1 className="text-xl font-extrabold">pay265</h1>
          <div className="text-xs text-gray-600">Malawi marketplace — prices in MWK</div>
        </div>
      </div>
      <nav className="flex gap-2 items-center">
        <button onClick={() => setPage('home')} className="btn">Home</button>
        <button onClick={() => setPage('seller')} className="btn">Seller</button>
        <button onClick={() => setPage('buyer')} className="btn">Buyer</button>
        {user && (
          <div className="px-3 py-1 bg-white rounded border text-sm">
            {user.email}
            <button onClick={onSignOut} className="ml-2 text-xs underline">Logout</button>
          </div>
        )}
      </nav>
    </header>
  )
}
