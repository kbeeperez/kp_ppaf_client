import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./assets/styles/index.css";
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import Landing from './components/Landing.jsx';
import Authentication from './components/Authentication.jsx';
import axios from 'axios';

axios.defaults.baseURL="http://127.0.0.1:8000"

const theme = createTheme({
  /** Your theme override here */
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <MantineProvider theme={theme}><Root/></MantineProvider>,
    /*errorElement: <ErrorPage />,*/
    children: [
      {
        path: "/",
        element: <Landing/>,
      },
      {
        path: "/auth/",
        element: <Authentication/>,
      },
      {
        path: "/auth/create",
        element: <Authentication signin='register'/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
