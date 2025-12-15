import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Room from "../Pages/Room";
import List from "../Pages/List";
import Profile from "../Pages/Profile";
import Auth from "../Pages/Auth";
import Register from "../Components/Auth/Register";
import Login from "../Components/Auth/Login";
import CheckEmail from "../Components/Auth/CheckEmail";
import OtpVerification from "../Components/Auth/OtpVerification";
import CreateNewPassword from "../Components/Auth/CreateNewPassword";
import EditProfile from "../Components/Profile/EditProfile";
import AddRoom from "../Components/List/AddRoom";
import UploadRoom from "../Components/Room/UploadRoom";
import Content from "../Components/Room/Content";
import MemberList from "../Components/Room/MemberList";
import PlayRoom from "../Components/Room/PlayRoom";
import ContentList from "../Components/Room/ContentList";
import PrivateRoute from "./PrivateRoute";
import PublicRouter from "./PublicRouter";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<PublicRouter />}>
        <Route path="" element={<Home />}></Route>
        <Route path="/auth" element={<Auth />}>
          <Route path="" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="check" element={<CheckEmail />}></Route>
          <Route path="verify" element={<OtpVerification />}></Route>
          <Route path="create" element={<CreateNewPassword />}></Route>
        </Route>
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/list" element={<List />}></Route>
        <Route path="/add" element={<AddRoom />}></Route>
        <Route path="/user" element={<Profile />}></Route>
        <Route path="/edit" element={<EditProfile />}></Route>
        <Route path="/room/:id" element={<Room />}>
          <Route path="" element={<PlayRoom />}></Route>
          <Route path="/room/:id/contents" element={<ContentList />}></Route>
          <Route path="/room/:id/members" element={<MemberList />}></Route>
        </Route>
        <Route path=":id/upload" element={<UploadRoom />}></Route>
        <Route path="/rooms/:id/:vid" element={<Content />}></Route>
      </Route>
    </Route>
  )
);
