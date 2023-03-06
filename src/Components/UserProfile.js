//Reference: https://bbbootstrap.com/snippets/reactjs-user-profile-list-items-92852280

import "./UserProfile.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function UserProfile() {
  const { state } = useLocation();
  const { id } = state;
  const [userData, setUserData] = useState("");

  useEffect(function a() {
    async function getUserId() {
      const promise = await fetch(
        `https://express-t4.onrender.com/api/users/${id}`
      );
      const response = promise.json();
      return response;
    }
    getUserId().then((data) => {
      setUserData(data);
    });
  });
  return (
    <>
      <div className="container">
        <div className="card_profile">
          <div>
            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
              Profile Page
            </h2>
            <br></br>
            <div className="profile_details">
              <h5>
                <span style={{ fontWeight: "bold" }}>Name: </span>
                {userData.name}
              </h5>
              <br></br>
              <h5>
                <span style={{ fontWeight: "bold" }}>Email: </span>
                {userData.email}
              </h5>

              <br></br>
              <h5>
                <span>
                  <h5 style={{ display: "inline", fontWeight: "bold" }}>
                    About:{" "}
                  </h5>
                </span>
                <p style={{ display: "inline", fontSize: "1.25rem" }}>
                  {userData.about}
                </p>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
