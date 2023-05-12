import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accessToken: string;
}
interface MyResponse extends Response {
  accessToken?: string;
}

import {
  Label,
  Input,
  Button,
  WindmillContext,
} from "@roketid/windmill-react-ui";
import { GithubIcon, TwitterIcon } from "icons";
import backgroundImage from "../../public/assets/img/backgroundImage.jpeg";
import introBg2 from "../../public/assets/img/introBg2.jpeg";
import introBg3 from "../../public/assets/img/introBg3.jpg";
import { toast } from "react-toastify";

function LoginPage() {
  const { mode } = useContext(WindmillContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [data, setData] = useState([]);
  const [user, setUsers] = useState([]);

  useEffect(() => {
    toast.success("This is a success toast!");
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.167:8080/api/auth/login"
      );
      // setUsers(response);
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      let item = { email, password };

      const emailRegex =
        /(?:[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

      if (!emailRegex.test(email)) {
        console.log("Invalid email format");
        return;
      }

      const passwordRegexList = [
        { pattern: /.*[0-9].*/, message: "Password must contain one digit." },
        {
          pattern: /.*\S+$.*/,
          message: "Password must contain no whitespace.",
        },
        {
          pattern: /.*\W.*/,
          message: "Password must contain one special character.",
        },
        {
          pattern: /^.{6,30}$/,
          message: "Password must be between 6 and 30 characters.",
        },
      ];

      let isValidPassword = true;
      for (const { pattern, message } of passwordRegexList) {
        if (!pattern.test(password)) {
          toast.error(message);
          console.log(message);
          isValidPassword = false;
          break;
        }
      }

      if (!isValidPassword) {
        return;
      }

      const response = await fetch(`http://192.168.1.167:8080/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (response.status === 200) {
        const data = await response.json();
        toast.success("Login successful!");
        console.log("res", response);
        localStorage.setItem("accessToken", data.accessToken);
        router.push("/example");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [background, setBackground] = useState<StaticImageData>(introBg3);
  // const [images] = useState<(string | StaticImageData)[]>([
  //   backgroundImage,
  //   introBg2,
  //   introBg3,
  // ]);
  // const [index, setIndex] = useState<number>(0);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const nextIndex = (index + 1) % images.length;
  //     setBackground(images[nextIndex] as StaticImageData);
  //     setIndex(nextIndex);
  //   }, 3000);

  //   return () => clearInterval(intervalId);
  // }, [index, images]);

  const imgSource =
    mode === "dark"
      ? "/assets/img/login-office-dark.jpeg"
      : "/assets/img/login-office.jpeg";

  return (
    <div
      className="object-cover w-full h-full"
      style={{
        backgroundImage: `url(${background.src})`,
        zIndex: -1,
        position: "absolute",
      }}
    >
      <ToastContainer />
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden">
        <div className="flex overflow-y-auto md:flex-row justify-center items-center">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2 border border-[#ffffff] bg-[#ffffff] bg-opacity-20 rounded-lg mt-[100px]">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-sans text-gray-700">Нэвтрэх</h1>

              <Label>
                <span>Имейл</span>
                <Input
                  className="mt-1"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                />
              </Label>

              <Label className="mt-4">
                <span>Нууц үг</span>
                <Input
                  className="mt-1"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="***************"
                />
              </Label>

              <Link href="" passHref={true}>
                <Button
                  className="mt-4 bg-[#015A02] active:bg-[#015A02] hover:bg-[#015A02] focus:ring-[#015A02]"
                  onClick={login}
                  block
                >
                  Нэвтрэх
                </Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
