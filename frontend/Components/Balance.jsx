import React, { useState,useEffect } from 'react'
import axios from 'axios'

export default function Balance() {

    const [balance, setBalance] = useState("");

    useEffect(() => {
        // Function to fetch users

        const token = localStorage.getItem('token'); // Retrieve token from storage
        console.log(token);

        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        authorization: `Bearer ${token}`, // Add token to Authorization header
                    },
                });
                setBalance(response.data.balance); // Assuming response data has a `users` property
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers(); // Call the function
    }, []);


    return (
        <>
            <div className="flex">
                <div className="font-bold mr-72 text-lg">
                    Your balance
                </div>
                <div className="font-semibold ml-72 text-lg">
                    Rs {balance}
                </div>
            </div>
        </>
    )
}
