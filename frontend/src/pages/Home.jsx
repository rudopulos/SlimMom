import CalculatorForm from "../components/CalculatorForm";
import Header from "../components/Header";

const Home = () => {
  console.log("Rendering Home component...");
  return (
    <div className="container">
      <Header />
      <CalculatorForm />
    </div>
  );
};

export default Home;
