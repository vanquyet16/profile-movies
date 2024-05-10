// import React from "react";
// import { Route } from "react-router-dom";
// import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
// import { RecoilRoot } from "recoil";
// import HomePage from "../pages/home";
// import About from "../pages/about";
// import Form from "../pages/form";
// import User from "../pages/user";
// import { ButtomNavigation } from "./buttom-navigation";

// const MyApp = () => {
//   return (
//     <RecoilRoot>
//       <App>
//         <SnackbarProvider>
//           <ZMPRouter>
//             <AnimationRoutes>
//               <Route path="/" element={<HomePage></HomePage>}></Route>
//               <Route path="/about" element={<About></About>}></Route>
//               <Route path="/form" element={<Form></Form>}></Route>
//               <Route path="/user" element={<User></User>}></Route>
//             </AnimationRoutes>
//             <ButtomNavigation />
//           </ZMPRouter>
//         </SnackbarProvider>
//       </App>
      
//     </RecoilRoot>
//   );
// };
// export default MyApp;

import React from "react";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import { Layout } from "./layout";
import { getConfig } from "../utils/config";
import { ConfigProvider } from "./config-provider";

const MyApp = () => {
  return (
    <RecoilRoot>
      <ConfigProvider
        cssVariables={{
          "--zmp-primary-color": getConfig((c) => c.template.primaryColor),
          "--zmp-background-color": "#f4f5f6",
        }}
      >
        <App>
          <SnackbarProvider>
            <ZMPRouter>
              <Layout />
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </ConfigProvider>
    </RecoilRoot>
  );
};
export default MyApp;

