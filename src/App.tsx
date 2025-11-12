// import { RouterProvider } from "react-router-dom";
// import { router } from "./router";

// const App = () => {
//   return (
//     <div data-testid="app" className="font-campton  bg-[#F8F7F2]">
//       <RouterProvider router={router} />
//     </div>
//   );
// };

// export default App;


import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AppDataProvider } from "./context/AppDataContext";

const App = () => {
  return (
    <AppDataProvider>
      <div data-testid="app" className="font-campton  bg-[#F8F7F2]">
        <RouterProvider router={router} />
      </div>
    </AppDataProvider>
  );
};

export default App;
