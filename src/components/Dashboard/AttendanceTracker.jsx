import React, { useState, useEffect } from 'react'

const AttendanceTracker = ({ employees }) => {
  const [attendance, setAttendance] = useState({})
  const [stats, setStats] = useState({ present: 0, absent: 0, total: 0 })

  useEffect(() => {
    // Initialize attendance from localStorage or default to present
    const savedAttendance = localStorage.getItem('attendance')
    if (savedAttendance) {
      const parsed = JSON.parse(savedAttendance)
      setAttendance(parsed)
      calculateStats(parsed)
    } else {
      const initialAttendance = {}
      employees.forEach(emp => {
        initialAttendance[emp.id] = true
      })
      setAttendance(initialAttendance)
      calculateStats(initialAttendance)
    }
  }, [employees])

  const calculateStats = (attendanceData) => {
    const present = Object.values(attendanceData).filter(val => val === true).length
    const total = Object.keys(attendanceData).length
    setStats({
      present,
      absent: total - present,
      total
    })
  }

  const toggleAttendance = (employeeId) => {
    const newAttendance = {
      ...attendance,
      [employeeId]: !attendance[employeeId]
    }
    setAttendance(newAttendance)
    localStorage.setItem('attendance', JSON.stringify(newAttendance))
    calculateStats(newAttendance)
  }

  return (
    <div className='bg-gradient-to-br from-cyan-600 to-blue-600 p-6 rounded-xl shadow-lg mb-5'>
      <div className='flex items-center justify-between mb-5'>
        <h2 className='text-2xl font-bold text-white flex items-center gap-2'>
          <span className='text-3xl'>📋</span>
          Attendance Tracker
        </h2>
        <div className='flex gap-3'>
          <div className='bg-green-500/80 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-bold shadow-md'>
            <span className='text-sm'>✅ Present:</span>
            <span className='text-xl ml-2'>{stats.present}</span>
          </div>
          <div className='bg-red-500/80 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-bold shadow-md'>
            <span className='text-sm'>❌ Absent:</span>
            <span className='text-xl ml-2'>{stats.absent}</span>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto pr-2'>
        {employees.map(emp => (
          <div
            key={emp.id}
            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer ${
              attendance[emp.id]
                ? 'bg-green-500/20 border-2 border-green-400'
                : 'bg-red-500/20 border-2 border-red-400'
            }`}
            onClick={() => toggleAttendance(emp.id)}
          >
            <div className='flex items-center gap-3'>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md ${
                  attendance[emp.id] ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {emp.firstName.charAt(0)}
              </div>
              <div>
                <p className='text-white font-semibold'>{emp.firstName}</p>
                <p className='text-xs text-white/70'>ID: {emp.id}</p>
              </div>
            </div>
            <div className='text-2xl'>
              {attendance[emp.id] ? '✅' : '❌'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AttendanceTracker
