import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Products from './components/Products';
import Gallery from './components/Gallery';
import Header from './components/Header';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import AddProductPage from './components/ProductAdd';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarToggle, setSidebarToggle] = useState(false);

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <Router>
      <div className='flex'>
        <Sidebar sidebarToggle={sidebarToggle} />
        <div className={`${sidebarToggle ? "" : "ml-64"} w-full`}>
          <Dashboard sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products/>} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/header" element={<Header />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/add" element={<AddProductPage/>}  />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
