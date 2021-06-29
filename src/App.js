import { useContext } from "react";
import { AuthContext } from "./context/AuthContextProvider";


import Login from "./pages/login/login";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/home/home";
import Admin from './pages/admin/admin'
import AddCustomer from "./pages/addCustomer/addCustomer";
import EditPage from './pages/editPage/editPage'
import SingleCustomer from './pages/singleCustomer/singleCustomer'

const adminRoutes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/admin",
    component: Admin,
  },
  {
    path: "/add-new-customer",
    component: AddCustomer,
  },
  {
    path: "/edit/:id",
    component: EditPage,
  },
  {
    path: "/customer/:id",
    component:SingleCustomer
  },
];

const userRoutes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/",
    component: Login,
  },
  {
    path: "/add-new-customer",
    component: AddCustomer,
  },
  {
    path: "/edit/:id",
    component:EditPage
  }
];
const publicRoutes = [
  {
    path: "/",
    component: Login,
  },
 
];

function App() {
  const { user }  = useContext(AuthContext);
  console.log(user.role)
  return (
    <Switch>
      {user &&
        user.role === "ADMIN" &&
        adminRoutes.map((el, index) => (
          <Route key={index} exact path={el.path} component={el.component} />
        ))}
      {user &&
        user.role === "USER" &&
        userRoutes.map((el, index) => (
          <Route key={index} exact path={el.path} component={el.component} />
        ))}

      {!user && 
        publicRoutes.map((el, index) => (
          <Route key={index} exact path={el.path} component={el.component} />
        ))}
      <Redirect to="/" />
    </Switch>
  );
}

export default App;

// {
//   user &&
//     user.role === "USER" &&
//     userRoutes.map((el, index) => (
//       <Route key={index} exact path={el.path} component={el.component} />
//     ));
// }