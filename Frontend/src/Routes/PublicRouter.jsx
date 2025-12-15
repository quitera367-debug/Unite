import toast from "react-hot-toast";
import { useAuth } from "../Contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";


const PublicRouter = () => {
    const { profileData ,loading} = useAuth();

  if(loading){
   toast.loading("loading...");
  }
  if (profileData) {
     toast.dismiss();
   return <Navigate to="/list" replace />;
  } else {
     toast.dismiss();

    return <><Outlet/></>;
  }
};

export default PublicRouter;