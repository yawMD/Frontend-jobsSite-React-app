import { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/style.css";
import "./assets/css/tailwindcss.css";

import Home from "./Pages/Home";
import Adminbar from "./Components/Adminbar";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import ChatComponent from "./Components/Chat";
import ErrorPage from "./Pages/404";
import Admin from "./Pages/Admin";
import AdminCategories from "./Pages/Admin/Categories";
import AdminUsers from "./Pages/Admin/Users";
import UserHome from "./Pages/User/Home";
import Messenger from "./Pages/User/Messenger";
import Register from "./Pages/Register";
import Explore from "./Pages/Explore";
import Login from "./Pages/Login";
import Footer from "./Components/Footer";
import AdminLogin from "./Pages/Admin/Login";
import AdminRegister from "./Pages/Admin/Register";
import Job from "./Pages/User/Job";
import JobApplications from "./Pages/User/Job/Applications";
import Portfolio from "./Pages/User/Portfolio";
import AllPortfolio from "./Pages/Portfolios";
import Interview from "./Pages/User/Interview";
import Services from "./Pages/Admin/Services";
import Service from "./Pages/Service";
import ServiceDetail from "./Pages/Service/ServiceDetail";
import Gallery from "./Pages/User/Gallery";
import Search from "./Pages/Search";
import VideoChat from "./Components/VideoChat";
import Activate from "./Pages/Activate";
import Employees from "./Pages/User/Job/Employees";
import Projects from "./Pages/User/Projects";
import Settings from "./Pages/User/Settings";
// import Employees from "./Pages/User/Job/Employees";
function App(props) {
  const [socketRef, setSocketRef] = useState(null);
  const [checkAuth, setCheckAuth] = useState(false);
  const [callOther, setCallOther] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  return (
    <Router className=" text-gray-600">
      <ChatComponent
        setRef={setSocketRef}
        checkAuth={checkAuth}
        setNewMessage={setNewMessage}
      />
      <VideoChat socket={socketRef} other={callOther} />
      {/* <VideoTest /> */}
      <Switch>
        <Route exact path="/home">
          <Header />
          {/* <Background /> */}
          <Home />
          <Footer />
        </Route>

        <Route exact path="/my/home">
          <Redirect to="/home" />
        </Route>

        <Route exact path="/">
          <Header />
          {/* <Background /> */}
          <Home />
          <Footer />
        </Route>

        <Route exact path="/about-us">
          <Header />
          {/* <About /> */}
          <h2 className="my-8 text-7xl container mx-auto">About Us</h2>
          <Footer />
        </Route>

        <Route exact path="/contact-us">
          <Header />
          <h2 className="my-8 text-7xl container mx-auto">Contact Us</h2>
          {/* <Contact /> */}
          <Footer />
        </Route>

        <Route exact path="/register">
          <Register />
          <Footer />
        </Route>

        <Route exact path="/login">
          <Login checkAuth={setCheckAuth} />
          <Footer />
        </Route>

        <Route exact path="/activate/:code">
          <Activate />
          <Footer />
        </Route>

        <Route exact path="/jobs/:type">
          <Header />
          <Explore />
          <Footer />
        </Route>
        <Route exact path="/search/:filter/:cat">
          <Header />
          <Search />
          <Footer />
        </Route>

        <Route exact path="/portfolios/:type">
          <Header />
          <AllPortfolio />
          <Footer />
        </Route>

        <Route exact path="/jobs/:type/:cat">
          <Header />
          <Explore />
          <Footer />
        </Route>

        <Route exact path="/jobs">
          <Redirect to="/jobs/fulltime" />
        </Route>

        <Route exact path="/services">
          <Header />
          <Service />
          <Footer />
        </Route>

        <Route exact path="/services/cat/:cat">
          <Header />
          <Service />
          <Footer />
        </Route>

        <Route exact path="/service/:slug">
          <Header />
          <ServiceDetail />
          <Footer />
        </Route>

        <Route exact path="/service/:slug/:sub">
          <Header />
          <ServiceDetail />
          <Footer />
        </Route>

        <Route exact path="/service">
          <Redirect to={`/services`} />
        </Route>

        <Route exact path="/admin/home">
          <div className="md:grid grid-cols-12 gap-0 h-screen overflow-y-hidden">
            <div className="col-span-12 md:col-span-2 md:block">
              <Adminbar />
            </div>
            <div className=" col-span-12 md:col-span-10 w-full">
              <Admin />
            </div>
          </div>
        </Route>

        <Route exact path="/admin/categories">
          <div className="md:grid grid-cols-12 gap-0 h-screen overflow-y-hidden">
            <div className="col-span-12 md:col-span-2 md:block">
              <Adminbar />
            </div>
            <div className=" col-span-12 md:col-span-10 w-full">
              <AdminCategories />
            </div>
          </div>
        </Route>

        <Route exact path="/admin/services">
          <div className="md:grid grid-cols-12 gap-0 h-screen overflow-y-hidden">
            <div className="col-span-12 md:col-span-2 md:block">
              <Adminbar />
            </div>
            <div className=" col-span-12 md:col-span-10 w-full">
              <Services />
            </div>
          </div>
        </Route>

        <Route exact path="/admin/users">
          <div className="md:grid grid-cols-12 gap-0 h-screen overflow-y-hidden">
            <div className="col-span-12 md:col-span-2 md:block">
              <Adminbar />
            </div>
            <div className=" col-span-12 md:col-span-10 w-full">
              <AdminUsers />
            </div>
          </div>
        </Route>

        <Route exact path="/admin/login">
          <AdminLogin />
        </Route>

        <Route exact path="/admin/register">
          <AdminRegister />
        </Route>

        <Route exact path="/me/home">
          <div className="md:grid grid-cols-12 gap-0 h-screen overflow-y-hidden">
            <div className="col-span-12 md:col-span-2 md:block">
              <Sidebar />
            </div>
            <div className=" col-span-12 md:col-span-10 w-full">
              <UserHome />
            </div>
          </div>
        </Route>

        <Route exact path="/me/messenger">
          <div className="md:grid grid-cols-12 gap-0 h-screen overflow-y-hidden">
            <div className="col-span-12 md:col-span-2 md:block">
              <Sidebar />
            </div>
            <div className=" col-span-12 md:col-span-10 w-full">
              <Messenger
                socket={socketRef}
                callOther={setCallOther}
                newMessage={newMessage}
              />
            </div>
          </div>
        </Route>

        <Route exact path="/me/messenger/:code">
          <div className="md:grid grid-cols-12 gap-0 h-screen overflow-y-hidden">
            <div className="col-span-12 md:col-span-2 md:block">
              <Sidebar />
            </div>
            <div className=" col-span-12 md:col-span-10 w-full">
              <Messenger
                socket={socketRef}
                callOther={setCallOther}
                newMessage={newMessage}
              />
            </div>
          </div>
        </Route>

        <Route exact path="/me/interviews">
          <div className="md:grid grid-cols-12 gap-0 h-screen overflow-y-hidden">
            <div className="col-span-12 md:col-span-2 md:block">
              <Sidebar />
            </div>
            <div className=" col-span-12 md:col-span-10 w-full">
              <Interview />
            </div>
          </div>
        </Route>

        <Route exact path="/me/jobs">
          <div className="md:grid grid-cols-12 gap-0 h-screen overflow-y-hidden">
            <div className="col-span-12 md:col-span-2 md:block">
              <Sidebar />
            </div>
            <div className=" col-span-12 md:col-span-10 w-full">
              <Job />
            </div>
          </div>
        </Route>

        <Route exact path="/me/settings">
          <Settings />
        </Route>
        
        <Route exact path="/me/settings/:page">
          <Settings />
        </Route>

        <Route exact path="/me/employees">
          <div className="md:grid grid-cols-12 gap-0 h-screen overflow-y-hidden">
            <div className="col-span-12 md:col-span-2 md:block">
              <Sidebar />
            </div>
            <div className=" col-span-12 md:col-span-10 w-full">
              <Employees />
            </div>
          </div>
        </Route>

        <Route exact path="/me/projects">
          <div className="md:grid grid-cols-12 gap-0 h-screen overflow-y-hidden">
            <div className="col-span-12 md:col-span-2 md:block">
              <Sidebar />
            </div>
            <div className=" col-span-12 md:col-span-10 w-full">
              <Projects />
            </div>
          </div>
        </Route>

        <Route exact path="/me/applications">
          <div className="md:grid grid-cols-12 gap-0 h-screen overflow-y-hidden">
            <div className="col-span-12 md:col-span-2 md:block">
              <Sidebar />
            </div>
            <div className=" col-span-12 md:col-span-10 w-full">
              <JobApplications />
            </div>
          </div>
        </Route>

        <Route exact path="/me/portfolio">
          <div className="md:grid grid-cols-12 gap-0 h-screen overflow-y-hidden">
            <div className="col-span-12 md:col-span-2 md:block">
              <Sidebar />
            </div>
            <div className=" col-span-12 md:col-span-10 w-full">
              <Portfolio />
            </div>
          </div>
        </Route>

        <Route exact path="/me/gallery">
          <div className="md:grid grid-cols-12 gap-0 h-screen overflow-y-hidden">
            <div className="col-span-12 md:col-span-2 md:block">
              <Sidebar />
            </div>
            <div className=" col-span-12 md:col-span-10 w-full">
              <Gallery />
            </div>
          </div>
        </Route>

        <Route path="*">
          <ErrorPage />
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
