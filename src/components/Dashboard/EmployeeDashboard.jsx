import React, { useContext } from 'react'
import Header from '../../others/Header'
import TaskListNumbers from '../../others/TaskListNumbers'
import TaskList from '../TaskList/TaskList'
import { AuthContext } from '../../context/AuthProvider'
import { updateTaskStatus } from '../../utils/taskManager'

const EmployeeDashboard = (props) => {
  const [userData, setUserData] = useContext(AuthContext);

  const handleTaskUpdate = (employeeId, taskTitle, newStatus) => {
    updateTaskStatus(employeeId, taskTitle, newStatus, userData, setUserData);
  };

  return (
    <div className='p-10 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen'>
      <Header changeUser={props.changeUser} data={props.data}/>
      <TaskListNumbers data={props.data}/>
      <TaskList data={props.data} onTaskUpdate={handleTaskUpdate}/>
    </div>
  )
}

export default EmployeeDashboard