import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ChaletOwner() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchdata = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}chalet/owner`, {
        headers: {
          Authorization: token
        }
      });
      if (response.data.status === "success") {
        setData(response.data.data);

      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 404) {
        setError("The requested resource was not found.");
      } else {
        setError("An error occurred while fetching data. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  if (error) {
    return (
      <div>
        <h1>Oops!</h1>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Chalet Owner</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}