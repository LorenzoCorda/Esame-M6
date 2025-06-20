import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./headers.css";

const Headers = () => {
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("signup"); // 'signup' o 'login'
  const [formData, setFormdata] = useState({
    name: "",
    surName: "",
    dob: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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

  /* const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "signup") {
        // chiamata API per registrazione
      } else {
        // chiamata API per login
      }
    } catch (error) {
      console.error(error);
    }
  }; */

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
        throw new Error(data.message || "Errore nella registrazione");
      }

      localStorage.setItem("token", data.token);

      alert("Registrazione avvenuta con successo!");
      /* navigate("/auth/login"); */

      setShow(false);
    } catch (error) {
      console.error("Errore registrazione:", error.message);
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

      if (!response.ok) {
        throw new Error(data.message || "Errore nel login");
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
      setShow(false);
    } catch (error) {
      console.error("Errore login:", error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <div className="background-img">
        <div className="d-flex justify-content-center gap-3 align-items-center">
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
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Headers;

/* const Headers = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) =>{
    e.preventDefault()
    try {
        const 
    } catch (error) {
        
    }

  }

  return (
    <>
      <div className="background-img">
        <div className="d-flex justify-content-center gap-3 align-items-center">
          <Button className="mt-5" variant="secondary" onClick={handleShow}>
            Sign Up
          </Button>
          <Button className="mt-5" variant="secondary" onClick={handleShow}>
            Login
          </Button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Name"
                  autoFocus
                />
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  name="surName"
                  type="text"
                  placeholder="Surname"
                  autoFocus
                />
                <Form.Label>email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="email"
                  autoFocus
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="text"
                  placeholder="Password"
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Save
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Headers; */
