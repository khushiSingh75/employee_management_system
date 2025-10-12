import React, { useState } from 'react'
import { showToast } from '../../utils/toast'

const NewTask = ({data, onTaskUpdate, employeeId}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    if (!onTaskUpdate) return;
    
    setIsLoading(true);
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 500));
      onTaskUpdate(employeeId, data.title, 'accepted');
      showToast(`Task "${data.title}" accepted successfully!`, 'success');
    } catch (error) {
      console.error('Error accepting task:', error);
      showToast('Failed to accept task. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex-shrink-0 h-full w-[300px] p-5 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-purple-400'>
        <div className='flex justify-between items-center'>
          <h3 className='bg-red-600 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md'>{data.category}</h3>
          <h4 className='text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm'>{data.date}</h4>
        </div>
        <div className='flex items-center gap-2 mt-3'>
          <span className='text-2xl'>🆕</span>
          <span className='bg-yellow-400 text-purple-900 px-2 py-1 rounded-full text-xs font-bold animate-pulse'>NEW</span>
        </div>
        <h2 className='mt-3 text-2xl font-bold text-white drop-shadow-lg'>{data.title}</h2>
        <p className='text-sm mt-2 text-white/90 leading-relaxed line-clamp-3'>{data.description}</p>
        <div className='mt-4 flex gap-2'>
          <button 
            onClick={handleAccept}
            disabled={isLoading}
            className={`flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Accepting...</span>
              </>
            ) : (
              <>
                <span>✓</span>
                <span>Accept</span>
              </>
            )}
          </button>
          <button className='bg-white/20 hover:bg-white/30 text-white py-2 px-3 rounded-lg text-sm backdrop-blur-sm transition-all duration-200'>
            ℹ️
          </button>
        </div>
      </div>
  )
}

export default NewTask