import React, { useState, useMemo } from 'react'

const EmployeeReports = ({ employees }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  // Calculate statistics
  const stats = useMemo(() => {
    if (!employees) return null

    const totalEmployees = employees.length
    const totalTasks = employees.reduce((sum, emp) => 
      sum + emp.taskCount.active + emp.taskCount.newTask + emp.taskCount.completed + emp.taskCount.failed, 0)
    const completedTasks = employees.reduce((sum, emp) => sum + emp.taskCount.completed, 0)
    const activeTasks = employees.reduce((sum, emp) => sum + emp.taskCount.active, 0)
    const failedTasks = employees.reduce((sum, emp) => sum + emp.taskCount.failed, 0)
    const newTasks = employees.reduce((sum, emp) => sum + emp.taskCount.newTask, 0)

    return {
      totalEmployees,
      totalTasks,
      completedTasks,
      activeTasks,
      failedTasks,
      newTasks,
      completionRate: totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0
    }
  }, [employees])

  // Sort employees
  const sortedEmployees = useMemo(() => {
    if (!employees) return []
    
    return [...employees].sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'name':
          aValue = a.firstName.toLowerCase()
          bValue = b.firstName.toLowerCase()
          break
        case 'id':
          aValue = a.id
          bValue = b.id
          break
        case 'completed':
          aValue = a.taskCount.completed
          bValue = b.taskCount.completed
          break
        case 'active':
          aValue = a.taskCount.active
          bValue = b.taskCount.active
          break
        case 'failed':
          aValue = a.taskCount.failed
          bValue = b.taskCount.failed
          break
        default:
          aValue = a.firstName.toLowerCase()
          bValue = b.firstName.toLowerCase()
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }, [employees, sortBy, sortOrder])

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const getSortIcon = (field) => {
    if (sortBy !== field) return '↕️'
    return sortOrder === 'asc' ? '↑' : '↓'
  }

  if (!employees || employees.length === 0) {
    return (
      <div className='bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl border-2 border-purple-500/30'>
        <div className='text-center py-10 text-white/50'>
          <p className='text-xl'>📊 No employee data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl border-2 border-purple-500/30 mb-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-3xl font-bold text-white flex items-center gap-3'>
          <span className='text-4xl'>📊</span>
          Employee Reports & Analytics
        </h2>
        <div className='flex gap-2'>
          <button
            onClick={() => window.print()}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2'
          >
            <span>🖨️</span>
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6'>
        <div className='bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-lg shadow-lg'>
          <div className='text-blue-200 text-sm font-semibold'>Total Employees</div>
          <div className='text-white text-2xl font-bold'>{stats.totalEmployees}</div>
        </div>
        <div className='bg-gradient-to-br from-purple-600 to-purple-800 p-4 rounded-lg shadow-lg'>
          <div className='text-purple-200 text-sm font-semibold'>Total Tasks</div>
          <div className='text-white text-2xl font-bold'>{stats.totalTasks}</div>
        </div>
        <div className='bg-gradient-to-br from-green-600 to-green-800 p-4 rounded-lg shadow-lg'>
          <div className='text-green-200 text-sm font-semibold'>Completed</div>
          <div className='text-white text-2xl font-bold'>{stats.completedTasks}</div>
        </div>
        <div className='bg-gradient-to-br from-orange-600 to-orange-800 p-4 rounded-lg shadow-lg'>
          <div className='text-orange-200 text-sm font-semibold'>Active</div>
          <div className='text-white text-2xl font-bold'>{stats.activeTasks}</div>
        </div>
        <div className='bg-gradient-to-br from-red-600 to-red-800 p-4 rounded-lg shadow-lg'>
          <div className='text-red-200 text-sm font-semibold'>Failed</div>
          <div className='text-white text-2xl font-bold'>{stats.failedTasks}</div>
        </div>
        <div className='bg-gradient-to-br from-yellow-600 to-yellow-800 p-4 rounded-lg shadow-lg'>
          <div className='text-yellow-200 text-sm font-semibold'>Success Rate</div>
          <div className='text-white text-2xl font-bold'>{stats.completionRate}%</div>
        </div>
      </div>

      {/* Employee Table */}
      <div className='bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-lg shadow-lg mb-4'>
        <h3 className='text-white font-bold text-lg mb-4 flex items-center gap-2'>
          <span>👥</span>
          Employee Performance Overview
        </h3>
        
        <div className='overflow-x-auto'>
          <table className='w-full text-white'>
            <thead>
              <tr className='border-b border-white/20'>
                <th 
                  className='text-left py-3 px-4 cursor-pointer hover:bg-white/10 transition-colors'
                  onClick={() => handleSort('id')}
                >
                  ID {getSortIcon('id')}
                </th>
                <th 
                  className='text-left py-3 px-4 cursor-pointer hover:bg-white/10 transition-colors'
                  onClick={() => handleSort('name')}
                >
                  Name {getSortIcon('name')}
                </th>
                <th 
                  className='text-center py-3 px-4 cursor-pointer hover:bg-white/10 transition-colors'
                  onClick={() => handleSort('completed')}
                >
                  Completed {getSortIcon('completed')}
                </th>
                <th 
                  className='text-center py-3 px-4 cursor-pointer hover:bg-white/10 transition-colors'
                  onClick={() => handleSort('active')}
                >
                  Active {getSortIcon('active')}
                </th>
                <th 
                  className='text-center py-3 px-4 cursor-pointer hover:bg-white/10 transition-colors'
                  onClick={() => handleSort('failed')}
                >
                  Failed {getSortIcon('failed')}
                </th>
                <th className='text-center py-3 px-4'>Success Rate</th>
                <th className='text-center py-3 px-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.map((employee) => {
                const totalTasks = employee.taskCount.active + employee.taskCount.newTask + 
                                 employee.taskCount.completed + employee.taskCount.failed
                const successRate = totalTasks > 0 ? 
                  ((employee.taskCount.completed / totalTasks) * 100).toFixed(1) : 0

                return (
                  <tr 
                    key={employee.id} 
                    className='border-b border-white/10 hover:bg-white/5 transition-colors'
                  >
                    <td className='py-3 px-4 font-semibold'>{employee.id}</td>
                    <td className='py-3 px-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-white text-sm'>
                          {employee.firstName.charAt(0)}
                        </div>
                        <div>
                          <div className='font-semibold'>{employee.firstName}</div>
                          <div className='text-sm text-white/70'>{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className='text-center py-3 px-4'>
                      <span className='bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold'>
                        {employee.taskCount.completed}
                      </span>
                    </td>
                    <td className='text-center py-3 px-4'>
                      <span className='bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold'>
                        {employee.taskCount.active}
                      </span>
                    </td>
                    <td className='text-center py-3 px-4'>
                      <span className='bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold'>
                        {employee.taskCount.failed}
                      </span>
                    </td>
                    <td className='text-center py-3 px-4'>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        successRate >= 80 ? 'bg-green-600 text-white' :
                        successRate >= 60 ? 'bg-yellow-600 text-white' :
                        'bg-red-600 text-white'
                      }`}>
                        {successRate}%
                      </div>
                    </td>
                    <td className='text-center py-3 px-4'>
                      <button
                        onClick={() => setSelectedEmployee(employee)}
                        className='bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-200'
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border-2 border-purple-500/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-2xl font-bold text-white flex items-center gap-3'>
                  <span className='text-3xl'>👤</span>
                  {selectedEmployee.firstName} - Detailed Report
                </h3>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200'
                >
                  ✕ Close
                </button>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Employee Info */}
                <div className='bg-gradient-to-br from-purple-600 to-purple-800 p-4 rounded-lg'>
                  <h4 className='text-white font-bold text-lg mb-4'>Employee Information</h4>
                  <div className='space-y-2 text-white'>
                    <div><strong>ID:</strong> {selectedEmployee.id}</div>
                    <div><strong>Name:</strong> {selectedEmployee.firstName}</div>
                    <div><strong>Email:</strong> {selectedEmployee.email}</div>
                    <div><strong>Total Tasks:</strong> {
                      selectedEmployee.taskCount.active + selectedEmployee.taskCount.newTask + 
                      selectedEmployee.taskCount.completed + selectedEmployee.taskCount.failed
                    }</div>
                  </div>
                </div>

                {/* Task Statistics */}
                <div className='bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-lg'>
                  <h4 className='text-white font-bold text-lg mb-4'>Task Statistics</h4>
                  <div className='grid grid-cols-2 gap-4 text-white'>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-green-300'>{selectedEmployee.taskCount.completed}</div>
                      <div className='text-sm'>Completed</div>
                    </div>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-blue-300'>{selectedEmployee.taskCount.active}</div>
                      <div className='text-sm'>Active</div>
                    </div>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-yellow-300'>{selectedEmployee.taskCount.newTask}</div>
                      <div className='text-sm'>New</div>
                    </div>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-red-300'>{selectedEmployee.taskCount.failed}</div>
                      <div className='text-sm'>Failed</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Task Details */}
              <div className='mt-6'>
                <h4 className='text-white font-bold text-lg mb-4'>Task Details</h4>
                <div className='space-y-3 max-h-60 overflow-y-auto'>
                  {selectedEmployee.tasks.map((task, index) => (
                    <div key={index} className='bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-lg'>
                      <div className='flex justify-between items-start mb-2'>
                        <h5 className='text-white font-semibold'>{task.title}</h5>
                        <div className='flex gap-2'>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            task.completed ? 'bg-green-600 text-white' :
                            task.active ? 'bg-blue-600 text-white' :
                            task.failed ? 'bg-red-600 text-white' :
                            'bg-yellow-600 text-white'
                          }`}>
                            {task.completed ? 'Completed' :
                             task.active ? 'Active' :
                             task.failed ? 'Failed' : 'New'}
                          </span>
                          <span className='bg-white/20 text-white px-2 py-1 rounded-full text-xs'>
                            {task.category}
                          </span>
                        </div>
                      </div>
                      <p className='text-white/80 text-sm'>{task.description}</p>
                      <div className='text-white/60 text-xs mt-2'>Due: {task.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeeReports
