import React from 'react'

const CompleteTask = ({data}) => {
  return (
    <div className='flex-shrink-0 h-full w-[300px] p-5 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-green-400 opacity-90'>
        <div className='flex justify-between items-center'>
          <h3 className='bg-green-800 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md'>{data.category}</h3>
          <h4 className='text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm'>{data.date}</h4>
        </div>
        <div className='flex items-center gap-2 mt-3'>
          <span className='text-2xl'>✅</span>
          <span className='bg-yellow-400 text-green-900 px-2 py-1 rounded-full text-xs font-bold'>COMPLETED</span>
        </div>
        <h2 className='mt-3 text-2xl font-bold text-white drop-shadow-lg line-through decoration-2'>{data.title}</h2>
        <p className='text-sm mt-2 text-white/80 leading-relaxed line-clamp-3 line-through'>{data.description}</p>
        <div className='mt-4 flex items-center justify-center'>
          <div className='bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full'>
            <span className='text-white font-bold text-sm'>✨ Task Completed!</span>
          </div>
        </div>
      </div>
  )
}

export default CompleteTask