import React, { useContext, useEffect } from 'react';
import { Globals } from './content_1';

const GetUserInfo = () => {
  const { uniqueID, hostname } = useContext(Globals);

  useEffect(() => {
    if (uniqueID !== null) {
      const GetUserData = () => {
        fetch(`${hostname}/GetUserData`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'uniqueID': uniqueID }),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((data) => {
            const response = data;
            //console.log(response);
            localStorage.setItem("userDATA",JSON.stringify(response))
          })
          .catch((err) => {
            console.log('Error fetching the user Array:', err);
          });
      };
      GetUserData();
    }
  }, [uniqueID, hostname]);

  return null; // or return any JSX if necessary
};

export default GetUserInfo;
