import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './Components/Header.jsx'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Solution from './create-ans/Solution.jsx'
import Footer from './Components/Footer.jsx'
import SolutionImage from './solution-image/SolutionImage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path:'/create-ans',
    element:<Solution/>,
  },
  {
      path:'/solution-image',
      element:<SolutionImage/>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
    
    <RouterProvider router={router} />
    
  </StrictMode>,
);
