import React from 'react'

const Header = (props) => {
  const username = props.data ? props.data.firstName : 'Admin'
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  
  const logOutUser = () =>{
    localStorage.setItem('loggedInUser','')
    props.changeUser('')
  }
  
  return (
    <div className='flex items-center justify-between bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl shadow-2xl mb-6 border-2 border-purple-400'>
      <div>
        <h1 className='text-3xl font-bold text-white mb-1'>
          Hello, <span className='text-yellow-300'>{username}</span> 👋
        </h1>
        <p className='text-white/80 text-sm flex items-center gap-2'>
          <span>📅 {currentDate}</span>
          <span className='mx-2'>|</span>
          <span>🕐 {currentTime}</span>
        </p>
      </div>
      <button 
        onClick={logOutUser} 
        className='bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2'
      >
        <span>🚪</span>
        <span>Log Out</span>
      </button>
    </div>
  )
}

export default Header