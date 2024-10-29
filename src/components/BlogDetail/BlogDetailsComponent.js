// src/components/BlogDetail.js
import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { doc, getDoc, collection, getDocs, query, orderBy } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./BlogDetail.scss";

const BlogDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [nextBlogId, setNextBlogId] = useState(null);
  const [prevBlogId, setPrevBlogId] = useState(null);

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

    const fetchBlogs = async () => {
      try {
        const q = query(collection(firestore, "blogs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const blogList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogList);

        const currentIndex = blogList.findIndex(blog => blog.id === id);
        if (currentIndex !== -1) {
          setNextBlogId(currentIndex < blogList.length - 1 ? blogList[currentIndex + 1].id : null);
          setPrevBlogId(currentIndex > 0 ? blogList[currentIndex - 1].id : null);
        }
      } catch (error) {
        console.error('Error fetching blogs: ', error);
      }
    };

    fetchBlog();
    fetchBlogs();
  }, [id]);

  if (!blog) {
    return <div className="container">Blog not found</div>;
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="blog-detail container text-white">
      <div className="row">
        <div className="col-12 text-left">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/blogs">Blogs</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{blog.title}</li>
            </ol>
          </nav>
        </div>
        <div className="col-12 text-center">
          <h1 className="title-font">{blog.title}</h1>
          <div className="d-flex justify-content-center my-4">
            <p className="me-2">Published: <span className="bg-warning p-1 rounded-1">{new Date(blog.createdAt.seconds * 1000).toLocaleDateString()}</span></p>
            <p >Category: <span className="bg-danger p-1 rounded-1">{blog.category}</span></p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <div className="image-container">
            <img src={blog.src || "https://via.placeholder.com/250"} alt={blog.title} className="img-fluid responsive-image" />
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 col-md-8 offset-md-2">
          <div className="blog-short-description text-justify" dangerouslySetInnerHTML={{ __html: blog.description }}></div>
          {/* <div className="d-flex justify-content-between my-4">
            <Link to="/blogs" className="btn btn-warning form-control">Back to Blogs</Link>
          </div> */}
          {/* <div className="d-flex justify-content-between my-4">
            {prevBlogId && <button className="btn btn-primary" onClick={() => history.push(`/blog/${prevBlogId}`)}>Previous</button>}
            {nextBlogId && <button className="btn btn-primary" onClick={() => history.push(`/blog/${nextBlogId}`)}>Next</button>}
          </div> */}
          <div className="navigation-buttons my-4">
            {prevBlogId && <button className="btn btn-danger" onClick={() => history.push(`/blog/${prevBlogId}`)}>Previous</button>}
            {nextBlogId && <button className="btn btn-danger" onClick={() => history.push(`/blog/${nextBlogId}`)}>Next</button>}
          </div>
          <h3 className="text-center my-4">More Blogs</h3>
          <Carousel responsive={responsive}>
            {blogs.map((b) => (
              // <Link to={`/blog/${b.id}`}>
              // <div key={b.id} className="p-2">
              //   <img src={b.src} alt={b.title} className="img-fluid" />
              //   <p>{b.title.slice(0,30)}...</p>
              //   {/* <p>{b.description.slice(0, 100)}...</p> */}
              // </div>
              // </Link>
              <div key={b.id} className="carousel-item-wrapper">
                <Link to={`/blog/${b.id}`}>
                  <div className="carousel-item mb-5">
                    <img src={b.src || "https://via.placeholder.com/250"} alt={b.title} className="img-fluid" />
                    <div className="carousel-title-overlay">
                      <p>{b.title}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Carousel>

        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

// Update