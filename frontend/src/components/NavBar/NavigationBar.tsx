import React from 'react'

const NavigationBar = () => {
  return (
    <nav className="sticky top-0 h-16 backdrop-blur-md flex items-center justify-between px-4 bg-base-100/50 z-20 border-b-2 border-slate-900/10">
        <div>HorHub</div>
        <div className="flex items-center gap-5">
            <button className="primary-button">Sign In</button>
        </div>
    </nav>
  )
}

export default NavigationBar