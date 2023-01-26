import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NavBar(props) {
  const navigate = useNavigate();
  function logout(e) {

    
    // console.log("Check!");
    e.preventDefault(); //Prevent Reloading
    axios
      .get("http://localhost:5001/logout",{ withCredentials: true })
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
        <ul>
          <li>
            <a href="#"> Home </a>
          </li>
          
          <li>
            <a href="#"> My Notes</a>
          </li>

          <li>
            <a href="#"> All Notes </a>
          </li>
          
          <li className="login">

           <a href="/login"> Login/SignUp</a>
          </li>
          <li className="login">

          <button  onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
