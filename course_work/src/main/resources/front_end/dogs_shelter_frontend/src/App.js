import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Main_page from "./Components/Main_page.js";
import Dogs_list from "./Components/Dogs_pages/Dogs_list.js";
import Navigation from "./Components/Navigation.js";
import React from "react";
import Login from "./Components/Login.js";
import Register from "./Components/Register.js";

const App = () => {

  return (
      <div>
          <Navigation />
          <BrowserRouter>
              <Routes>
                  {/* eslint-disable-next-line react/jsx-pascal-case */}
                  <Route path="/" element={<Main_page />} />
                  {/* eslint-disable-next-line react/jsx-pascal-case */}
                  <Route path="/dogs_page" element={<Dogs_list />} />
                  <Route path="/logout" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/registration" element={<Register />} />
              </Routes>
          </BrowserRouter>
      </div>

  );
}

export default App;
