import React from 'react'
 
import Navbar from './Navbar'

const Dashboard = ({siderbarToggle ,setsiderbarToggle}) => {
  return (
     <div className={`w-full`}>
        <Navbar siderbarToggle={siderbarToggle}
      setsiderbarToggle={setsiderbarToggle} />
     </div>
     
  )
}

export default Dashboard
