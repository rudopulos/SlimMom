import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/auth/authOperations";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../Redux/auth/authSelectors";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const email = user ? user.email : null;
  const username = typeof email === "string" ? email.split("@")[0] : "Guest";

  return (
    <div>
      <p>{username}</p>
      <button
        onClick={() => {
          console.log("clicked");
          dispatch(logoutUser());
          navigate("/login");
        }}
      >
        Exit
      </button>
    </div>
  );
};

export default Logout;
