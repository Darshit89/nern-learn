import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../components/RootLayout";
import Login from "../components/Login";
import Register from "../components/Register";
import LinkPage from "../components/LinkPage";
import Missing from "../components/Missing";
import Unauthorized from "../components/Unauthorized";
import Home from "../components/Home";
import RequireAuth from "./RequireAuth";
import Lounge from "../components/Lounge";
import Admin from "../components/Admin";
import Editor from "../components/Editor";
import PersistLogin from "../components/PersistLogin";

const ROLES = {
  user: 2001,
  editor: 1986,
  admin: 5150,
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="linkpage" element={<LinkPage />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="editor" element={<Editor />} />
        </Route>
      </Route>
      <Route path="*" element={<Missing />} />
    </Route>
  )
);
