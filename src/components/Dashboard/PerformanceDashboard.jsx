import React from 'react'

const PerformanceDashboard = ({ employees }) => {
  const calculatePerformanceMetrics = () => {
    let totalTasks = 0
    let completedTasks = 0
    let activeTasks = 0
    let failedTasks = 0

    employees.forEach(emp => {
      totalTasks += emp.tasks.length
      completedTasks += emp.taskCount.completed
      activeTasks += emp.taskCount.active
      failedTasks += emp.taskCount.failed
    })

    const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0
    const failureRate = totalTasks > 0 ? ((failedTasks / totalTasks) * 100).toFixed(1) : 0

    return { totalTasks, completedTasks, activeTasks, failedTasks, completionRate, failureRate }
  }

  const metrics = calculatePerformanceMetrics()

  const topPerformers = employees
    .map(emp => ({
      ...emp,
      completionRate: emp.tasks.length > 0 
        ? ((emp.taskCount.completed / emp.tasks.length) * 100).toFixed(1)
        : 0
    }))
    .sort((a, b) => b.completionRate - a.completionRate)
    .slice(0, 3)

  return (
    <div className='bg-gradient-to-br from-pink-600 to-purple-600 p-6 rounded-xl shadow-lg mb-5'>
      <h2 className='text-2xl font-bold text-white flex items-center gap-2 mb-5'>
        <span className='text-3xl'>📊</span>
        Performance Dashboard
      </h2>

      {/* Overall Metrics */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
        <div className='bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center border-2 border-white/30'>
          <div className='text-4xl mb-2'>📝</div>
          <div className='text-3xl font-bold text-white'>{metrics.totalTasks}</div>
          <div className='text-sm text-white/80'>Total Tasks</div>
        </div>
        
        <div className='bg-green-500/30 backdrop-blur-sm p-4 rounded-lg text-center border-2 border-green-400'>
          <div className='text-4xl mb-2'>✅</div>
          <div className='text-3xl font-bold text-white'>{metrics.completedTasks}</div>
          <div className='text-sm text-white/80'>Completed</div>
        </div>
        
        <div className='bg-blue-500/30 backdrop-blur-sm p-4 rounded-lg text-center border-2 border-blue-400'>
          <div className='text-4xl mb-2'>🔄</div>
          <div className='text-3xl font-bold text-white'>{metrics.activeTasks}</div>
          <div className='text-sm text-white/80'>In Progress</div>
        </div>
        
        <div className='bg-red-500/30 backdrop-blur-sm p-4 rounded-lg text-center border-2 border-red-400'>
          <div className='text-4xl mb-2'>❌</div>
          <div className='text-3xl font-bold text-white'>{metrics.failedTasks}</div>
          <div className='text-sm text-white/80'>Failed</div>
        </div>
      </div>

      {/* Completion Rate Bar */}
      <div className='bg-white/20 backdrop-blur-sm p-4 rounded-lg mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-white font-semibold'>Overall Completion Rate</span>
          <span className='text-white font-bold text-xl'>{metrics.completionRate}%</span>
        </div>
        <div className='w-full bg-white/30 rounded-full h-6 overflow-hidden'>
          <div 
            className='bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2'
            style={{ width: `${metrics.completionRate}%` }}
          >
            <span className='text-white text-xs font-bold'>
              {metrics.completionRate > 10 ? `${metrics.completionRate}%` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div>
        <h3 className='text-xl font-bold text-white mb-3 flex items-center gap-2'>
          <span>🏆</span>
          Top Performers
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {topPerformers.map((emp, index) => (
            <div
              key={emp.id}
              className={`p-4 rounded-lg border-2 ${
                index === 0
                  ? 'bg-yellow-400/30 border-yellow-400'
                  : index === 1
                  ? 'bg-gray-300/30 border-gray-300'
                  : 'bg-orange-400/30 border-orange-400'
              }`}
            >
              <div className='flex items-center justify-between mb-2'>
                <span className='text-3xl'>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </span>
                <span className='text-2xl font-bold text-white'>{emp.completionRate}%</span>
              </div>
              <p className='text-white font-bold text-lg'>{emp.firstName}</p>
              <p className='text-white/80 text-sm'>
                {emp.taskCount.completed}/{emp.tasks.length} tasks completed
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PerformanceDashboard
