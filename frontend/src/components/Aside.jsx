import { useEffect } from "react";
import Logout from "./Logout";
import { useDispatch, useSelector } from "react-redux";
import { loadSavedFormData } from "../Redux/calculator/calcSlice";
import { loadSavedaddFood } from "../Redux/diary/addFoodSlice";

const Aside = () => {
  const { data: formData } = useSelector((state) => state.formData);
  const { data: addFood } = useSelector((state) => state.addFood);

  const dispatch = useDispatch();

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    const savedAddFood = localStorage.getItem("addFood");
    if (savedFormData && savedAddFood) {
      dispatch(loadSavedFormData(JSON.parse(savedFormData)));
      dispatch(loadSavedaddFood(JSON.parse(savedAddFood)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (formData && addFood) {
      localStorage.setItem("formData", JSON.stringify(formData));
      localStorage.setItem("addFood", JSON.stringify(addFood));
    }
  }, [formData, addFood]);

  const consumedCalories = addFood.calories;
  const leftCalories = formData.BMR ? formData.BMR - consumedCalories : "N/A";
  const dailyRate = formData.BMR || "N/A";
  const percentageOfNormal = formData?.BMR
    ? ((consumedCalories / formData.BMR) * 100).toFixed(0)
    : "N/A";

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}.${
    currentDate.getMonth() + 1
  }.${currentDate.getFullYear()}`;

  return (
    <div className="container-aside">
      <Logout />
      <div className="content">
        <div>
          <h3>Summary for {formattedDate}</h3>
          <ul>
            <li>Left {leftCalories} kcal</li>
            <li>Consumed {consumedCalories} kcal</li>
            <li>Daily rate {dailyRate} kcal</li>
            <li>{percentageOfNormal}% of normal kcal</li>
          </ul>
        </div>
        <div>
          <h3>Food not recommended</h3>
          <ul>
            {formData?.forbiddenCategories?.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Aside;
