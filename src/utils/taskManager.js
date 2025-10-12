// Task management utilities
export const updateTaskStatus = (employeeId, taskTitle, newStatus, userData, setUserData) => {
  if (!userData) return;

  const updatedUserData = userData.map(employee => {
    if (employee.id === employeeId) {
      const updatedTasks = employee.tasks.map(task => {
        if (task.title === taskTitle) {
          // Reset all status flags
          const updatedTask = {
            ...task,
            newTask: false,
            active: false,
            completed: false,
            failed: false
          };

          // Set the new status
          switch (newStatus) {
            case 'accepted':
              updatedTask.active = true;
              break;
            case 'completed':
              updatedTask.completed = true;
              break;
            case 'failed':
              updatedTask.failed = true;
              break;
            case 'retry':
              updatedTask.newTask = true;
              break;
            default:
              return task;
          }

          return updatedTask;
        }
        return task;
      });

      // Update task counts
      const newTaskCount = updatedTasks.reduce((counts, task) => {
        if (task.newTask) counts.newTask++;
        if (task.active) counts.active++;
        if (task.completed) counts.completed++;
        if (task.failed) counts.failed++;
        return counts;
      }, { newTask: 0, active: 0, completed: 0, failed: 0 });

      return {
        ...employee,
        tasks: updatedTasks,
        taskCount: newTaskCount
      };
    }
    return employee;
  });

  // Update localStorage
  localStorage.setItem("employees", JSON.stringify(updatedUserData));
  
  // Update state
  setUserData(updatedUserData);
  
  return updatedUserData;
};

export const getEmployeeById = (userData, employeeId) => {
  return userData?.find(employee => employee.id === employeeId);
};

export const getTaskByTitle = (employee, taskTitle) => {
  return employee?.tasks?.find(task => task.title === taskTitle);
};
