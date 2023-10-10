import logo from './logo.svg';
import Dashboard from './Components/Dashboard';
import CleanerOnboarding from './Components/CleanerOnboarding';
import CustomWebcam from './Components/CustomWebcam';
import * as React from "react";
import {
  createBrowserRouter, 
  RouterProvider
} from "react-router-dom";
import ShowAllCleaners from './Components/ShowAllCleaners';
import BasicModal from './Components/BasicModal';


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/register',
      element: <CleanerOnboarding />
    },
    {
      path: '/webcam',
      element: <CustomWebcam />
    }, 
    {
      path: '/cleaners',
      element: <ShowAllCleaners/>
    }
  ])

  return (
    <div className="App">
      <RouterProvider router = {router} />
      {/* <BasicModal/> */}
    </div>
  );
}

export default App;
