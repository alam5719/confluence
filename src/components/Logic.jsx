import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import "./Logic.css";
import logo from '../assets/logo.webp';
const Logic = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [newFileDescription, setNewFileDescription] = useState("");

  // Fetch files from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/files")
      .then((res) => {
        setItems(res.data);
        if (res.data.length > 0) {
          setSelectedItem(res.data[0]);
        }
      })
      .catch((err) => console.error("Error fetching files:", err));
  }, []);

  // Create new file
  const handleSaveFile = () => {
    if (newFileName.trim()) {
      axios.post("http://localhost:5000/api/files", { name: newFileName, description: newFileDescription })
        .then((res) => {
          setItems([...items, res.data]);
          setSelectedItem(res.data);
          setIsCreating(false);
          setNewFileName("");
          setNewFileDescription("");
        })
        .catch((err) => console.error("Error saving file:", err));
    }
  };

  // Edit file
  const handleEditClick = () => {
    if (selectedItem) {
      setNewFileName(selectedItem.name);
      setNewFileDescription(selectedItem.description);
      setIsEditing(true);
    }
  };

  // Save Edited File
  const handleSaveEdit = () => {
    axios.put(`http://localhost:5000/api/files/${selectedItem._id}`, {
      name: newFileName,
      description: newFileDescription
    })
    .then((res) => {
      const updatedItems = items.map((item) => 
        item._id === selectedItem._id ? res.data : item
      );
      setItems(updatedItems);
      setSelectedItem(res.data);
      setIsEditing(false);
    })
    .catch((err) => console.error("Error updating file:", err));
  };

  // Delete file
  const handleDeleteFile = (id) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      axios.delete(`http://localhost:5000/api/files/${id}`)
        .then(() => {
          const updatedItems = items.filter(item => item._id !== id);
          setItems(updatedItems);
          setSelectedItem(updatedItems.length > 0 ? updatedItems[0] : null);
        })
        .catch((err) => console.error("Error deleting file:", err));
    }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo" onClick={() => navigate("/")}>
            <img src={logo} alt="Logo" className="navbar-logo" />
          </div>

          {/* Three Buttons After Logo */}

          <div className="bt-container">
          <button className="nav-btn" onClick={() => alert("Home Clicked")}>Home</button>
          <button className="nav-btn" onClick={() => alert("Help Clicked")}>Help</button>
          <button className="nav-btn" onClick={() => alert("About us Clicked")}>About us</button>
          </div>

          <div>
          <h1 className="name">Confluence</h1>
          </div>
        </div>
        <div className="nav-right">
          <input 
            type="text" 
            placeholder="Search for a file..." 
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="create-btn" onClick={() => setIsCreating(true)}>Create</button>
        </div>
      </nav>

      <div className="content-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Files</h2>
          <ul>
            {items.map((item) => (
              <li 
                key={item._id} 
                className={selectedItem?._id === item._id ? "active" : ""}
                onClick={() => setSelectedItem(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {isCreating ? (
            <>
              <input type="text" placeholder="Enter file name" value={newFileName} onChange={(e) => setNewFileName(e.target.value)} />
              <textarea placeholder="Enter file description" value={newFileDescription} onChange={(e) => setNewFileDescription(e.target.value)} />
              <button onClick={handleSaveFile}>Save</button>
              <button onClick={() => setIsCreating(false)}>Cancel</button>
            </>
          ) : isEditing ? (
            <>
              <input type="text" value={newFileName} onChange={(e) => setNewFileName(e.target.value)} />
              <textarea value={newFileDescription} onChange={(e) => setNewFileDescription(e.target.value)} />
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : selectedItem ? (
            <>
              <h1>{selectedItem.name}</h1>
              <p>{selectedItem.description}</p>
              <div className="b-container">
              <button className="edit-btn" onClick={handleEditClick}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteFile(selectedItem._id)}>Delete</button>
              </div>
            </>
          ) : <p>No files available</p>}
        </main>
      </div>
    </div>
  );
};

export default Logic;
