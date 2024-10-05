import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.scss'; // Make sure your custom cursor styles are in App.scss
import Footer from 'components/Footer';
import Navbar from 'components/Navbar/Navbar';
import Contact from 'pages/Contact';
import HomePage from 'pages/HomePage';
import OurTeam from 'pages/OurTeam';
import PortfolioDetail from 'pages/PortfolioDetail';
import Services from 'pages/Services';
import Works from 'pages/Works';
import Blogs from 'pages/Blogs';
import BlogDetail from 'components/BlogDetail/BlogDetailsComponent';
import Login from 'pages/Login';  // Add the Login page import
import AddBlog from 'components/BlogDetail/AddBlogForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import CustomCursor from 'components/CustomCursor';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Navbar />
          <CustomCursor />
          <div className="App">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/services" component={Services} />
              <Route exact path="/works" component={Works} />
              <Route exact path="/works/:id" component={PortfolioDetail} />
              <Route exact path="/team" component={OurTeam} />
              <Route exact path="/blogs" component={Blogs} />
              <Route path="/blog/:id" component={BlogDetail} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/add-blog" component={AddBlog} />
            </Switch>
            <Footer />
          </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;