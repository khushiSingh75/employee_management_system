import React, { useContext, useMemo } from 'react'
import { AuthContext } from '../context/AuthProvider'

const AllTask = React.memo(({ employees }) => {
  const [userData, setUserData] = useContext(AuthContext)
  const displayData = employees || userData || []
  
  return (
        <div className='bg-gradient-to-br from-gray-800 to-gray-900 p-6 mt-5 rounded-xl shadow-2xl border-2 border-purple-500/30'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold text-white flex items-center gap-2'>
          <span className='text-3xl'>📄</span>
          Employee Task Overview
        </h2>
        <span className='bg-purple-600 text-white px-4 py-2 rounded-full font-bold'>
          {displayData.length} Employees
        </span>
      </div>
      
      <div className='bg-gradient-to-r from-purple-600 to-pink-600 mb-3 py-3 px-4 flex justify-between rounded-lg shadow-lg'>
        <h2 className='w-1/5 text-base font-bold text-white'>👤 Employee</h2>
        <h3 className='w-1/5 text-base font-bold text-white text-center'>🆕 New</h3>
        <h5 className='w-1/5 text-base font-bold text-white text-center'>💼 Active</h5>
        <h5 className='w-1/5 text-base font-bold text-white text-center'>✅ Done</h5>
        <h5 className='w-1/5 text-base font-bold text-white text-center'>❌ Failed</h5>
      </div>
      
      <div className='max-h-80 overflow-auto pr-2 space-y-2'>
        {displayData.length === 0 ? (
          <div className='text-center py-10 text-white/50'>
            <p className='text-xl'>🔍 No employees found</p>
          </div>
        ) : (
          displayData.map(function(elem, idx){
            const totalTasks = elem.taskCount.newTask + elem.taskCount.active + elem.taskCount.completed + elem.taskCount.failed
            const completionRate = totalTasks > 0 ? ((elem.taskCount.completed / totalTasks) * 100).toFixed(0) : 0
            
            return (
              <div key={idx} className='bg-gradient-to-r from-indigo-600 to-purple-600 border-2 border-purple-400 hover:border-yellow-400 mb-2 py-3 px-4 flex justify-between items-center rounded-lg shadow-md hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]'>
                <div className='w-1/5 flex items-center gap-3'>
                  <div className='w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg'>
                    {elem.firstName.charAt(0)}
                  </div>
                  <div>
                    <h2 className='text-lg font-bold text-white'>{elem.firstName}</h2>
                    <p className='text-xs text-white/70'>ID: {elem.id}</p>
                  </div>
                </div>
                <div className='w-1/5 text-center'>
                  <div className='bg-purple-800/50 backdrop-blur-sm px-3 py-2 rounded-lg inline-block'>
                    <h3 className='text-xl font-bold text-yellow-400'>{elem.taskCount.newTask}</h3>
                  </div>
                </div>
                <div className='w-1/5 text-center'>
                  <div className='bg-blue-800/50 backdrop-blur-sm px-3 py-2 rounded-lg inline-block'>
                    <h5 className='text-xl font-bold text-blue-300'>{elem.taskCount.active}</h5>
                  </div>
                </div>
                <div className='w-1/5 text-center'>
                  <div className='bg-green-800/50 backdrop-blur-sm px-3 py-2 rounded-lg inline-block'>
                    <h5 className='text-xl font-bold text-green-300'>{elem.taskCount.completed}</h5>
                    <p className='text-xs text-green-200'>{completionRate}%</p>
                  </div>
                </div>
                <div className='w-1/5 text-center'>
                  <div className='bg-red-800/50 backdrop-blur-sm px-3 py-2 rounded-lg inline-block'>
                    <h5 className='text-xl font-bold text-red-300'>{elem.taskCount.failed}</h5>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

    </div>
  )
})

export default AllTask
