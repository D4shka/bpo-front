import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

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

function LoginPage() {
  const { mode } = useContext(WindmillContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [data, setData] = useState([]);
  const [user, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.116:8080/api/auth/login"
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
      fetch(`http://192.168.1.116:8080/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }).then((res) => {
        const myRes = res as MyResponse;
        if (myRes.status === 200) {
          myRes.json().then((d) => {
            console.log("res", res);
            localStorage.setItem("accessToken", d.accessToken);
            router.push("/example");
          });
        }
      });
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
