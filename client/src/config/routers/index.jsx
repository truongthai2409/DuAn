import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routers from "./routers";

const AppRouter = () => {
  const router = createBrowserRouter(routers);
  return (
    <RouterProvider fallbackElement={"loading..."} router={router} />
  );
};

export default AppRouter;