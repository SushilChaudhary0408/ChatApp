import React from 'react'
import User from './User';
import UseGetAllUsers from '../../context/UseGetAllUsers';

function Users() {
    const [allUsers, loading] = UseGetAllUsers();
    console.log(allUsers)
    return (
        <div>
            <h1 className='px-8 py-2 text-white font-semibold bg-slate-800 rounded-md'>Message</h1>
            <div className='py-2 no-scrollbar overflow-y-auto' style={{ maxHeight: "calc(80vh - 10vh)" }}>
                {allUsers.map((user, index) => (
                    <User key={index} user={user} />
    ))}
            </div>
        </div>
    )
}

export default Users;


