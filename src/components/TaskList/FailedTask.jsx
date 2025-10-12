import React, { useState } from 'react'
import { showToast } from '../../utils/toast'

const FailedTask = ({data, onTaskUpdate, employeeId}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRetry = async () => {
    if (!onTaskUpdate) return;
    
    setIsLoading(true);
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 500));
      onTaskUpdate(employeeId, data.title, 'retry');
      showToast(`Task "${data.title}" has been queued for retry! 🔄`, 'success');
    } catch (error) {
      console.error('Error retrying task:', error);
      showToast('Failed to retry task. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <div className='flex-shrink-0 h-full w-[300px] p-5 bg-gradient-to-br from-red-500 to-red-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-red-400 opacity-90'>
        <div className='flex justify-between items-center'>
          <h3 className='bg-red-900 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md'>{data.category}</h3>
          <h4 className='text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm'>{data.date}</h4>
        </div>
        <div className='flex items-center gap-2 mt-3'>
          <span className='text-2xl'>⚠️</span>
          <span className='bg-yellow-400 text-red-900 px-2 py-1 rounded-full text-xs font-bold'>FAILED</span>
        </div>
        <h2 className='mt-3 text-2xl font-bold text-white drop-shadow-lg'>{data.title}</h2>
        <p className='text-sm mt-2 text-white/90 leading-relaxed line-clamp-3'>{data.description}</p>
        <div className='mt-4 flex gap-2'>
          <button 
            onClick={handleRetry}
            disabled={isLoading}
            className={`flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Retrying...</span>
              </>
            ) : (
              <>
                <span>🔄</span>
                <span>Retry</span>
              </>
            )}
          </button>
          <button className='flex-1 bg-white/20 hover:bg-white/30 text-white py-2 px-3 rounded-lg text-sm backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2'>
            <span>📝</span>
            <span>Report</span>
          </button>
        </div>
      </div>
  )
}

export default FailedTask