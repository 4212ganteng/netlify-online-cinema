import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Outlet,
  Navigate,
} from "react-router-dom";
import AddFilm from "./pages/admin/AddFilm";
// import Navbars from "./components/Navbars";
import HomeAdmin from "./pages/admin/HomeAdmin";
import Details from "./pages/Details";
import Home from "./pages/Home";
import ListFilm from "./pages/ListFilm";
import Profile from "./pages/Profile";
import AddCategory from "./pages/admin/AddCategory";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Usercontext/Usercontex";
import { API, setAuthToken } from "./config/api";
import Film from "./pages/admin/Film";
import DetailList from "./pages/DetailList";
import UpdateFilm from "./pages/admin/UpdateFilm";

function App() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Init user context here ...
  const [state, dispatch] = useContext(UserContext);

  // Redirect Auth here ...
  useEffect(() => {
    // Redirect Auth
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin == false && !isLoading) {
      navigate("/");
    } else {
      if (state.user.status == "admin") {
        navigate("/complain-admin");
      } else if (state.user.status == "customer") {
        navigate("/");
      }
    }
  }, [state]);

  // Create function for check user token here ...

  // Call function check user with useEffect didMount here ...
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // console.log("ni cek auth nayri token", response);

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // console.log("paylod login", payload);
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const PrivateRoute = () => {
    return state.isLogin ? <Outlet /> : <Navigate to="/" />;
  };

  const AdminRoute = () => {
    return state.user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <Routes>
      {/* <Navbars /> */}
      {isLoading ? (
        <></>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<AdminRoute />}>
              <Route path="/home-admin" element={<HomeAdmin />} />
              <Route path="/add-film" element={<AddFilm />} />
              <Route path="/update-film/:id" element={<UpdateFilm />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/film" element={<Film />} />
            </Route>
            <Route exact path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Details />} />
            <Route path="/transaction/:id" element={<DetailList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/list-film" element={<ListFilm />} />
          </Route>
        </>
      )}
    </Routes>
  );
}

export default App;
