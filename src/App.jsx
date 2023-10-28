import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./Pages/Home"
import Beranda from "./Pages/Beranda"
import Items from "./Items/Items"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Cart from "./Items/Cart"
import Profile from "./auth/Profile"
import Edit from "./auth/Edit"
export default function App(){
  return(
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/beranda" element={<Beranda/>}/>
          <Route path="/items/:id" element={<Items/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/edit" element={<Edit/>} />
        </Routes>
      </Router>

    </div>
  )
}