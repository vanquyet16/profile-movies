import React, { FC } from "react";
import { Route, Routes } from "react-router";
import { Box } from "zmp-ui";
import HomePage from "../pages/home";
import { getSystemInfo } from "zmp-sdk";
import { ButtomNavigation } from "./buttom-navigation";
import About from "../pages/about";
import Form from "../pages/form";
import User from "../pages/user";
import { ScrollRestoration } from "./scroll-restoration";
import DetailMovie from "../pages/detail_movie";


if (getSystemInfo().platform === "android") {
  const androidSafeTop = Math.round(
    (window as any).ZaloJavaScriptInterface.getStatusBarHeight() /
      window.devicePixelRatio,
  );
  document.body.style.setProperty(
    "--zaui-safe-area-inset-top",
    `${androidSafeTop}px`,
  );
}

export const Layout: FC = () => {
  // useHandlePayment();

  return (
    <Box flex flexDirection="column" className="h-screen">
      <ScrollRestoration />
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
              <Route path="/" element={<HomePage></HomePage>}></Route>
              <Route path="/about" element={<About></About>}></Route>
              <Route path="/form" element={<Form></Form>}></Route>
              <Route path="/user" element={<User></User>}></Route>
              <Route path="/detail-movie/:id" element={<DetailMovie></DetailMovie>}></Route>
          </Routes>
      </Box>
      <ButtomNavigation />
    </Box>
  );
};
