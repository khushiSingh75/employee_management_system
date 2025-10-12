import React, { useState, useCallback, useMemo } from 'react'

const FilterPanel = ({ employees, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  // Memoize the search handler to prevent unnecessary re-renders
  const handleSearch = useCallback((searchValue, shouldClearInput = false) => {
    if (isSearching) return // Prevent multiple simultaneous searches
    
    setIsSearching(true)
    
    // Debounce the search to prevent too many calls
    setTimeout(() => {
      onFilterChange({ search: searchValue })
      setIsSearching(false)
      
      // Clear input field after search if requested
      if (shouldClearInput && searchValue.trim()) {
        setSearchTerm('')
      }
    }, 100)
  }, [isSearching, onFilterChange])

  const handleSearchChange = useCallback((e) => {
    let value = e.target.value
    
    // Capitalize first letter if it looks like a name
    if (value.length > 0 && /^[a-z]/.test(value)) {
      value = value.charAt(0).toUpperCase() + value.slice(1)
    }
    
    setSearchTerm(value)
    // Only trigger search if there's a meaningful change
    if (value.trim() !== searchTerm.trim()) {
      handleSearch(value)
    }
  }, [searchTerm, handleSearch])

  const handleSearchButtonClick = useCallback(() => {
    if (!isSearching && searchTerm.trim()) {
      handleSearch(searchTerm, true) // Clear input after search
    }
  }, [searchTerm, handleSearch, isSearching])

  const handleClearSearch = useCallback(() => {
    setSearchTerm('')
    handleSearch('')
  }, [handleSearch])

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !isSearching && searchTerm.trim()) {
      e.preventDefault()
      handleSearch(searchTerm, true) // Clear input after search
    }
  }, [searchTerm, handleSearch, isSearching])

  const getSearchResults = useMemo(() => {
    if (!searchTerm || !employees) return 0
    
    return employees.filter(emp =>
      emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toString().includes(searchTerm)
    ).length
  }, [searchTerm, employees])

  // SVG Search Icon Component
  const SearchIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )

  // SVG Clear Icon Component
  const ClearIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )

  return (
    <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-xl shadow-lg mb-6'>
      <div className='flex flex-col gap-4'>
        <h3 className='text-white font-bold text-lg flex items-center gap-2'>
          <SearchIcon className="w-6 h-6 text-white" />
          Search & Filter Employees
        </h3>
        <div className='flex flex-col md:flex-row gap-4 items-center'>
          <div className='flex-1 w-full'>
            <div className='relative'>
              <div className='absolute left-3 top-3 text-gray-600'>
                <SearchIcon className="w-5 h-5" />
              </div>
              <input
                type='text'
                placeholder='Type employee name (e.g., Aarav), ID (e.g., 1), or email... Press Enter to search'
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                className='w-full pl-12 pr-16 py-3 rounded-lg bg-white border-2 border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 text-base font-medium'
                style={{ color: '#000000', fontSize: '16px' }}
              />
              <div className='absolute right-2 top-2 flex gap-1'>
                {searchTerm && (
                  <button
                    onClick={handleClearSearch}
                    className='text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition-all duration-200'
                    title='Clear search'
                  >
                    <ClearIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className='flex gap-2'>
            {/* <button
              onClick={handleSearchButtonClick}
              disabled={isSearching || !searchTerm.trim()}
              className={`bg-white hover:bg-gray-100 text-purple-700 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 min-w-[140px] justify-center border-2 border-purple-200 hover:border-purple-300 ${isSearching || !searchTerm.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <SearchIcon className="w-4 h-4" />
                  <span>Find Employee</span>
                </>
              )}
            </button> */}
            <button
  onClick={handleSearchButtonClick}
  className={` hover:bg-gray-400 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 min-w-[140px] justify-center border-2 border-purple-200 hover:border-purple-300`}
>
  {isSearching ? (
    <>
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
      <span>Searching...</span>
    </>
  ) : (
    <>
      <SearchIcon className="w-4 h-4" />
      <span>Find Employee</span>
    </>
  )}
</button>

          </div>
        </div>
        
        {searchTerm && (
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2'>
              <span className='text-sm font-medium'>
                Found <span className='font-bold text-yellow-300'>{getSearchResults}</span> results for "<span className='font-bold'>{searchTerm}</span>"
              </span>
            </div>
            
            {/* Quick Search Suggestions */}
            <div className='flex flex-wrap gap-2'>
              <span className='text-white/70 text-sm'>Quick search:</span>
              {employees?.slice(0, 5).map((emp, idx) => (
                <button
                  key={`quick-${emp.id}`}
                  onClick={() => {
                    setSearchTerm(emp.firstName)
                    handleSearch(emp.firstName, true) // Clear input after search
                  }}
                  className='bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-xs transition-all duration-200 hover:scale-105'
                >
                  {emp.firstName} ({emp.taskCount.completed}✓)
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterPanel
