import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Redux/auth/authOperations";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(12, "Must be 12 characters or less")
      .required("Password is required"),
  });

  return (
    <div className="login">
      <h1>LOG IN</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(loginUser(values));
          console.log("logged in");
          navigate("/calculator");
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
              Log In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="login-white-btn"
              type="button"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
