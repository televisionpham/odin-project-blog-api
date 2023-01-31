import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/Rootlayout";
import { Home, Login, Post } from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="/post/:id" element={<Post />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
