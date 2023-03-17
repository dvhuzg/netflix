import Input from "../components/Input";
import { useState, useCallback } from "react";
import { P } from "../../ft-base-client/src/components/NotFoundPage/P";
const Auth = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variants, setVariants] = useState("");

  const toggleVariants = useCallback(() => {
    setVariants((currentVariants) =>
      currentVariants === "login" ? "register" : "login"
    );
  }, []);
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no- bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variants === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variants === "register" && (
                <Input
                  id="username"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserName(e.target.value)
                  }
                  value={userName}
                  label="Username"
                />
              )}

              <Input
                id="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                value={email}
                label="Email"
              />
              <Input
                id="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                value={password}
                label="Password"
              />
              <button className="bg-red-500 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                {variants === "login" ? "Login" : "Sign up"}
              </button>
              <p className="text-neutral-500 mt-12">
                {variants === "login"
                  ? "First time using Netflix?"
                  : "Already have an account?"}
                <span
                  onClick={toggleVariants}
                  className="text-white ml-1 hover:underline cursor-pointer">
                  {variants === "login" ? "Create an account" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
