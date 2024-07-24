import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const UpdateAboutUsForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Fetch existing About Us information
    const fetchAboutUs = async () => {
      try {
        const response = await fetch('https://frontbis.onrender.com/about-us');
        const result = await response.json();
        if (response.ok) {
          setTitle(result.title);
          setDescription(result.description);
          setAddress(result.address);
        } else {
          toast.error('Failed to fetch About Us information.');
        }
      } catch (error) {
        toast.error('An error occurred while fetching About Us information.');
      }
    };

    fetchAboutUs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://frontbis.onrender.com/about-us', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, address }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('About Us information updated successfully!');
      } else {
        toast.error('Failed to update About Us information.');
      }
    } catch (error) {
      toast.error('An error occurred while updating About Us information.');
    }
  };

  return (
    <>
      <div className="update-about-us-form">
        <ToastContainer />
        <h2>Update About Us Information</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          ></textarea>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
          <button type="submit">Update</button>
        </form>
      </div>
      <style jsx>{`
        .update-about-us-form {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        h2 {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }
        input, textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          background-color: #007bff;
          color: white;
        }
      `}</style>
    </>
  );
};

export default UpdateAboutUsForm;
