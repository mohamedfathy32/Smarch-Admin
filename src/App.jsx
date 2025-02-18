import { RouterProvider } from "react-router-dom";
import { router } from "./utils/routes";
import { NotificationProvider } from "../Context/NotificationContext";

function App() {
  return (
    <>
    <NotificationProvider>
    <RouterProvider router={router} />

    </NotificationProvider>
    </>
  );
}

export default App;
