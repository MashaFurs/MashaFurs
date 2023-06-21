import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../Home/Home";
import SingleProduct from "../Products/SingleProduct";
import Profile from "../Profile/Profile";

import { ROUTES } from '../../utils/routes';


const AppRoutes = () => (
        <Routes>
            <Route index element={<Home />} />
            <Route path={ROUTES.PRODUCT} element={ <SingleProduct/> }/>
            <Route path={ROUTES.PROFILE} element={ <Profile/> }/>
        </Routes>
);

export default AppRoutes;