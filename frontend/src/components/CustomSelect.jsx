import Select from "react-select";
import { useField } from "formik";
import foodsData from "../db/products.json";
import PropTypes from "prop-types";

const customStyles = {
  control: (base) => ({
    ...base,
    background: "#fff",
    border: "none",
    borderBottom: "1px solid #e0e0e0",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#e0e0e0" : "white",
    color: "#212121",
    "&:active": {
      backgroundColor: "#FC842D",
      color: "white",
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 0,
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  container: (base) => ({
    ...base,
    width: 270,
  }),
};

const CustomSelect = ({ name }) => {
  const [field, , helpers] = useField(name);
  const { setValue } = helpers;

  const foodOptions = foodsData.map((food) => ({
    category: food.categories,
    value: food._id.$oid,
    label: food.title,
    calories: food.calories,
  }));
  const handleChange = (option) => {
    setValue(option ? option : "");
  };
  return (
    <div>
      <Select
        styles={customStyles}
        options={foodOptions}
        value={foodOptions.find((o) => o.value === field.value)}
        onChange={handleChange}
        placeholder="Enter product name"
        isClearable
      />
    </div>
  );
};
CustomSelect.propTypes = {
  name: PropTypes.string.isRequired,
};
export default CustomSelect;
