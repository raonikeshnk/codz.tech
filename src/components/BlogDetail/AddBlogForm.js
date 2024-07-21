import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firestore } from '../../firebaseConfig';

const AddBlog = () => {
  const { isAuthenticated } = useAuth();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image.');
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, `images/blogs/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // Error function ...
        console.error('Error uploading file: ', error);
        alert('Error uploading image. Please try again.');
      },
      async () => {
        // Complete function ...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            await addDoc(collection(firestore, 'blogs'), {
              title: title.trim(),
              description: description.trim(),
              category: category.trim(),
              src: downloadURL,
              createdAt: serverTimestamp(),
            });

            // Clear form fields after successful submission
            setTitle('');
            setDescription('');
            setCategory('');
            setImage(null);
            alert('Blog added successfully');
            history.push('/blogs');
          } catch (error) {
            console.error('Error adding document: ', error);
            alert('Error adding blog. Please try again.');
          }
        });
      }
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ paddingTop: '100px', height: '70vh' }}>
        <div className="alert alert-warning mt-5">
          You need to be logged in to add a blog. <Link to="/login">Login here</Link>.
        </div>
      </div>
    );
  }

  return (
    <div className="container text-white" style={{ paddingTop: '100px' }}>
      <h2 style={{color:'red'}}>Add New Blog</h2>
      <form onSubmit={handleSubmit} className='m-5 px-5'>
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
        <button type="submit" className="btn form-control " style={{backgroundColor:'#7ced03'}}>Add Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;
