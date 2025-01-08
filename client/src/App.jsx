import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  AllJobs,
  Stats,
  Profile,
  Admin,
  EditJob,
  CompanyRegistrationForm,
  AddCompany,
  EditCompany,
  CompanyLogin,
  AddCompanyJob,
  AllCompanyJob,
  EditCompanyJob,
  CompanyStats,
} from "./pages";
import { action as Companyaction } from "./pages/CompanyRegistrationForm";
import { action as registeraction } from "./pages/Register";
import { action as loginaction } from "./pages/Login";
import { loader as DashlayoutLoader } from "./pages/DashboardLayout";
import { action as addjobAction } from "./pages/AddJob";
import { loader as alljobloader } from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";
import { action as editJobAction } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { loader as adminLoader } from "./pages/Admin";
import { action as Profileaction } from "./pages/Profile";
import { loader as StatsLoader } from "./pages/Stats";
import { action as CompanyloginAction } from "./pages/CompanyLogin";
import { loader as editCompanyLoader } from "./pages/EditCompany";
import { action as editCompanyAction } from "./pages/EditCompany";
import { action as AddCompanyJobAction } from "./pages/AddCompanyJob";
import { loader as editJobloader } from "./pages/EditCompanyJob";
import {action as EditJobAction} from "./pages/EditCompanyJob"
import {loader as CStatsLoader} from "./pages/CompanyStats"
import {action as deleteCompanyAction} from "./pages/DeleteCompanyJob"
// import {loader as AllCompanyJobLoader} from "./pages/AllCompanyJob"
import { CompanyDetails } from "./components";
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("dark-theme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },

      {
        path: "register",
        element: <Register />,
        action: registeraction,
      },
      {
        path: "company_register",
        element: <CompanyRegistrationForm />,
        action: Companyaction,
      },
      {
        path: "company_login",
        element: <CompanyLogin />,
        action: CompanyloginAction,
      },
      {
        path: "/:id/add-companyJob",
        element: <AddCompanyJob />,
        action: AddCompanyJobAction,
      },
      {
        path:"/company/company-jobs/:id",
        element:<AllCompanyJob/>
      },

      {
        path: "/company/:id",
        element: <CompanyDetails />,
      },
      {
        path: "all-company",
        element: <AddCompany />,
      },
      {
        path: "edit-company/:id",
        element: <EditCompany />,
        loader: editCompanyLoader,
        action: editCompanyAction,
      },
      {
        path:`/:companyId/edit-companyjob/:id`,
        element: <EditCompanyJob />,
        loader: editJobloader,
        action: EditJobAction,
      },
      { 
        path: "/company-jobs/stats/:id", 
        element: <CompanyStats />, 
        loader: CStatsLoader 
      },
      {
        path: `/:companyId/delete-companyjob/:id`,
        action: deleteCompanyAction,
      },

      {
        path: "login",
        element: <Login />,
        action: loginaction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: DashlayoutLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addjobAction,
          },
          ,
          { path: "stats", element: <Stats />, loader: StatsLoader },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: alljobloader,
          },

          {
            path: "profile",
            element: <Profile />,
            action: Profileaction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },

          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: "delete-job/:id",
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
  {
    path: "/error",
    element: <Error />,
  },
  {
    path: "/about",
    element: (
      <div>
        <h1>About us</h1>
      </div>
    ),
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
