import { useEffect } from "react"
import Home from "./pages/HomePage/Home";
import type { AppDispatch, RootState } from "./redux/ReduxStore";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LayoutPage } from "./pages/Layout/LayoutPage";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/slices/AuthSlice";
import { ToastContainer  } from "react-toastify";
import Profile from "./pages/Profilepage/Profile";
import { Catalog } from "./pages/catalog/Catalog";
import { ResourcePage } from "./pages/Resource/Resource";

const App = () => {

  const loggedin = useSelector((state: RootState) => state.auth.loggedin);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    let userid = localStorage.getItem("userId");
    if (userid && !loggedin) {
      // dispatch(fetchUser({ userId: userid, property: 'loggedin' }));
      dispatch(fetchUser({ userId: userid, property: 'loggedin' }));
    }

  }, [loggedin])


  return (

    <BrowserRouter>
       <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        
        <Route path="/" element={<LayoutPage/>} >
        <Route path="" element={<Home/>} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/resource/:barcode" element={<ResourcePage/>} />
        <Route path="/profile/:userId" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App