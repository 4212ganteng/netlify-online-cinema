import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Form,
  Image,
  Nav,
  Navbar,
} from "react-bootstrap";
import "../style/style.css";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";

import logo from "../assets/logo.svg";
import profile from "../assets/profile.svg";
import film from "../assets/film.svg";
import logout from "../assets/logout.svg";
import userIcon from "../assets/user.svg";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { UserContext } from "../Usercontext/Usercontex";

const Navbars = () => {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [user, setUser] = useState(null);

  const getUser = async () => {
    const response = await API.get(`/user/${state.user.id}`);

    setUser(response.data.data.data);
    // console.log("isi response", response);
  };
  // console.log(user, "isi user");

  useEffect(() => {
    if (state.user) {
      getUser();
    }
  }, [state]);

  const handleLogut = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  // set state for login context

  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="180"
              className="d-inline-block align-top"
              alt="logo"
              onClick={() => navigate("/")}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            {!state.isLogin ? (
              <div className="d-flex">
                <Nav.Link
                  className="text-light me-5 mt-2 fw-bold"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </Nav.Link>
                <Button
                  className="btn-color fw-bold"
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </Button>
              </div>
            ) : state.user.role === "user" ? (
              <div>
                <Dropdown className="px-5">
                  <Dropdown.Toggle variant="btn-color" id="dropdown-basic">
                    <img
                      src={profile}
                      width={40}
                      height={40}
                      className="rounded-circle"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="bg-dropdown">
                    <Dropdown.Item
                      className="text-light bg-dropdown"
                      onClick={() => navigate("/profile")}
                    >
                      <img className="me-3" src={userIcon} />
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="text-light bg-dropdown"
                      onClick={() => navigate("/list-film")}
                    >
                      <img className="me-3" src={film} />
                      My List Film
                    </Dropdown.Item>
                    <Dropdown.Divider className="bg-light" />
                    <Dropdown.Item
                      className="text-light bg-dropdown"
                      onClick={handleLogut}
                    >
                      <img className="me-3" src={logout} />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <div>
                <Dropdown className="px-5">
                  <Dropdown.Toggle variant="btn-color" id="dropdown-basic">
                    <img
                      src={profile}
                      width={40}
                      height={40}
                      className="rounded-circle"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="bg-dropdown">
                    <Dropdown.Item
                      className="text-light bg-dropdown"
                      onClick={() => navigate("/film")}
                    >
                      <img className="me-3" src={film} />
                      Film
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="text-light bg-dropdown"
                      onClick={() => navigate("/add-category")}
                    >
                      <img className="me-3" src={film} />
                      Add Category
                    </Dropdown.Item>
                    <Dropdown.Divider className="bg-light" />
                    <Dropdown.Item
                      className="text-light bg-dropdown"
                      onClick={handleLogut}
                    >
                      <img className="me-3" src={logout} />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Login
        show={showLogin}
        setShow={setShowLogin}
        setShowRegister={setShowRegister}
      />
      <Register
        show={showRegister}
        setShow={setShowRegister}
        setShowLogin={setShowLogin}
      />
    </div>
  );
};

export default Navbars;
