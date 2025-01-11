import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch("http://localhost:5173/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [getAccessTokenSilently]);

  return (
    <div>
      <h1>Dashboard</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
