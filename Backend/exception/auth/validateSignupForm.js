const validateSignupForm = (formData) => {
  const errors = {};

  if (!formData.name.trim()) errors.name = "Name is required";
  if (!formData.surName.trim()) errors.surName = "Surname is required";
  if (!formData.dob) errors.dob = "Date of birth is required";
  if (!formData.email.trim()) errors.email = "Email is required";
  if (!formData.password) errors.password = "Password is required";

  return errors;
};

export default validateSignupForm;
