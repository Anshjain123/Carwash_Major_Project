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
import ShowAllClients from './Components/ShowAllClients';
import ClientOnboarding from './Components/ClientOnboarding';
import Cardetails from './Components/Cardetails';
import Plans from './Components/Plans';
import ResponsiveAppBar from './Components/ResponsiveAppBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AssignCleanersCars from './Components/AssignCleanersCars';

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
      element: <ShowAllCleaners />
    },
    {
      path: '/clients',
      element: <ShowAllClients />
    },
    {
      path: '/registerClients',
      element: <ClientOnboarding />
    },
    {
      path: '/cardetails',
      element: <Cardetails />
    },
    {
      path: '/plans',
      element: <Plans />
    },
  ])

  return (
    <div className="App" >

      {/* <RouterProvider router={router} /> */}
      <div  >
        <ResponsiveAppBar />
      </div>
      <div  >
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/plans' element={<Plans />} />
          <Route path='/cardetails' element={<Cardetails />} />
          <Route path='/registerClients' element={<ClientOnboarding />} />
          <Route path='/clients' element={<ShowAllClients />} />
          <Route path='/cleaners' element={<ShowAllCleaners />} />
          <Route path='/webcam' element={<CustomWebcam />} />
          <Route path='/register' element={<CleanerOnboarding />} />
          <Route path='/mapcleaners' element={<AssignCleanersCars/>} /> 
        </Routes>
      </div>

    </div>
  );
}

export default App;
