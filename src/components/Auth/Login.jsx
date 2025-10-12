import React, { useState } from 'react'

const Login = ({handleLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }
    
    // Simulate async login process
    setTimeout(() => {
      handleLogin(email, password, setError);
      setEmail('');
      setPassword('');
      setIsLoading(false);
    }, 500);
  }
  
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900'>
      {/* Background Animation */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
        <div className='absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>
      </div>
      
      {/* Login Card */}
      <div className='relative z-10 bg-white/10 backdrop-blur-xl border-2 border-purple-400/50 rounded-2xl p-12 shadow-2xl w-[450px]'>
        <div className='text-center mb-8'>
          <h1 className='text-5xl font-bold text-white mb-2 drop-shadow-lg'>💼 EMS</h1>
          <p className='text-purple-200 text-lg'>Employee Management System</p>
          <div className='mt-4 flex justify-center gap-2'>
            <span className='w-12 h-1 bg-purple-400 rounded-full'></span>
            <span className='w-12 h-1 bg-pink-400 rounded-full'></span>
            <span className='w-12 h-1 bg-blue-400 rounded-full'></span>
          </div>
        </div>
        
        <form onSubmit={submitHandler} className='flex flex-col space-y-5'>
          {error && (
            <div className='bg-red-500/20 border-2 border-red-400/50 rounded-lg p-3 text-red-200 text-sm flex items-center gap-2'>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}
          <div>
            <label className='text-white font-semibold mb-2 block flex items-center gap-2'>
              <span>📧</span> Email Address
            </label>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className='w-full text-white bg-white/10 backdrop-blur-sm border-2 border-purple-400/50 rounded-lg text-lg py-3 px-5 placeholder:text-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-200'
              type='email' 
              placeholder='admin@me.com'
              aria-label='Email address'
              autoComplete='email'
            />
          </div>

          <div>
            <label className='text-white font-semibold mb-2 block flex items-center gap-2'>
              <span>🔐</span> Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className='w-full text-white bg-white/10 backdrop-blur-sm border-2 border-purple-400/50 rounded-lg text-lg py-3 px-5 placeholder:text-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-200'
              type="password" 
              placeholder='••••••••'
              aria-label='Password'
              autoComplete='current-password'
            />
          </div>
          
          <button 
            disabled={isLoading}
            className={`mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg text-xl py-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Login</span>
              </>
            )}
          </button>
        </form>
        
        <div className='mt-6 text-center'>
          <p className='text-gray-300 text-sm'>
            Demo: admin@me.com / 123
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login