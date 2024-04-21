import Aside from "../components/Aside";
import CalculatorForm from "../components/CalculatorForm";
import Header from "../components/Header";

const Calculator = () => {
  return (
    <div className="container-home">
      <Header />
      <CalculatorForm />
      <Aside />
    </div>
  );
};

export default Calculator;
