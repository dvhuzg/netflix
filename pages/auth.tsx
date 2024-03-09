import axios from "axios";
import Input from "../components/Input";
import React, { useState, useCallback } from "react";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import SpinLoading from "@/components/Loading";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variants, setVariants] = useState("login");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasErrorInput, setHasErrorInput] = useState<boolean>(false);

  const toggleVariants = useCallback(() => {
    setVariants((currentVariants) =>
      currentVariants === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    if (!email || !password) {
      setHasErrorInput(true);
    } else {
      try {
        setHasErrorInput(false);
        setIsLoading(true);
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/profiles",
        });
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  }, [email, password]);

  const register = useCallback(async () => {
    if (!email || !password || !name) {
      setHasErrorInput(true);
    } else {
      try {
        setHasErrorInput(false);
        setIsLoading(true);
        await axios.post("/api/register", {
          email,
          name,
          password,
        });

        await login();
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  }, [email, name, password, login]);

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
                <>
                  <Input
                    id="name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                    value={name}
                    label="Name"
                  />
                  {!name && hasErrorInput && (
                    <span className="text-sm text-red-500 mt-[-10px] ml-1 ">
                      Please enter username...
                    </span>
                  )}
                </>
              )}

              <Input
                id="email"
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                value={email}
                label="Email"
              />
              {!email && hasErrorInput && (
                <span className="text-sm text-red-500 mt-[-10px] ml-1 ">
                  Please enter email...
                </span>
              )}

              <Input
                id="password"
                type="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                value={password}
                label="Password"
              />
              {!password && hasErrorInput && (
                <span className="text-sm text-red-500 mt-[-10px] ml-1 ">
                  Please enter password...
                </span>
              )}

              <button
                onClick={variants === "login" ? login : register}
                className="bg-red-500 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              >
                {isLoading ? (
                  <SpinLoading />
                ) : (
                  `${variants === "login" ? "Login" : "Sign up"}`
                )}
              </button>

              <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                <div
                  onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                >
                  <FcGoogle size={30} />
                </div>
                <div
                  onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                >
                  <FaGithub size={30} />
                </div>
              </div>
              <p className="text-neutral-500 mt-12">
                {variants === "login"
                  ? "First time using Netflix?"
                  : "Already have an account?"}
                <span
                  onClick={toggleVariants}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
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
