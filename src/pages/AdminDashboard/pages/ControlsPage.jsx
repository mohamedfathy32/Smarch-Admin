import axios from 'axios';
import React from 'react'

export default function ControlsPage() {
  const fatchdata = async () => {
    const response = await axios.get('https://smarch-back-end-nine.vercel.app/reservation',{
      headers: {
        authorization: token
    },
    });
    console.log(response.data);
  }
  return (
      <div>ControlsPage
        <button onClick={fatchdata}>Fetch Data</button>
      </div>  
  )
}
