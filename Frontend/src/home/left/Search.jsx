
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { CiMenuFries } from 'react-icons/ci';
import useGetAllUsers from '../../context/UseGetAllUsers';
import useConversation from '../../zustand/useConversation';
import toast from 'react-hot-toast';

function Search() {
    const [search, setSearch] = useState("");
    const [allUsers] = useGetAllUsers();
    const { setSelectedConversation } = useConversation();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        const conversation = allUsers.find((user) =>
            user.fullname?.toLowerCase().includes(search.toLowerCase()));
        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else {
            toast.error("User not found");
        }
    };

    return (
        <div className='h-[10vh]'>
            <div className=' py-4 flex items-center'>
                <label htmlFor="my-drawer-2" className='btn btn-ghost drawer-button lg:hidden absolute left-5'>
                    <CiMenuFries className='text-white text-xl' />
                </label>
                <form onSubmit={handleSubmit} className='flex-grow ml-16'>
                    <div className='flex space-x-3'>
                        <label className="border-[1px] rounded-lg p-3 bg-slate-900 border-gray-700 flex items-center gap-2 w-full">
                            <input
                                type="text"
                                className="grow outline-none bg-transparent"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </label>
                        <button>
                            <FaSearch className='text-5xl p-2 hover:bg-gray-600 rounded-full duration-300' />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Search;
