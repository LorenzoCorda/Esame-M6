import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Github } from "lucide-react";
import "./headers.css";
import validateSignupForm from "../../../../Backend/exception/auth/validateSignupForm";

const Headers = () => {
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("signup");
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const resetForm = () => {
    setFormdata({
      name: "",
      surName: "",
      dob: "",
      email: "",
      password: "",
    });
    setFormErrors({});
    setSuccessMessage("");
  };

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

  const handleClose = () => {
    resetForm();
    setShow(false);
  };

  const handleShow = (type) => {
    resetForm();
    setModalType(type);
    setShow(true);
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });

    setFormErrors((prev) => ({ ...prev, [name]: "" }));
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
    setFormErrors({});

    const validationErrors = validateSignupForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/authors/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.status === 400 && data.message === "Email already used") {
        setFormErrors({ email: "This email is already registered." });
        return;
      }

      if (!response.ok) {
        setFormErrors({ general: data.message || "Registration error" });
        return;
      }

      setSuccessMessage("Successful registration!");
      localStorage.setItem("token", data.token);
      setShow(false);
    } catch (error) {
      console.error("Registration error", error.message);
      setFormErrors({ general: "Something went wrong. Try again later." });
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
              Signup to share your story or your thoughts!
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
            {formErrors.general && (
              <p className="text-danger">{formErrors.general}</p>
            )}
            <Form onSubmit={onSubmit}>
              {modalType === "signup" && (
                <>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={onChangeInput}
                    isInvalid={!!formErrors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.name}
                  </Form.Control.Feedback>
                  <Form.Label>Surname</Form.Label>
                  <Form.Control
                    name="surName"
                    type="text"
                    placeholder="Surname"
                    onChange={onChangeInput}
                    isInvalid={!!formErrors.surName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.surName}
                  </Form.Control.Feedback>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    name="dob"
                    type="date"
                    placeholder="Date of Birth"
                    min="1925-01-01"
                    max="2025-12-31"
                    value={formData.dob}
                    onChange={onChangeInput}
                    isInvalid={!!formErrors.dob}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.dob}
                  </Form.Control.Feedback>
                </>
              )}

              <Form.Label>Email</Form.Label>
              <div className="email-field-wrapper">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={onChangeInput}
                />
                {formErrors.email && (
                  <Form.Text className="text-danger custom-email-error">
                    {formErrors.email}
                  </Form.Text>
                )}
              </div>

              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={onChangeInput}
                isInvalid={!!formErrors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.password}
              </Form.Control.Feedback>
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
                <Github /> Github
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
