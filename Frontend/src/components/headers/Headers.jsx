import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./headers.css";

const Headers = () => {
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("signup");

  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormdata] = useState({
    name: "",
    surName: "",
    dob: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const handleClose = () => setShow(false);

  const handleShow = (type) => {
    setModalType(type);
    setShow(true);
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (modalType === "signup") {
      await handleSignup();
    } else {
      await handleLogin();
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/authors/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            surName: formData.surName,
            dob: formData.dob,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration error");
      }

      setSuccessMessage("Successful registration!");

      /* setTimeout(() => {
        setSuccessMessage("");
      }, 3000); */

      localStorage.setItem("token", data.token);

      /* alert("Successful registration!"); */

      setShow(false);
    } catch (error) {
      console.error("Registration error", error.message);
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      console.log("Risposta login:", data);

      if (!response.ok) {
        throw new Error(data.message || "Errore nel login");
      }

      localStorage.setItem("token", data.token);
      console.log(
        "Token salvato in localStorage:",
        localStorage.getItem("token")
      );
      navigate("/dashboard");
      setShow(false);
    } catch (error) {
      console.error("Error login:", error.message);
      alert(error.message);
    }
  };

  const onRedirectGithub = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/github`;
  };

  return (
    <>
      <div className="background-img">
        <div className="d-flex justify-content-center flex-column align-items-center">
          <div className="mt-4">
            <h1 className="d-flex justify-content-center text-secondary">
              Welcome to Homepage
            </h1>
            <h3 className="text-white">
              Sign Up to share your story or your thoughts!
            </h3>
          </div>
          <div className="d-flex gap-4">
            <Button
              className="mt-5"
              variant="secondary"
              onClick={() => handleShow("signup")}
            >
              Sign Up
            </Button>
            <Button
              className="mt-5"
              variant="secondary"
              onClick={() => handleShow("login")}
            >
              Login
            </Button>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {modalType === "signup" ? "Sign Up" : "Login"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onSubmit}>
              {modalType === "signup" && (
                <>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={onChangeInput}
                  />
                  <Form.Label>Surname</Form.Label>
                  <Form.Control
                    name="surName"
                    type="text"
                    placeholder="Surname"
                    onChange={onChangeInput}
                  />
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    name="dob"
                    type="date"
                    placeholder="Date of Birth"
                    value={formData.dob}
                    onChange={onChangeInput}
                  />
                </>
              )}

              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                onChange={onChangeInput}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={onChangeInput}
              />
              <Button variant="warning" type="submit" className="mt-3">
                {modalType === "signup" ? "Register" : "Login"}
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <div>
              <button onClick={onRedirectGithub} className="btn btn-dark">
                GitHub Login
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
      <>
        <div className="custom-div-message d-flex justify-content-center align-content-center">
          {successMessage && (
            <div className="custom-message">{successMessage}</div>
          )}
        </div>
      </>
    </>
  );
};

export default Headers;
