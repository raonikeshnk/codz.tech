import React, { Component } from "react";
import { Link } from "react-router-dom";
import blogsData from "../data/blogs";

class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: blogsData,
      sortBy: "title",
      sortOrder: "asc",
      filterBy: "all",
      currentPage: 1,
      blogsPerPage: 6,
    };
  }

  handleSort = (sortBy) => {
    let sortOrder = this.state.sortOrder;
    if (this.state.sortBy === sortBy) {
      sortOrder = sortOrder === "asc" ? "desc" : "asc";
    }
    this.setState(
      {
        sortBy,
        sortOrder,
      },
      this.sortBlogs
    );
  };

  handleFilter = (filterBy) => {
    this.setState({ filterBy, currentPage: 1 }, this.sortBlogs);
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  sortBlogs = () => {
    const { sortBy, sortOrder, filterBy } = this.state;
    let filteredBlogs = blogsData;

    // Apply filter
    if (filterBy !== "all") {
      filteredBlogs = filteredBlogs.filter((blog) => blog.category === filterBy);
    }

    // Apply sorting
    filteredBlogs.sort((a, b) => {
      if (sortBy === "title") {
        return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      } else if (sortBy === "date") {
        return sortOrder === "asc" ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "popularity") {
        return sortOrder === "asc" ? a.popularity - b.popularity : b.popularity - a.popularity;
      }
      return 0;
    });

    this.setState({ blogs: filteredBlogs });
  };

  render() {
    const { sortOrder, currentPage, blogsPerPage, blogs } = this.state;
    const categories = [...new Set(blogsData.map((blog) => blog.category))];

    // Get current blogs
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(blogs.length / blogsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <>
        <section className="portfolio text-white">
          <div className="container text-center">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="portfolio-title mb-5 mt-4">
                  <h1 className="title-font">Our Blogs</h1>
                  <p className="mt-4 mb-4 title-font-2">
                  Discover expertly crafted articles across technology, finance, lifestyle, health, and business.
                  </p>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-content-end mb-4">
                  <div className="dropdown mr-2">
                    <button
                      className="btn btn-outline-light dropdown-toggle px-5"
                      type="button"
                      id="sortDropdown"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Sort by{" "}
                      <i className={`bi ${sortOrder === "asc" ? "bi-sort-up" : "bi-sort-down"}`}></i>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="sortDropdown">
                      <button className="dropdown-item" onClick={() => this.handleSort("date")}>
                        Date
                      </button>
                      <button className="dropdown-item" onClick={() => this.handleSort("popularity")}>
                        Popularity
                      </button>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-light dropdown-toggle px-5"
                      type="button"
                      id="filterDropdown"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Filter by
                    </button>
                    <div className="dropdown-menu" aria-labelledby="filterDropdown">
                      <button className="dropdown-item" onClick={() => this.handleFilter("all")}>
                        All
                      </button>
                      {categories.map((category) => (
                        <button className="dropdown-item" key={category} onClick={() => this.handleFilter(category)}>
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {currentBlogs.map((blog) => (
                <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={blog.id}>
                  <div className="card bg-dark border-light">
                    <Link to={`/blog/${blog.id}`} className="text-decoration-none text-white">
                      <img src={blog.src} alt={blog.title} className="card-img-top" />
                      <div className="card-body">
                        <h2 className="card-title">{blog.title}</h2>
                        <p className="card-text">{blog.description}</p>
                        <span className="badge badge-secondary">Category: {blog.category}</span>
                        <p className="card-text"><small className="text-muted">Published on: {new Date(blog.createdAt).toLocaleDateString()}</small></p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
              <div className="col-12 mt-4">
                <nav aria-label="Blog Pagination" >
                  <ul className={`pagination pagination-dark justify-content-center text-white`}>
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => this.handlePageChange(currentPage - 1)}>&laquo;</button>
                    </li>
                    {pageNumbers.map((number) => (
                      <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
                        <button onClick={() => this.handlePageChange(number)} className="page-link">
                          {number}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === pageNumbers.length ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => this.handlePageChange(currentPage + 1)}>&raquo;</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Blogs;
