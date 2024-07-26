import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Header = () => {
    const [file, setFile] = useState(null);
    const [altText, setAltText] = useState('');
    const [logoId, setLogoId] = useState('');
    const [logos, setLogos] = useState([]);

    useEffect(() => {
        const fetchLogos = async () => {
            try {
                const response = await fetch('https://frontbis.onrender.com/logos');
                if (response.ok) {
                    const data = await response.json();
                    setLogos(data);
                } else {
                    const errorData = await response.json();
                    toast.error(errorData.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchLogos();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAltTextChange = (e) => {
        setAltText(e.target.value);
    };

    const handleLogoIdChange = (e) => {
        setLogoId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('logo', file);
        formData.append('altText', altText);

        try {
            const response = await fetch(`https://frontbis.onrender.com/update-logo/${logoId}`, {
                method: 'PUT',
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                // Refetch logos after updating
                const updatedLogos = await fetch('https://frontbis.onrender.com/logos').then(res => res.json());
                setLogos(updatedLogos);
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="logoId">
                        Select Logo to Update
                    </label>
                    <select
                        id="logoId"
                        value={logoId}
                        onChange={handleLogoIdChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select a logo</option>
                        {logos.map(logo => (
                            <option key={logo._id} value={logo._id}>
                                {logo.altText}
                            </option>
                        ))}
                    </select>
                </div>
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
                        Update Logo
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Header;
