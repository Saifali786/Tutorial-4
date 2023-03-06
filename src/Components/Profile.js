// Reference: https://www.freecodecamp.org/news/search-and-filter-component-in-reactjs/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Profile.css";

export default function Profile() {
  const [userList, setUserList] = useState([]);
  const [query, setQuery] = useState("");
  const [searchParam] = useState(["name"]);
  const navigate = useNavigate();
  useEffect(function a() {
    async function getUsers() {
      const promise = await fetch("https://express-t4.onrender.com/api/users");
      const response = promise.json();
      return response;
    }
    getUsers().then((data) => {
      setUserList(data);
    });
  });

  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1
        );
      });
    });
  }

  function handleClick(e) {
    console.log(e.target);
    var id = e.target.getAttribute("data-value");
    console.log(id);
    navigate("/user-profile", {
      state: { id: id },
    });
  }

  return (
    <div className="container-list">
      <div className="search-input">
        <label htmlFor="search-form">
          <input
            type="search"
            name="search-form"
            style={{ width: "100%" }}
            placeholder="Search for Name ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <ul className="card-grid">
        {search(userList).map((item) => (
          <li>
            <article className="card" key={item._id}>
              <div className="card-image">
                <img
                  src={item.picture}
                  alt={item.name}
                  data-value={item._id}
                  onClick={handleClick}
                />
              </div>
              <div className="card-content">
                <ol className="card-list">
                  <li style={{ textAlign: "left", fontWeight: "bold" }}>
                    Name: <span style={{ fontWeight: "100" }}>{item.name}</span>
                  </li>
                  <li style={{ textAlign: "left" }}>
                    Email:{" "}
                    <span style={{ fontWeight: "100" }}>{item.email}</span>
                  </li>
                  <li style={{ textAlign: "left" }}>
                    Age: <span style={{ fontWeight: "100" }}>{item.age}</span>
                  </li>
                </ol>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
