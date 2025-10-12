import React, { useContext, useState } from 'react'
import Header from '../../others/Header'
import CreateTask from '../../others/CreateTask'
import AllTask from '../../others/AllTask'
import FilterPanel from './FilterPanel'
import AttendanceTracker from './AttendanceTracker'
import PerformanceDashboard from './PerformanceDashboard'
import ExportButtons from './ExportButtons'
import EmployeeReports from './EmployeeReports'
import { AuthContext } from '../../context/AuthProvider'

const AdminDashboard = (props) => {
  const [userData] = useContext(AuthContext)
  const [filteredEmployees, setFilteredEmployees] = useState(null)
  const [showCreateTask, setShowCreateTask] = useState(true)
  const [showReports, setShowReports] = useState(false)

  const handleFilterChange = ({ search }) => {
    if (!userData) return

    let filtered = [...userData]

    // Filter by search term
    if (search && search.trim()) {
      const searchLower = search.toLowerCase().trim()
      filtered = filtered.filter(emp => {
        const firstNameMatch = emp.firstName.toLowerCase().includes(searchLower)
        const emailMatch = emp.email.toLowerCase().includes(searchLower)
        const idMatch = emp.id.toString().includes(search)
        
        return firstNameMatch || emailMatch || idMatch
      })
    }

    // If no search term, show all employees
    if (!search || !search.trim()) {
      setFilteredEmployees(null)
    } else {
      setFilteredEmployees(filtered)
    }
  }

  const displayEmployees = filteredEmployees || userData || []

  return (
    <div className='min-h-screen w-full p-7 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-y-auto'>
      <Header changeUser={props.changeUser}/>
      
      {/* Export Buttons */}
      {userData && <ExportButtons employees={userData} />}
      
      {/* Performance Dashboard */}
      {userData && <PerformanceDashboard employees={userData} />}
      
      {/* Attendance Tracker */}
      {userData && <AttendanceTracker employees={userData} />}
      
      {/* Filter Panel */}
      {userData && <FilterPanel employees={userData} onFilterChange={handleFilterChange} />}

      {/* Search Results Info */}
      {filteredEmployees && (
        <div className='mb-4 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg'>
          <div className='flex items-center justify-between text-white mb-4'>
            <div className='flex items-center gap-2'>
              <span className='text-lg'>📊</span>
              <span className='font-semibold'>
                Showing {filteredEmployees.length} of {userData.length} employees
              </span>
            </div>
            {filteredEmployees.length !== userData.length && (
              <button
                onClick={() => {
                  setFilteredEmployees(null)
                  // Clear the search in FilterPanel
                  const searchInput = document.querySelector('input[type="text"]')
                  if (searchInput) {
                    searchInput.value = ''
                    searchInput.dispatchEvent(new Event('input', { bubbles: true }))
                  }
                }}
                className='bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2'
              >
                <span>🔄</span>
                <span>Close</span>
              </button>
            )}
          </div>
          
          {/* Detailed Search Results */}
          {filteredEmployees.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {filteredEmployees.map((employee) => {
                const totalTasks = employee.taskCount.active + employee.taskCount.newTask + 
                                 employee.taskCount.completed + employee.taskCount.failed
                const completionRate = totalTasks > 0 ? 
                  ((employee.taskCount.completed / totalTasks) * 100).toFixed(1) : 0

                return (
                  <div key={employee.id} className='bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20'>
                    <div className='flex items-center gap-3 mb-3'>
                      <div className='w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg'>
                        {employee.firstName.charAt(0)}
                      </div>
                      <div>
                        <h3 className='text-white font-bold text-lg'>{employee.firstName}</h3>
                        <p className='text-white/70 text-sm'>ID: {employee.id}</p>
                        <p className='text-white/60 text-xs'>{employee.email}</p>
                      </div>
                    </div>
                    
                    <div className='grid grid-cols-2 gap-2 mb-3'>
                      <div className='bg-green-600/30 rounded-lg p-2 text-center'>
                        <div className='text-green-300 text-lg font-bold'>{employee.taskCount.completed}</div>
                        <div className='text-green-200 text-xs'>Completed</div>
                      </div>
                      <div className='bg-blue-600/30 rounded-lg p-2 text-center'>
                        <div className='text-blue-300 text-lg font-bold'>{employee.taskCount.active}</div>
                        <div className='text-blue-200 text-xs'>Active</div>
                      </div>
                      <div className='bg-yellow-600/30 rounded-lg p-2 text-center'>
                        <div className='text-yellow-300 text-lg font-bold'>{employee.taskCount.newTask}</div>
                        <div className='text-yellow-200 text-xs'>Pending</div>
                      </div>
                      <div className='bg-red-600/30 rounded-lg p-2 text-center'>
                        <div className='text-red-300 text-lg font-bold'>{employee.taskCount.failed}</div>
                        <div className='text-red-200 text-xs'>Failed</div>
                      </div>
                    </div>
                    
                    <div className='flex justify-between items-center'>
                      <span className='text-white/70 text-sm'>Total Tasks: {totalTasks}</span>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        completionRate >= 80 ? 'bg-green-600 text-white' :
                        completionRate >= 60 ? 'bg-yellow-600 text-white' :
                        'bg-red-600 text-white'
                      }`}>
                        {completionRate}% Success
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Reports Toggle */}
      <div className='mb-5'>
        <button
          onClick={() => setShowReports(!showReports)}
          className='bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2'
        >
          <span className='text-xl'>{showReports ? '📊' : '📈'}</span>
          <span>{showReports ? 'Hide' : 'Show'} Employee Reports</span>
        </button>
      </div>

      {/* Employee Reports */}
      {showReports && userData && <EmployeeReports employees={userData} />}
      
      {/* Create Task Toggle */}
      <div className='mb-5'>
        <button
          onClick={() => setShowCreateTask(!showCreateTask)}
          className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2'
        >
          <span className='text-xl'>{showCreateTask ? '➖' : '➕'}</span>
          <span>{showCreateTask ? 'Hide' : 'Show'} Create Task Form</span>
        </button>
      </div>
      
      {/* Create Task Form */}
      {showCreateTask && <CreateTask/>}
      
      {/* All Tasks */}
      <AllTask employees={displayEmployees}/>
      
      {/* Debug Info - Remove this after testing */}
      {process.env.NODE_ENV === 'development' && (
        <div className='mt-4 p-4 bg-gray-800 rounded-lg text-white text-sm'>
          {/* <div><strong>Debug Info:</strong></div>
          <div>Total employees: {userData?.length || 0}</div>
          <div>Filtered employees: {filteredEmployees?.length || 0}</div>
          <div>Display employees: {displayEmployees?.length || 0}</div>
          <div>Search active: {filteredEmployees ? 'Yes' : 'No'}</div> */}
          {userData && (
            <div className='mt-2'>
              <div><strong>Available employee names:</strong></div>
              <div className='flex flex-wrap gap-1 mt-1'>
                {userData.map((emp, idx) => (
                  <span key={idx} className='bg-blue-600 px-2 py-1 rounded text-xs'>
                    {emp.firstName}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard