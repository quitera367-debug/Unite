import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import { RoomProvider } from "./Contexts/RoomContext";
import { HomeProvider } from "./Contexts/HomeContext";
import { AuthProvider } from "./Contexts/AuthContext";
import { ContentProvider } from "./Contexts/ContentContext";

createRoot(document.getElementById("root")).render(
  <>
    <HomeProvider>
      <AuthProvider>
        <RoomProvider>
          <ContentProvider>
          <RouterProvider router={router} />
          </ContentProvider>
        </RoomProvider>
      </AuthProvider>
    </HomeProvider>
  </>
);
