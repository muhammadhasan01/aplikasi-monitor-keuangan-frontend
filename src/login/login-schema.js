import * as yup from "yup";

export const configLoginFormik = {
  getSchema,
  getInitialValues,
};

function getSchema() {
  return yup.object().shape({
    username: yup.string().required("username dibutuhkan"),
    password: yup.string().required("password dibutuhkan"),
  });
}

function getInitialValues() {
  return {
    username: "",
    password: "",
  };
}
