import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Main_page from "./Components/Main_page.js";
import Dogs_list from "./Components/Dogs_pages/List/Dogs_list.js";
import Navigation from "./Components/Navigation.js";
import React from "react";
import Login from "./Components/Authorization/Login.js";
import Registration_page from "./Components/Authorization/Registration_page.js";
import GetDog_page from "./Components/Dogs_pages/Get/GetDog_page.js";
import DeleteDog_page from "./Components/Dogs_pages/DeleteDog/DeleteDog_page.js";
import AddDog_page from "./Components/Dogs_pages/Add/AddDog_page.js";
import Orders_page from "./Components/Orders/Orders_page.js";
import User_page from "./Components/Client/User_page.js";
import Logout from "./Components/Authorization/Logout.js";

const App = () => {

  return (
      <div>
          <Navigation />
          <BrowserRouter>
              <Routes>
                  {/* eslint-disable-next-line react/jsx-pascal-case */}
                  <Route path="/" element={<Main_page />} />
                  {/* eslint-disable-next-line react/jsx-pascal-case */}
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Registration_page />} />
                  <Route path="/dogs" element={<Dogs_list />} />
                  <Route path="/dogs/get/:id" element={<GetDog_page />} />
                  <Route path="/dogs/admin/:id" element={<DeleteDog_page />} />
                  <Route path="/dogs/admin/add_dogs" element={<AddDog_page />} />
                  <Route path="/dogs/admin/orders" element={<Orders_page />} />
                  <Route path="/admin/get/user/:id" element={<User_page />} />
              </Routes>
          </BrowserRouter>
      </div>

  );
}

export default App;
