import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    instagram: '',
    facebook: '',
    pinterest: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentContactId, setCurrentContactId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://frontbis.onrender.com/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      toast.error('Failed to fetch contacts.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleContactClick = (contact) => {
    setFormData(contact);
    setIsUpdating(true);
    setCurrentContactId(contact._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `https://frontbis.onrender.com/updatecontact/${currentContactId}`;
      const method = 'PUT';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Contact updated successfully!');
        setFormData({
          name: '',
          email: '',
          mobile: '',
          instagram: '',
          facebook: '',
          pinterest: '',
        });
        setIsUpdating(false);
        setCurrentContactId(null);
        fetchContacts();
      } else {
        toast.error('Failed to update contact.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the contact.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.contactList}>
        {contacts.map((contact) => (
          <div key={contact._id} style={styles.contactItem} onClick={() => handleContactClick(contact)}>
            {contact.name}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <ToastContainer />
        <h2 style={styles.title}>Update Contact</h2>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="mobile" style={styles.label}>Mobile Number:</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="instagram" style={styles.label}>Instagram ID:</label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="facebook" style={styles.label}>Facebook ID:</label>
          <input
            type="text"
            id="facebook"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="pinterest" style={styles.label}>Pinterest ID:</label>
          <input
            type="text"
            id="pinterest"
            name="pinterest"
            value={formData.pinterest}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Update</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '20px',
  },
  contactList: {
    maxWidth: '300px',
    marginRight: '20px',
  },
  contactItem: {
    padding: '10px',
    margin: '5px 0',
    cursor: 'pointer',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    maxWidth: '600px',
    width: '100%',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
};

export default Contact;
