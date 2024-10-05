import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firestore } from '../../firebaseConfig';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles
import './AddBlogForm.scss';

const AddBlog = () => {
  const { isAuthenticated } = useAuth();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress

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
        console.error('Error uploading file: ', error);
        alert('Error uploading image. Please try again.');
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            await addDoc(collection(firestore, 'blogs'), {
              title: title.trim(),
              description: description.trim(), // Storing HTML content from Quill
              category: category.trim(),
              src: downloadURL,
              createdAt: serverTimestamp(),
            });

            setTitle('');
            setDescription('');
            setCategory('');
            setImage(null);
            setUploadProgress(0); // Reset progress
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

  // Define custom toolbar options
  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }], // Add color and background color
      [{ 'align': [] }],
      ['clean'], // Remove formatting button
    ]
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image',
    'color', 'background',
    'align',
  ];

  return (
    <div className="container text-white" style={{ paddingTop: '100px' }}>
      <h2 style={{ color: 'red' }}>Add New Blog</h2>
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
          <ReactQuill
            id="description"
            className="form-control"
            value={description}
            onChange={(value) => setDescription(value)}
            modules={modules} // Add custom modules
            formats={formats} // Add custom formats
            required
            style={{ height: '400px', paddingBottom:'55px' }}
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
        {uploadProgress > 0 && (
          <div className="form-group">
            <label>Upload Progress:</label>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${uploadProgress}%` }}
                aria-valuenow={uploadProgress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {Math.round(uploadProgress)}%
              </div>
            </div>
          </div>
        )}
        <button type="submit" className="btn form-control" style={{ backgroundColor: '#7ced03' }}>
          Add Blog
        </button>
      </form>
      <hr/>
      <div className="preview mt-5 text-white">
        <h2>Blog Preview</h2>
        <h3>{title}</h3>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
        <p>Category: {category}</p>
        {image && (
          <div>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ maxWidth: '100%' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBlog;

// Update  the `AddBlog` component to use the `useState` hook to store the image file and the