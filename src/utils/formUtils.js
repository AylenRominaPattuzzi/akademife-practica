export const validateForm = (fields, requiredFields) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!fields[field]) {
      errors[field] = `El campo ${field} es obligatorio`;
    }
  });

  return errors;
};
