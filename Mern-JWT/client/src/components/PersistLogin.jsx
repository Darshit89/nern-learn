import React, { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuth } from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import { useLocalState } from "../hooks/useLocalStorage";

function PersistLogin() {
  const [loading, setLoading] = useState(true);
  const [persist] = useLocalState("persist");

  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const verifyRefreshToken = async () => {
    try {
      await refresh();
    } catch (err) {
      console.log("err: ", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    !auth.acessToken ? verifyRefreshToken() : setLoading(false);
  }, []);

  return (
    <div>{persist ? loading ? <p>loading...</p> : <Outlet /> : <Outlet />}</div>
  );
}

export default PersistLogin;
