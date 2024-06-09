import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signUpWithEmail } from "../api/auth";
import { useUser } from "~/context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const { setUser } = useUser();

  const handleSignUp = async () => {
    if (password === reEnterPassword) {
      await signUpWithEmail({ email, password });
      navigate("/calculator");
    } else {
      setError("Password is incorrect");
    }
  };
  onAuthStateChanged(auth, (result) => {
    if (result) {
      setUser({
        email: result.email ?? "",
        id: result.uid,
        name: result?.displayName ?? "",
      });
    }
  });
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 w-80 border rounded-lg ">
        <h1 className="text-center text-xl font-semibold">Login</h1>
        <div className="flex flex-col items-center">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-60 border rounded-full my-2 p-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-60 border rounded-full my-2 p-2"
          />
          <input
            type="password"
            placeholder="Re-enter password"
            value={reEnterPassword}
            onChange={(e) => setReEnterPassword(e.target.value)}
            className="w-60 border rounded-full my-2 p-2"
          />
          <div className="text-red-500">{error}</div>
          <button
            onClick={handleSignUp}
            className="bg-blue-500 text-white p-2 rounded-full w-24"
          >
            Sign-up
          </button>
        </div>
      </div>
    </div>
  );
}
