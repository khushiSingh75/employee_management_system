import React from 'react'

const TaskListNumbers = ({data}) => {
  const totalTasks = data.taskCount.newTask + data.taskCount.active + data.taskCount.completed + data.taskCount.failed
  
  return (
    <div className='flex mt-8 justify-between gap-5 screen'>
      <div className='rounded-xl w-[25%] py-6 px-9 bg-gradient-to-br from-purple-500 to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-purple-400 transform hover:scale-105 cursor-pointer'>
        <div className='flex justify-between items-center mb-2'>
          <h2 className='text-4xl font-bold text-white drop-shadow-lg'>{data.taskCount.newTask}</h2>
          <span className='text-5xl'>🆕</span>
        </div>
        <h3 className='text-lg font-semibold text-white/90'>New Tasks</h3>
        <div className='mt-2 bg-white/20 h-1 rounded-full'>
          <div className='bg-yellow-400 h-1 rounded-full' style={{width: `${totalTasks > 0 ? (data.taskCount.newTask/totalTasks)*100 : 0}%`}}></div>
        </div>
      </div>

      <div className='rounded-xl w-[25%] py-6 px-9 bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-blue-400 transform hover:scale-105 cursor-pointer'>
        <div className='flex justify-between items-center mb-2'>
          <h2 className='text-4xl font-bold text-white drop-shadow-lg'>{data.taskCount.active}</h2>
          <span className='text-5xl'>💼</span>
        </div>
        <h3 className='text-lg font-semibold text-white/90'>In Progress</h3>
        <div className='mt-2 bg-white/20 h-1 rounded-full'>
          <div className='bg-orange-400 h-1 rounded-full' style={{width: `${totalTasks > 0 ? (data.taskCount.active/totalTasks)*100 : 0}%`}}></div>
        </div>
      </div>

      <div className='rounded-xl w-[25%] py-6 px-9 bg-gradient-to-br from-green-500 to-emerald-700 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-green-400 transform hover:scale-105 cursor-pointer'>
        <div className='flex justify-between items-center mb-2'>
          <h2 className='text-4xl font-bold text-white drop-shadow-lg'>{data.taskCount.completed}</h2>
          <span className='text-5xl'>✅</span>
        </div>
        <h3 className='text-lg font-semibold text-white/90'>Completed</h3>
        <div className='mt-2 bg-white/20 h-1 rounded-full'>
          <div className='bg-yellow-300 h-1 rounded-full' style={{width: `${totalTasks > 0 ? (data.taskCount.completed/totalTasks)*100 : 0}%`}}></div>
        </div>
      </div>

      <div className='rounded-xl w-[25%] py-6 px-9 bg-gradient-to-br from-red-500 to-red-700 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-red-400 transform hover:scale-105 cursor-pointer'>
        <div className='flex justify-between items-center mb-2'>
          <h2 className='text-4xl font-bold text-white drop-shadow-lg'>{data.taskCount.failed}</h2>
          <span className='text-5xl'>⚠️</span>
        </div>
        <h3 className='text-lg font-semibold text-white/90'>Failed</h3>
        <div className='mt-2 bg-white/20 h-1 rounded-full'>
          <div className='bg-yellow-400 h-1 rounded-full' style={{width: `${totalTasks > 0 ? (data.taskCount.failed/totalTasks)*100 : 0}%`}}></div>
        </div>
      </div>
    </div>
  )
}

export default TaskListNumbers