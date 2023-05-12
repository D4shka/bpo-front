import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Input,
  HelperText,
  Label,
  Select,
  Textarea,
} from "@roketid/windmill-react-ui";
import SectionTitle from "example/components/Typography/SectionTitle";

import Layout from "example/containers/Layout";
import { Button } from "@roketid/windmill-react-ui";
interface MyResponse extends Response {
  accessToken?: string;
}

interface RankOption {
  id: number;
  name: string;
}

interface BranchesOption {
  id: number;
  name: string;
}

function Forms() {
  const router = useRouter();
  const [user, setUser] = useState({});

  const rankOptions: RankOption[] = [
    { id: 0, name: "Сонгох" },
    { id: 1, name: "Байлдагч" },
    { id: 2, name: "Ахлах байлдагч" },
    { id: 3, name: "Дэд түрүүч" },
    { id: 4, name: "Түрүүч" },
    { id: 5, name: "Ахлах түрүүч" },
    { id: 6, name: "Дэд ахлагч" },
    { id: 7, name: "Ахлагч" },
    { id: 8, name: "Ахмад" },
    { id: 9, name: "Ахлах ахлагч" },
    { id: 10, name: "Дэслэгч" },
    { id: 11, name: "Ахлах дэслэгч" },
    { id: 12, name: "Ахмад" },
    { id: 13, name: "Хошууч" },
    { id: 14, name: "Дэд хурандаа" },
    { id: 15, name: "Хурандаа" },
  ];

  const nameRegex = /^[A-Za-zА-Яа-яөүӨҮёЁ. -]*$/;
  const emailRegex =
    /(?:[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const [regexErrors, setRegexErrors] = useState({
    firstname: false,
    lastname: false,
    password: false,
    email: false,
  });

  const branchesOption: BranchesOption[] = [
    { id: 0, name: "Сонгох" },
    { id: 1, name: "Хилийн застав" },
  ];

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    switch (e.target.name) {
      case "firstname":
        if (nameRegex.test(e.target.value) && e.target.value !== "")
          setRegexErrors({ ...regexErrors, [e.target.name]: true });
        else setRegexErrors({ ...regexErrors, [e.target.name]: false });
        // toast.notify("Invalid name", {
        //   type: "error",
        // });
        break;
      case "lastname":
        if (nameRegex.test(e.target.value) && e.target.value !== "")
          setRegexErrors({ ...regexErrors, [e.target.name]: true });
        else setRegexErrors({ ...regexErrors, [e.target.name]: false });
        break;
      case "email":
        console.log("EMAIL", e.target.value);
        if (emailRegex.test(e.target.value) && e.target.value !== "")
          setRegexErrors({ ...regexErrors, [e.target.name]: true });
        else setRegexErrors({ ...regexErrors, [e.target.name]: false });
        break;
      case "password":
        if (nameRegex.test(e.target.value) && e.target.value !== "")
          setRegexErrors({ ...regexErrors, [e.target.name]: true });
        else setRegexErrors({ ...regexErrors, [e.target.name]: false });
        break;
      case "":
        if (nameRegex.test(e.target.value) && e.target.value !== "")
          setRegexErrors({ ...regexErrors, [e.target.name]: true });
        else setRegexErrors({ ...regexErrors, [e.target.name]: false });
        break;
      case "":
        if (nameRegex.test(e.target.value) && e.target.value !== "")
          setRegexErrors({ ...regexErrors, [e.target.name]: true });
        else setRegexErrors({ ...regexErrors, [e.target.name]: false });
        break;
      default:
    }
  };

  // try {
  //   const nameRegex = /([A-Za-zА-Яа-яөүӨҮёЁ. -]+)/;
  //   if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
  //
  // setRegexErrors({ ...regexErrors, [e.target.name]: true });
  // else setRegexErrors({ ...regexErrors, [e.target.name]: false });
  //     return;
  //   }

  const addUser = async () => {
    let pass = true;
    try {
      (Object.keys(regexErrors) as (keyof typeof regexErrors)[]).forEach(
        (key) => {
          if (!regexErrors[key]) pass = false;
        }
      );
      if (!pass) return;
      fetch(`http://192.168.1.116:8080/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(user),
      }).then((res) => {
        const myRes = res as MyResponse;
        if (myRes.status === 200) {
          alert("Амжилттай нэмлээ");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <SectionTitle>Хэрэглэгчийн мэдээлэл</SectionTitle>
      {/* <Loader /> */}
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md ">
        <Label>
          <span>Овог</span>
          <Input
            className="mt-1"
            placeholder=""
            valid={regexErrors.lastname}
            style={{ color: regexErrors.lastname ? "black" : "red" }}
            name="lastname"
            onChange={(e) => handleChange(e)}
          />
        </Label>

        <Label>
          <span>Нэр</span>
          <Input
            className="mt-1"
            placeholder=""
            valid={regexErrors.firstname}
            style={{ color: regexErrors.firstname ? "black" : "red" }}
            name="firstname"
            onChange={(e) => handleChange(e)}
          />
        </Label>
        <Label>
          <span>Имейл</span>
          <Input
            className="mt-1"
            placeholder=""
            valid={regexErrors.email}
            style={{ color: regexErrors.email ? "black" : "red" }}
            name="email"
            onChange={(e) => handleChange(e)}
          />
        </Label>

        <Label>
          <span>Нууц үг</span>
          <Input
            className="mt-1"
            placeholder="********"
            valid={regexErrors.password}
            style={{ color: regexErrors.password ? "black" : "red" }}
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </Label>

        <Label className="mt-4">
          <span>Цэргийн анги</span>
          <Select
            className="mt-1"
            name="branch"
            onChange={(e) => handleChange(e)}
          >
            {branchesOption.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
        </Label>

        <Label className="mt-4">
          <Label className="mt-4">
            <span>Цол</span>
            <Select
              className="mt-1"
              name="rank"
              onChange={(e) => handleChange(e)}
            >
              {rankOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
          </Label>
        </Label>

        <Label className="mt-4">
          <div className="w-full">
            <span>Зураг</span>
            <input
              className="border border-gray-400 py-2 px-4 w-full rounded-md"
              id="image-upload"
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </Label>
        {/* 
        <Label className="mt-4">
          <span>Message</span>
          <Textarea
            className="mt-1"
            rows={3}
            placeholder="Enter some long form content."
          />
        </Label> */}
        <div className="px-6 my-6">
          <Button
            onClick={addUser}
            className="bg-[#015A02] active:bg-[#015A02] hover:bg-[#015A02] focus:ring-[#015A02]"
          >
            Бүртгэх
            <span className="ml-2" aria-hidden="true">
              +
            </span>
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default Forms;
