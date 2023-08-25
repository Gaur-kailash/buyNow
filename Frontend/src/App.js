import "./App.css";
import { BrowserRouter, Route, Routes ,Link} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import _Private from "./components/_Private";
import DeliveryDetails from "./pages/DeliveryDetails";

function App() {
  const NotFound = () => {
    return <div>
      <h3>404 - Page Not Found </h3>
      <Link to="/">Go to home</Link>
    </div>;
};
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/category/:cat" element={<Category/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route element={<_Private/>}>
      <Route path="/myCart" element={<Cart/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/details" element={<DeliveryDetails/>}/>

      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
