import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerUser } from "../Redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(30, "Too Long!")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(12, "Must be 12 characters or less")
      .required("Password is required"),
  });

  return (
    <div className="register">
      <h1>REGISTER</h1>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(registerUser(values));
          navigate("/calculator");
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="name">Name *</label>
            <Field id="name" type="text" name="name" />
            <ErrorMessage name="name" component="div" />

            <label htmlFor="email">Email *</label>
            <Field id="email" type="email" name="email" />
            <ErrorMessage name="email" component="div" />

            <label htmlFor="password">Password *</label>
            <Field id="password" type="password" name="password" />
            <ErrorMessage name="password" component="div" />

            <button
              disabled={isSubmitting}
              className="login-orange-btn"
              type="submit"
            >
              Register
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="login-white-btn"
              type="button"
            >
              Log in
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
