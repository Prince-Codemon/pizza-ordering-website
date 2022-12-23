import React, { useState } from "react";
import styles from "../../styles/Login.module.css";
import { useRouter } from "next/router";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const HOST = process.env.HOSTNAME;
  
  const handleClick = async () => {
    try {
      const login = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
       login.status === 200 && router.push("/admin");

    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>

        <input
          type="text"
          placeholder="John Doe"
          className={styles.input}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          className={styles.input}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className={styles.button} onClick={handleClick}>
          Sign In
        </button>
        {
            error && <p className={styles.error}>Invalid username or password</p>
        }
      </div>
    </div>
  );
};

export default Login;
