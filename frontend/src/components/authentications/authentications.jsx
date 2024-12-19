import { useState } from "react";
import "./authentications.css";

export default function Authentications({
  login,
  setLogin,
  setDisplayLogin,
  displayLogin,
  baseUrl,
  setUserLoggedIn,
  setUserMovies,
}) {
  const [undefinedField, setUndefinedField] = useState(""); //To know which field is missed by user while entering the details

  //to handle user login

  const [loginDetails, setLoginDetails] = useState({
    name: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(false); //Check for any login error
  const [loginMsg, setLoginMsg] = useState(false);
  const handleAuthentications = async (e) => {
    e.preventDefault();

    console.log("login:", loginDetails);

    for (const key in loginDetails) {
      if (loginDetails[key] == "") {
        setUndefinedField(key);
        return;
      }
    }
    setUserLoggedIn(loginDetails);
    setUndefinedField("");
    console.log(user);
    setLoginMsg(true);
    try {
      const res = await fetch(baseUrl + "/get-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      if (data == "user not found") {
        setLoginError(true);
        return;
      }

      setUserMovies(data);
      setLoginMsg(false); //When the data is fetched from the Api the msg disaapears
      setLoginError(false);

      console.log("login user movies: ", data);
      setDisplayLogin(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoginDetails({
        name: "",
        password: "",
      });
    }
  };

  //to handle sign in
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const createUser = async (e) => {
    e.preventDefault();
    for (const key in user) {
      if (user[key] == "") {
        setUndefinedField(key);
        return;
      }
      setUndefinedField("");
    }
    try {
      const res = await fetch(baseUrl + "/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }
      setLogin(true);
    } catch (error) {
      console.error(error);
    } finally {
      setUser({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div
      className="authentication"
      style={{ display: displayLogin ? "flex" : "none" }}
    >
      <span className="header">N</span>
      {undefinedField && <span>{`Undefined Field ${undefinedField}`}</span>}
      {loginError && <span>Invalid Username or Password</span>}
      {loginMsg && <span>Please wait...We are fetching your data</span>}
      {login && (
        <div className="login-form">
          <form action="" className="login">
            <input
              type="text"
              placeholder="Enter your name: "
              value={loginDetails["name"]}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Enter the password: "
              value={loginDetails["password"]}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, password: e.target.value })
              }
            />
            <button onClick={(e) => handleAuthentications(e)}>Login</button>
          </form>
          <a href="#" onClick={() => setLogin(false)}>
            new user? Sign in!
          </a>
        </div>
      )}
      {!login && (
        <div className="signin-form">
          <form action="" className="signin">
            <input
              type="text"
              placeholder="Enter your Name: "
              value={user["name"]}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Enter your email: "
              value={user["email"]}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Enter the password: "
              value={user["password"]}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button onClick={(e) => createUser(e)}>Sign in</button>
          </form>
          <a href="#" onClick={() => setLogin(true)}>
            existing user? Login!
          </a>
        </div>
      )}
    </div>
  );
}
