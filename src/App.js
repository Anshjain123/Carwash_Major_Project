import logo from './logo.svg';
// import './App.css';
import Dashboard from './Components/Dashboard';
import CleanerOnboarding from './Components/CleanerOnboarding';
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";




function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Dashboard/>
    },
    {
      path:'/register',
      element:<CleanerOnboarding/>
    }
  ])

  return (
    <div className="App">

      <RouterProvider router = {router} />
        {/* <Dashboard/> */}
        {/* <CleanerOnboarding/> */}
    </div>
  );
}

export default App;
