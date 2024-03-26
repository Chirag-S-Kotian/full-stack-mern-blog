import { useContext,useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../component/UserContex";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext)

  async function login(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ userName, userPassword }),
      headers: { "Content-Type": "application/json" },
      credentials:'include',
    });
    if (response.ok) {
      response.json().then(userInfo =>{
        setUserInfo(userInfo);
        setRedirect(true);
      })
    }else{
      alert('Wrong credentials..!');
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
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
      <button>Login</button>
    </form>
  );
}
