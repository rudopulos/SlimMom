import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CustomSelect from "../CustomSelect";
import styles from "../DiaryForm/DiaryForm.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFood } from "../../Redux/diary/addFoodOp";
import { removeFood } from "../../Redux/diary/addFoodSlice";

const DiaryForm = () => {
  useEffect(() => {
    const savedEntries = localStorage.getItem("diaryEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);
  const validationSchema = Yup.object().shape({
    date: Yup.date().required("Data este obligatorie"),
    food: Yup.object().nullable().required("Selectează un aliment"),
    grams: Yup.number()
      .positive("Gramajul trebuie să fie un număr pozitiv")
      .required("Gramajul este obligatoriu"),
  });
  const dispatch = useDispatch();

  const currentDate = new Date().toISOString().slice(0, 10);

  const [entries, setEntries] = useState([]);

  const calculateCalories = (calories, grams) => {
    return (calories * grams) / 100;
  };
  const handleDelete = (index) => {
    const newEntries = entries.filter((_, idx) => idx !== index);
    setEntries(newEntries);
    localStorage.setItem("diaryEntries", JSON.stringify(newEntries));
    dispatch(removeFood(index));
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ date: currentDate, food: null, grams: "" }}
        onSubmit={(values, actions) => {
          const newEntry = {
            category: values.food.label,
            grams: values.grams,
            calories: calculateCalories(values.food.calories, values.grams),
          };
          dispatch(addFood(newEntry));

          const updatedEntries = [...entries, newEntry];
          setEntries(updatedEntries);
          localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));

          actions.setSubmitting(false);
        }}
      >
        <Form>
          <Field type="date" name="date" className={styles.formDate} />
          <div className={styles.addContainer}>
            <CustomSelect name="food" className={styles.formField} />
            <Field
              type="number"
              name="grams"
              placeholder="Grams"
              className={styles.formField}
            />
            <button className={styles.submitButton} type="submit">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_12701_1027)">
                  <path
                    d="M18.72 12.96H12.96V18.72H11.04V12.96H5.28V11.04H11.04V5.27997H12.96V11.04H18.72V12.96Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_12701_1027">
                    <rect
                      width="30.04"
                      height="30.04"
                      fill="white"
                      transform="translate(0.48 0.47998)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </Form>
      </Formik>

      <div className={styles.productsContainer}>
        <ul className={styles.productsList}>
          {entries.map((entry, index) => (
            <li className={styles.productsItem} key={index}>
              <div style={{ width: "237px" }}>{entry.category}</div>
              <div>{entry.grams}g</div>
              <div>{entry.calories.toFixed(2)} kcal</div>
              <button onClick={() => handleDelete(index)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiaryForm;
