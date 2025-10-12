import React, { useMemo } from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = React.memo(({data, onTaskUpdate}) => {
  const renderedTasks = useMemo(() => {
    return data.tasks.map((elem, idx)=>{
      if(elem.active){
        return <AcceptTask key={idx} data={elem} onTaskUpdate={onTaskUpdate} employeeId={data.id}/>
      } 
      if(elem.newTask){
        return <NewTask key={idx} data={elem} onTaskUpdate={onTaskUpdate} employeeId={data.id}/>
      }
      if(elem.completed){
        return <CompleteTask key={idx} data={elem} onTaskUpdate={onTaskUpdate} employeeId={data.id}/>
      }
      if(elem.failed){    
        return <FailedTask key={idx} data={elem} onTaskUpdate={onTaskUpdate} employeeId={data.id}/>
      }
      return null;
    })
  }, [data.tasks, data.id, onTaskUpdate]);

  return (
    <div id='tasklist' className='h-[55%] overflow-x-auto w-full py-5 flex items-center justify-start gap-5 flex-nowrap mt-10'>
     {renderedTasks}
    </div>
  )
})

export default TaskList