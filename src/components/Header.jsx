import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Header = () => {
    const [file, setFile] = useState(null);
    const [altText, setAltText] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAltTextChange = (e) => {
        setAltText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('logo', file);
        formData.append('altText', altText);

        try {
            const response = await fetch('http://localhost:4000/upload-logo', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
             console.log("logo", response)
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="logo">
                        Logo
                    </label>
                    <input
                        type="file"
                        id="logo"
                        onChange={handleFileChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="altText">
                        Alt Text
                    </label>
                    <input
                        type="text"
                        id="altText"
                        value={altText}
                        onChange={handleAltTextChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Upload Logo
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Header;
