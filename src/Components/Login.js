import { Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  let errorFlag = 0;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    const formValue = {
      email,
      password,
    };
    setError(validateForm(formValue));
    if (
      errorFlag === 0 &&
      email === "testemail@dal.ca" &&
      password === "Test@123"
    ) {
      async function sendPostRequest() {
        const promise = await fetch(
          "https://express-t4.onrender.com/api/login",
          {
            method: "POST",
            body: JSON.stringify({
              username: "testemail@dal.ca",
              password: "Test@123",
            }),

            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        const response = promise.json();
        return response;
      }
      sendPostRequest().then((data) => {
        console.log(data.message);
        if (data.message === "Login success!") {
          navigate("/profile-list");
        } else {
          alert("Wrong credentials");
        }
      });
      setEmail("");
      setPassword("");
    } else {
      alert("Incorrect email/password");
    }
  };

  const validateForm = (data) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/; //Reference : https://regexr.com/3e48o
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //Reference: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    const errorMessage = {};
    if (data.email === "" || emailRegex.test(data.email) == false) {
      errorFlag = 1;
      errorMessage.email = "Email is not valid";
    } else if (passwordRegex.test(data.password) == false) {
      errorFlag = 1;
      errorMessage.password =
        "Password must be more than 8 characters, must have at least one uppercase letter, one lowercase letter, one number and one special character";
    } else {
      errorFlag = 0;
    }
    return errorMessage;
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="center-screen"
      >
        <Card
          style={{ width: "30rem", height: "27rem", backgroundColor: "black" }}
        >
          <Card.Body>
            <h2 className="text-center mb-4" style={{ color: "white" }}>
              Login
            </h2>
            <Form onSubmit={handleSubmit}>
              <div style={{ textAlign: "left" }}>
                <Form.Group id="email">
                  <Form.Label style={{ color: "white" }}>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onSubmit={handleSubmit}
                    required
                  />
                  <FormHelperText style={{ color: "red" }}>
                    {error.email}
                  </FormHelperText>
                </Form.Group>
              </div>
              <div style={{ textAlign: "left" }}>
                <Form.Group id="password">
                  <Form.Label style={{ color: "white" }}>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onSubmit={handleSubmit}
                    required
                  />
                  <FormHelperText style={{ color: "red" }}>
                    {error.password}
                  </FormHelperText>
                </Form.Group>
              </div>
              <Button
                style={{ marginTop: "30px", width: "100%" }}
                type="submit"
              >
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
