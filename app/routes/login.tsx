import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { googleLogin, loginWithEmail } from "../api/auth";
import { useUser } from "~/context/UserContext";
import { toast } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const { user, setUser } = useUser();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await loginWithEmail({ email, password });
      navigate("/calculator");
      toast.success('You have sucessfully logged in!');
    } catch (err) {
      setError("Failed to login. Please check your credentials and Try again."); // Set error message on failure
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

  useEffect(() => {
    if (user) {
      navigate("/calculator");
    }
  }, [navigate, user]);

  const handleLoginWithGoogle = async () => {
    try {
      await googleLogin();
      navigate("/calculator");
      toast.success('You have sucessfully logged in with google credentials!');
    } catch (err) {
      setError("Google login failed! Please check your credential.");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 w-80 border rounded-lg ">
        <h1 className="text-center text-xl font-semibold">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}{" "}
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
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white p-2 rounded-full w-24 hover:bg-blue-700"
          >
            Login
          </button>

          <div className="flex gap-2 mt-4">
            {
              <button
                onClick={handleLoginWithGoogle}
                className="bg-purple-500 text-white p-2 rounded-full w-32 hover:bg-purple-700"
              >
                Google Login
              </button>
            }
            {
              <button
                onClick={() => navigate("/signup")}
                className="bg-gray-500 text-white p-2 rounded-full w-32 hover:bg-gray-700"
              >
                Sign-up
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
