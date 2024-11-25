import React, { useState,useEffect } from 'react'
import Button from '../Components/Button'

import axios from 'axios';

export default function Users() {

    const [users, setUser] = useState([]);


    useEffect(() => {
        // Function to fetch users

        const token = localStorage.getItem('token'); // Retrieve token from storage
        console.log(token);

        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/usersdata", {
                    headers: {
                        authorization: `Bearer ${token}`, // Add token to Authorization header
                    },
                });
                setUser(response.data.users); // Assuming response data has a `users` property
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers(); // Call the function
    }, []); // Empty dependency array ensures this runs only once after the component mounts



    return (
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
            </div>
            <div>
                {users.map(user => <User user={user} />)}
            </div>
        </>

    )
}

function User({ user }) {
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.First_Name[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.First_Name} {user.Second_Name}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button buttonName={"Send Money"} />
        </div>
    </div>
}
