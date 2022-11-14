import React, { useContext, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../../Usercontext/Usercontex";
import "../../style/style.css";

const Login = ({ show, setShow, setShowRegister }) => {
  const navigate = useNavigate();
  const handleClose = () => setShow(false);

  const [message, setmessage] = useState(null);
  const [state, dispatch] = useContext(UserContext);

  const [userLogin, setuserLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setuserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const data = await API.post("/login", userLogin);

      const alert = <Alert variant="success">Login berhasil!</Alert>;

      setmessage(alert);
      setShow(false);

      let payload = data.data.data;
      // console.log("isi payload", payload.token);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });

      setuserLogin({
        email: "",
        password: "",
      });

      setmessage(null);
      data.data.data.role == 'admin' && navigate('/home-admin');

    } catch (error) {
      console.log(error);
      const alert = <Alert variant="danger">Email / password salah!</Alert>;

      setmessage(alert);
    }
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {message && message}
          <Form>
            <div className="m-3">
              <h2 className="text-color">Login</h2>
            </div>
            <input
              label="Email"
              type="email"
              placeholder="Email"
              name="email"
              value={userLogin.email}
              onChange={handleChange}
              className="p-2 w-100 rounded rounded-3 my-2 border-1 shadow-lg bg-dark text-light"
              required
            />
            <input
              label="Password"
              type="password"
              placeholder="Password"
              name="password"
              value={userLogin.password}
              onChange={handleChange}
              className="p-2 w-100 rounded rounded-3 my-2 border-1 shadow-lg bg-dark text-light"
              required
            />
            <Button
              className="btn-color w-100 my-2 fw-bold px-5"
              onClick={(e) => handleSubmit.mutate(e)}
            >
              Login
            </Button>
          </Form>
          <p className="mt-3 text-light text-center">
            Don't have an account ? click
            <span
              className="fw-bold"
              onClick={() => {
                setShow(false);
                setShowRegister(true);
              }}
            >
              Here
            </span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
