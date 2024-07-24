 // components/MapModal.js
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const MapModal = () => {
  const [embedCode, setEmbedCode] = useState('');

  useEffect(() => {
    fetchMapEmbed();
  }, []);

  const fetchMapEmbed = async () => {
    try {
      const response = await fetch('https://frontbis.onrender.com/map');
      const data = await response.json();
      setEmbedCode(data.embedCode || '');
    } catch (error) {
      toast.error('Failed to fetch map embed code.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://frontbis.onrender.com/update-map', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ embedCode }),
      });
      
      const result = await response.json();
      console.log('Update response:', result); // Log the response
  
      if (response.ok) {
        toast.success('Map embed code updated successfully!');
      } else {
        toast.error('Failed to update map embed code.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the map embed code.');
    }
  };

  return (
    <div className="map-modal-content">
      <ToastContainer />
      <h2>Update Google Map Embed Code</h2>
      <form onSubmit={handleUpdate}>
        <textarea
          rows="5"
          value={embedCode}
          onChange={(e) => setEmbedCode(e.target.value)}
          placeholder="Paste your updated Google Map embed code here"
          required
        ></textarea>
        <button type="submit">Update</button>
      </form>
      <style jsx>{`
        .map-modal-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          width: 80%;
          max-width: 600px;
          margin: 20px auto;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        textarea {
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
        }
        button[type="submit"] {
          background-color: #007bff;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default MapModal;
