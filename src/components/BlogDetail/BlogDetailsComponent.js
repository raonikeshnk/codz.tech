import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import blogsData from "../../data/blogs";
import "./BlogDetail.scss";

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogsData.find(blog => blog.id === parseInt(id));
  const blogIndex = blogsData.findIndex(blog => blog.id === parseInt(id));
  const previousBlog = blogsData[blogIndex - 1];
  const nextBlog = blogsData[blogIndex + 1];

  // Fetch all blogs for the related blogs carousel
  const relatedBlogs = blogsData.filter(b => b.id !== blog.id);
  const [currentIndex, setCurrentIndex] = useState(0);

  const showPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : relatedBlogs.length - 1));
  };

  const showNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < relatedBlogs.length - 1 ? prevIndex + 1 : 0));
  };

  const getDisplayedBlogs = () => {
    const startIndex = currentIndex;
    const endIndex = startIndex + 3;
    if (endIndex <= relatedBlogs.length) {
      return relatedBlogs.slice(startIndex, endIndex);
    } else {
      return relatedBlogs.slice(startIndex).concat(relatedBlogs.slice(0, endIndex - relatedBlogs.length));
    }
  };

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const displayedBlogs = getDisplayedBlogs();

  return (
    <div className="blog-detail container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/blog">Blogs</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{blog.title}</li>
        </ol>
      </nav>

      <h1 className="blog-title">{blog.title}</h1>
      <span className="blog-category">Category: <b>{blog.category}</b> Published on: <b>{new Date(blog.createdAt).toLocaleDateString()}</b></span>
      <img src={blog.src} className="blog-img mt-4" alt={blog.title} />
      <p className="blog-description">{blog.longDescription}</p>
      <div className="navigation">
        {previousBlog && (
          <Link to={`/blog/${previousBlog.id}`} className="btn btn-secondary mr-2">
            Previous
          </Link>
        )}
        {nextBlog && (
          <Link to={`/blog/${nextBlog.id}`} className="btn btn-secondary">
            Next
          </Link>
        )}
      </div>

      <h3 className="related-title mt-5">Related Blogs</h3>
      <div className="carousel-container mb-5">
        <div className="carousel-inner">
          <div className="row">
            {displayedBlogs.map((relatedBlog, index) => (
              <div className="col-md-4" key={index}>
                <Link to={`/blog/${relatedBlog.id}`} className="related-blog-link">
                  <img src={relatedBlog.src} className="related-blog-img d-block w-100 rounded" alt={relatedBlog.title} />
                  <div className="carousel-caption d-none d-md-block">
                    <h5 className="related-blog-title">{relatedBlog.title}</h5>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-control-prev" role="button" onClick={showPrevious}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </button>
        <button className="carousel-control-next" role="button" onClick={showNext}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;
