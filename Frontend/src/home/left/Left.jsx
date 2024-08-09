import React from 'react'
import Search from './Search'
import Users from './Users'
import LogOut from './LogOut'
function Left() {
  return (
    <div className='w-full flex flex-col gap-4 text-gray-300 bg-black'>
      <Search />
      <div className='overflow-hidden' style={{minHeight:"calc(80vh - 10vh)"}}>
        <Users />
      </div>
      <LogOut />
    </div>
  )
}

export default Left
