import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.scss";
import Footer from "components/Footer";
import Navbar from "components/Navbar/Navbar";
import Contact from "pages/Contact";
import HomePage from "pages/HomePage";
import OurTeam from "pages/OurTeam";
import PortfolioDetail from "pages/PortfolioDetail";
import Services from "pages/Services";
import Works from "pages/Works";
import Blogs from "pages/Blogs";
import BlogDetail from "components/BlogDetail/BlogDetailsComponent";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch className="mt-5">
          <Route exact path="/" component={HomePage} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/works" component={Works} />
          <Route exact path={"/works/:id"} component={PortfolioDetail} />
          <Route exact path={"/team"} component={OurTeam} />
          <Route exact path="/blog" component={Blogs} />
          <Route path="/blog/:id" component={BlogDetail} />

        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
