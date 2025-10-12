import React, { useContext, useState } from 'react'
import NewTask from '../components/TaskList/NewTask'
import { AuthContext } from '../context/AuthProvider'

const CreateTask = () => {
  const [userData, setUserData]= useContext(AuthContext)
  const [taskTitle, settaskTitle] = useState('')
  const [taskDescription, settaskDescription] = useState('')
  const [taskDate, settaskDate] = useState('')
  const [assignTo, setassignTo] = useState('')
  const [category, setcategory] = useState('')

  const [newTask, setNewTask] = useState({})

    const submitHandler = (e) =>{
   e.preventDefault()
   
      const task = {
     title: taskTitle,
     description: taskDescription,
     date: taskDate,
     category: category,
     active: false,
     newTask: true,
     failed: false,
     completed: false
   }

   // Create a deep copy of userData to trigger React re-render
   const data = userData.map(elem => {
     if(assignTo === elem.firstName){
       return {
         ...elem,
         tasks: [...elem.tasks, task],
         taskCount: {
           ...elem.taskCount,
           newTask: elem.taskCount.newTask + 1
         }
       }
     }
     return elem;
   });
   
   setUserData(data);
   
   // Update localStorage to persist the changes
   localStorage.setItem('employees', JSON.stringify(data));
   console.log('Task added successfully:', data);

   // Reset form fields
   settaskTitle('')
   setcategory('')
   setassignTo('')
   settaskDate('')
   settaskDescription('')
  }
  return (
    <div className='p-6 bg-gradient-to-br from-gray-800 to-gray-900 mt-7 rounded-xl shadow-2xl border-2 border-purple-500/30'>
      <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-2'>
        <span className='text-3xl'>➕</span>
        Create New Task
      </h2>
        <form 
        onSubmit={(e)=>{
          submitHandler(e)
          // console.log(taskTitle, taskDescription, taskDate, assignTo, category)
        }}
         className='flex flex-wrap w-full items-start justify-between'>
          <div className='w-1/2'>
          
                    <div className='mb-4'>
          <h3 className='text-sm text-white font-semibold mb-2 flex items-center gap-2'>
            <span>📝</span> Task Title
          </h3>
          <input value={taskTitle} onChange={(e)=>{settaskTitle(e.target.value)}}
           className='text-sm py-3 px-4 w-4/5 rounded-lg outline-none bg-purple-900/30 border-2 border-purple-500/50 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-200' 
           type='text' placeholder='Make a UI design' required></input>
          </div>
          <div className='mb-4'>
          <h3 className='text-sm text-white font-semibold mb-2 flex items-center gap-2'>
            <span>📅</span> Date
          </h3>
          <input value={taskDate} onChange={(e)=>{settaskDate(e.target.value)}}
           className='text-sm py-3 px-4 w-4/5 rounded-lg outline-none bg-purple-900/30 border-2 border-purple-500/50 text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-200' 
           type='date' required></input>
          </div>
          <div className='mb-4'>
          <h3 className='text-sm text-white font-semibold mb-2 flex items-center gap-2'>
            <span>👤</span> Assign to
          </h3>
          <input value={assignTo} onChange={(e)=>{setassignTo(e.target.value)}}
           className='text-sm py-3 px-4 w-4/5 rounded-lg outline-none bg-purple-900/30 border-2 border-purple-500/50 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-200'  
           type="text" placeholder='Employee name (e.g., Aarav, Riya)' required />
          </div> 
           <div className='mb-4'>
          <h3 className='text-sm text-white font-semibold mb-2 flex items-center gap-2'>
            <span>🏷️</span> Category
          </h3>
          <input value={category} onChange={(e)=>{setcategory(e.target.value)}}
           className='text-sm py-3 px-4 w-4/5 rounded-lg outline-none bg-purple-900/30 border-2 border-purple-500/50 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-200'  
           type="text" placeholder='Design, Development, Marketing, etc.' required></input>
           </div>
          </div>
          
                    <div className='w-2/5 flex flex-col items-start'>
            <h3 className='text-sm text-white font-semibold mb-2 flex items-center gap-2'>
              <span>💬</span> Description
            </h3>
          <textarea value={taskDescription} onChange={(e)=>{settaskDescription(e.target.value)}}
           className='w-full h-44 text-sm p-4 rounded-lg outline-none bg-purple-900/30 border-2 border-purple-500/50 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-200' 
           placeholder='Describe the task in detail...' name='' id='' required></textarea>
          <button className='bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 py-3 px-5 rounded-lg text-base font-bold text-white mt-4 w-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2'>
            <span>✨</span>
            Create Task
          </button>
          </div> 

        </form>
      </div>
  )
}

export default CreateTask