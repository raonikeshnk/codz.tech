import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from '../../firebaseConfig';

const AddBlog = () => {
  const { isAuthenticated } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      src: image ? URL.createObjectURL(image) : 'path/to/default/image.jpg',
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(firestore, 'blogs'), {
        title: newBlog.title,
        description: newBlog.description,
        category: newBlog.category,
        // src: newBlog.src,
        createdAt: serverTimestamp(),
      });
      // Clear form fields after successful submission
      setTitle('');
      setDescription('');
      setCategory('');
      setImage(null);
      alert('Blog added successfully');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error adding blog. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container my-5" style={{ paddingTop: '100px', height: '70vh' }}>
        <div className="alert alert-warning">
          You need to be logged in to add a blog. <Link to="/login">Login here</Link>.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ paddingTop: '100px' }}>
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;
