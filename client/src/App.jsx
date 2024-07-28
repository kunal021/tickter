import Home from "./components/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Events from "./pages/Events";
import Auth from "./pages/Auth";
import { UserProvider } from "./contex";
import { Toaster } from "react-hot-toast";
import RequireAuth from "./components/RequireAuth";
import GetSessions from "./components/GetSessions";
import GetWeather from "./components/GetWeather";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/events",
        element: (
          <RequireAuth>
            <Events />
          </RequireAuth>
        ),
      },
      {
        path: "/sessions",
        element: (
          <RequireAuth>
            <GetSessions />
          </RequireAuth>
        ),
      },
      {
        path: "/weather",
        element: (
          <RequireAuth>
            <GetWeather />
          </RequireAuth>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <Toaster />
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
