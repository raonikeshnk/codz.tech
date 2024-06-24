import React from "react";
import { useParams } from "react-router-dom";
import blogsData from "../data/blogs";

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogsData.find(blog => blog.id === parseInt(id));

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card mt-5">
            <img src={blog.src} className="card-img-top" alt={blog.title} />
            <div className="card-body">
              <h2 className="card-title">{blog.title}</h2>
              <p className="card-text">{blog.description}</p>
              <span className="badge badge-secondary">Category: {blog.category}</span>
              <p className="card-text"><small className="text-muted">Published on: {new Date(blog.createdAt).toLocaleDateString()}</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
