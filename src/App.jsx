import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { getLocalStorage, setLocalStorage } from './utils/localStorage'
import { AuthContext } from './context/AuthProvider'


const App = () => {
  const [user, setUser] = useState(null)
  const [loggedInUserData, setloggedInUserData] = useState(null)
  const [userData, setUserData] = useContext(AuthContext);
  
  useEffect(() => {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if(loggedInUser){
        const parsedUser = JSON.parse(loggedInUser);
        setUser(parsedUser.role);
        
        // If employee, get fresh data from employees list
        if(parsedUser.role === 'employee' && parsedUser.data && userData){
          const freshEmployee = userData.find(emp => emp.id === parsedUser.data.id);
          if(freshEmployee){
            setloggedInUserData(freshEmployee);
          } else {
            setloggedInUserData(parsedUser.data);
          }
        } else if(parsedUser.data) {
          setloggedInUserData(parsedUser.data);
        }
      }
  }, [userData]);
  
  const handleLogin = (email, password, setError) => {
    if(email === 'admin@me.com' && password === '123'){
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({role: 'admin'}))
    } else if(userData){
      const employee = userData.find((e) => email === e.email && password === e.password);

      if(employee){
        setUser('employee')
        setloggedInUserData(employee);
        localStorage.setItem('loggedInUser', JSON.stringify({role: 'employee', data : employee}))
      } else {
        if(setError) {
          setError("Invalid email or password. Please check your credentials.");
        } else {
          alert("Invalid credentials");
        }
      }
    } else {
      if(setError) {
        setError("Unable to load user data. Please try again.");
      } else {
        alert("Invalid credentials");
      }
    } 
  }
  return (
    <>
    {!user ? <Login handleLogin={handleLogin}/> : ''}
    {user === 'admin' ? <AdminDashboard changeUser={setUser}/> : (user === 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData}/> : null)}
    </>
  )
}
export default App;
