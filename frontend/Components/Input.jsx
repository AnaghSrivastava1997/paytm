import React from 'react';

export default function Input({ name, heading, placeholder, onChange, value, type = "text" }) {
    return (
        <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {heading}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                required
                onChange={onChange}
                value={value} // Bind the input value to the state in the parent component
            />
        </div>
    );
}
