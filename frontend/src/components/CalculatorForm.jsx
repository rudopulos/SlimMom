import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomModal from "./Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../Redux/calculator/calcOperations";
import productsData from "../db/products.json";
import { selectIsLoggedIn } from "../Redux/auth/authSelectors";

const validationSchema = Yup.object({
  height: Yup.number()
    .required("Required")
    .positive("Height must be positive")
    .integer("Height must be an integer"),
  desiredWeight: Yup.number()
    .required("Required")
    .positive("Weight must be positive")
    .integer("Weight must be an integer"),
  age: Yup.number()
    .required("Required")
    .positive("Age must be positive")
    .integer("Age must be an integer"),
  currentWeight: Yup.number()
    .required("Required")
    .positive("Weight must be positive")
    .integer("Weight must be an integer"),
  bloodType: Yup.string()
    .required("Required")
    .oneOf(["A", "B", "AB", "O"], "Invalid blood type"),
});
const CalculatorForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bmrResult, setBmrResult] = useState(0);
  const [forbiddenCategories, setForbiddenCategories] = useState([]);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleSubmit = (values, { setSubmitting }) => {
    const { height, age, currentWeight, bloodType } = values;
    const BMR = 10 * currentWeight + 6.25 * height - 5 * age + 5;

    const bloodTypeIndexMap = { A: 1, B: 2, AB: 3, O: 4 };
    const bloodTypeIndex = bloodTypeIndexMap[bloodType];

    const uniqueCategories = new Set(
      productsData
        .filter(
          (product) => product.groupBloodNotAllowed[bloodTypeIndex] === true
        )
        .map((product) => product.categories)
    );
    const forbiddenCategories = Array.from(uniqueCategories).slice(0, 9);
    setForbiddenCategories(forbiddenCategories);

    const newValues = {
      ...values,
      BMR,
      forbiddenCategories,
    };

    setBmrResult(BMR);
    dispatch(submitForm(newValues));
    setModalIsOpen(true);
    setSubmitting(false);
  };

  return (
    <div className="calculator-container">
      <h1>Calculate your daily calorie intake right now</h1>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          height: "",
          age: "",
          currentWeight: "",
          desiredWeight: "",
          bloodType: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form className="form-calculator">
          <div className="left-container">
            {" "}
            <label>Height *</label>
            <Field type="number" name="height" />
            <ErrorMessage name="height" component="div" />
            <label htmlFor="">Age *</label>
            <Field type="number" name="age" />
            <ErrorMessage name="age" component="div" />{" "}
            <label> Current weight *</label>{" "}
            <Field type="number" name="currentWeight" />
            <ErrorMessage name="currentWeight" component="div" />
          </div>
          <div className="right-container">
            <label>Desired weight *</label>
            <Field type="number" name="desiredWeight" />
            <ErrorMessage name="desiredWeight" component="div" />
            <label htmlFor="bloodA">Blood type *</label>
            <div className="blood-type-options">
              <div className="radio-option">
                <Field id="bloodA" type="radio" name="bloodType" value="A" />
                <label htmlFor="bloodA">A</label>
              </div>
              <div className="radio-option">
                <Field id="bloodB" type="radio" name="bloodType" value="B" />
                <label htmlFor="bloodB">B</label>
              </div>
              <div className="radio-option">
                <Field id="bloodAB" type="radio" name="bloodType" value="AB" />
                <label htmlFor="bloodAB">AB</label>
              </div>
              <div className="radio-option">
                <Field id="bloodO" type="radio" name="bloodType" value="O" />
                <label htmlFor="bloodO"> 0</label>
              </div>
            </div>
            <ErrorMessage
              name="bloodType"
              component="div"
              className="error-message"
            />
          </div>

          <div className="button-container">
            {" "}
            <button className="calculator-button" type="submit">
              Start losing weight
            </button>
          </div>
        </Form>
      </Formik>{" "}
      {!isLoggedIn ? (
        <CustomModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Calorie Calculation"
        >
          <h2 className="modal-title">
            Your recommended daily calorie intake is{" "}
            <span
              className="modal-calories"
              style={{
                textAlign: "center",
                display: "block",
                fontSize: "48px",
                padding: "30px",
              }}
            >
              {bmrResult} <span style={{ fontSize: "23px" }}>kcal</span>
            </span>
          </h2>

          <ol className="modal-list">
            <p className="modal-p">Foods you should not eat</p>
            {forbiddenCategories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ol>

          <button className="close-btn" onClick={() => setModalIsOpen(false)}>
            X
          </button>
          <button
            onClick={() => navigate("/register")}
            className="calculator-button"
            type="button"
          >
            Start losing weight
          </button>
        </CustomModal>
      ) : null}
    </div>
  );
};

export default CalculatorForm;
