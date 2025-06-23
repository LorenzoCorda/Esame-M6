const validateSignupForm = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  } else if (formData.name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!formData.surName.trim()) {
    errors.surName = "Surname is required";
  } else if (formData.surName.length < 3) {
    errors.surName = "Surname must be at least 3 characters";
  }

  if (!formData.dob) {
    errors.dob = "Date of birth is required";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};

export default validateSignupForm;
