import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useLocation, useNavigate } from "react-router-dom";

function User() {
  const [users, setUsers] = useState();
  const location = useLocation();
  const axios = useAxios(location);

  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response = await axios.get("/employees", {
          signal: controller.signal,
        });

        isMounted && setUsers(response.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getUser();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h1>Users List</h1>
      {users?.length ? (
        users?.map((user, i) => {
          return (
            <ul key={i}>
              <li>{user?.firstname}</li>
            </ul>
          );
        })
      ) : (
        <p>NO user display</p>
      )}
    </article>
  );
}

export default User;
