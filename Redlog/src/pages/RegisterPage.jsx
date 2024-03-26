import { useState } from "react";

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  async function register(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ userName, userPassword }),
      headers: { "Content-Type": "application/json" },
    });
    if(response.status !== 200 ){
      alert('Registeration failed..');
    }else{
      alert('Registeration Successfull.!!.');
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        value={userPassword}
        onChange={(e) => {
          setUserPassword(e.target.value);
        }}
      />
      <button>Register</button>
    </form>
  );
}
