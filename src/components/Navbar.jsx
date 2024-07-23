import React from 'react'
import { FaBars, FaBell, FaSearch } from 'react-icons/fa'

const Navbar = ({siderbarToggle, setsiderbarToggle}) => {
  return (
    <nav className='bg-gray-800 px-4 py-3 flex justify-between items-center '>
      <div className='flex items-center text-xl'>
        <FaBars className='text-white mr-4 cursor-pointer' onClick={()=>setsiderbarToggle(!siderbarToggle)} />
        <span className='text-white font-semibold'>BiztoIndia</span>
      </div>
      <div className='flex items-center gap-x-5'>
        <div className='relative'>
          <span className='absolute inset-y-0 left-0 flex items-center pl-2 pt-2 hidden md:block'>
            <FaSearch className='text-white' />
          </span>
          <input 
            type="text" 
            className='bg-gray-700 text-white rounded pl-10 pr-3 py-2 focus:outline-none focus:bg-gray-600 hidden md:block' 
            placeholder='Search...'
          />
        </div>
        <div> <FaBell className='w-6 h-6 ' /></div>
      </div>
    </nav>
  )
}

export default Navbar
