import React from 'react'

import {createBrowserRouter,} from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import MyJobs from '../pages/MyJobs';
import SalaryPage from '../pages/SalaryPage';
import CreateJob from '../pages/CreateJob';
import UpdateJob from '../pages/UpdateJob';
import JobDetails from '../pages/JobDetails';
import Login from '../pages/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import SignUp from '../pages/SignUp';
import Dashboard from '../components/Dashboard/Dashboard';
import ManageProfile from '../components/ManageProfile/ManageProfile';
import TestingQR from '../pages/TestingQR/TestingQR';
import ApprovedJobs from '../components/Dashboard/ApprovedJobs';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/my-job",
            element: <PrivateRoute><MyJobs/></PrivateRoute>
        },
        {
            path: "/salary",
            element: <SalaryPage/>
        },
        {
          path: "/post-job",
          element: <PrivateRoute><CreateJob/></PrivateRoute>
        },
        {
          path: "edit-job/:id",
          element: <UpdateJob/>,
          loader: ({params}) => fetch(`https://job-polar-server.vercel.app/all-jobs/${params.id}`)
        },
        {
          path: "details/:id",
          element: <ApprovedJobs/>,
          loader: ({params}) => fetch(`https://job-polar-server.vercel.app/all-jobs/${params.id}`)
        },
        {
          path:"/dashboard",
          element: <PrivateRoute><Dashboard/></PrivateRoute>,
        },
        {
          path:"/manage-profile",
          element: <PrivateRoute><ManageProfile/></PrivateRoute>,
        },
        {
          path:"/jobs/:id",
          element: <PrivateRoute><JobDetails/></PrivateRoute>,
        }
      ]
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/test",
      element: <TestingQR/>
    },
    {
      path: "/sign-up",
      element: <SignUp/>
    },
  ]);

  export default router;