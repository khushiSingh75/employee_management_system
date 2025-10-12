import React from 'react'

const ExportButtons = ({ employees }) => {
  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,"
    csvContent += "ID,Name,Email,Total Tasks,New Tasks,Active Tasks,Completed Tasks,Failed Tasks\n"
    
    employees.forEach(emp => {
      csvContent += `${emp.id},${emp.firstName},${emp.email},${emp.tasks.length},${emp.taskCount.newTask},${emp.taskCount.active},${emp.taskCount.completed},${emp.taskCount.failed}\n`
    })
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `employee_data_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToPDF = () => {
    // Create a simple HTML content for printing
    const printWindow = window.open('', '', 'height=600,width=800')
    
    let htmlContent = `
      <html>
        <head>
          <title>Employee Management Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            h1 {
              text-align: center;
              color: #FFD700;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            }
            table {
              width: 100%;
              border-collapse: collapse;
              background: white;
              color: #333;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            }
            th {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 12px;
              text-align: left;
            }
            td {
              padding: 10px;
              border-bottom: 1px solid #ddd;
            }
            tr:hover {
              background: #f5f5f5;
            }
            .header-info {
              background: rgba(255,255,255,0.1);
              padding: 15px;
              border-radius: 10px;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <h1>🏢 Employee Management System Report</h1>
          <div class="header-info">
            <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Total Employees:</strong> ${employees.length}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Total Tasks</th>
                <th>New</th>
                <th>Active</th>
                <th>Completed</th>
                <th>Failed</th>
              </tr>
            </thead>
            <tbody>
    `
    
    employees.forEach(emp => {
      htmlContent += `
        <tr>
          <td>${emp.id}</td>
          <td>${emp.firstName}</td>
          <td>${emp.email}</td>
          <td><strong>${emp.tasks.length}</strong></td>
          <td>${emp.taskCount.newTask}</td>
          <td>${emp.taskCount.active}</td>
          <td>${emp.taskCount.completed}</td>
          <td>${emp.taskCount.failed}</td>
        </tr>
      `
    })
    
    htmlContent += `
            </tbody>
          </table>
        </body>
      </html>
    `
    
    printWindow.document.write(htmlContent)
    printWindow.document.close()
    printWindow.focus()
    
    setTimeout(() => {
      printWindow.print()
    }, 250)
  }

  return (
    <div className='flex gap-3 justify-end mb-5'>
      <button
        onClick={exportToCSV}
        className='bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2'
      >
        <span className='text-xl'>📊</span>
        <span>Export to CSV</span>
      </button>
      
      <button
        onClick={exportToPDF}
        className='bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2'
      >
        <span className='text-xl'>📄</span>
        <span>Export to PDF</span>
      </button>
    </div>
  )
}

export default ExportButtons
