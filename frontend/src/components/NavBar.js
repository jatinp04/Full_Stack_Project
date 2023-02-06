import axios from "../Api";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export default function NavBar(props) {
  const navigate = useNavigate();
  function logout(e) {
    // console.log("Check!");
    e.preventDefault(); //Prevent Reloading
    axios
      .get("/logout", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          //Redirect to Login
          navigate("/login");
        }
      })
      .catch((Err) => {
        if (Err) {
          alert("Please Try Again!");
        }
      });
  }

  return (
    <header>
      <nav>
        <h1
          style={{
            color: "White",

            marginLeft: "100vh",
            marginTop: "25px",
          }}
        >
          Notes App
        </h1>

        <LogoutIcon
          className="logout"
          style={{
            color: "White",

            alignItems: "center",
            marginLeft: "200vh",
          }}
          onClick={logout}
        >
          Logout
        </LogoutIcon>
      </nav>
    </header>
  );
}
