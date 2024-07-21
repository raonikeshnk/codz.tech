// src/components/BlogDetail.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import "./BlogDetail.scss";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(firestore, "blogs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error('Error fetching blog: ', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div className="container">Blog not found</div>;
  }

  return (
    <div className="blog-detail container text-white">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="title-font">{blog.title}</h1>
          <p className="mt-3 mb-3">{new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2 text-center">
          <img src={blog.src} alt={blog.title} className="img-fluid" />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 col-md-8 offset-md-2">
          <p>{blog.description}</p>
          <div className="blog-long-description" dangerouslySetInnerHTML={{ __html: blog.longDescription }}></div>
          <span className="badge badge-secondary">Category: {blog.category}</span>
          <div className="d-flex justify-content-between my-4">
            <Link to="/blogs" className="btn btn-warning form-control">Back to Blogs</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
