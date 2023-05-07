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
import CTA from "example/components/CTA";
import PageTitle from "example/components/Typography/PageTitle";
import SectionTitle from "example/components/Typography/SectionTitle";

import Layout from "example/containers/Layout";
import { MailIcon } from "icons";
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

  const branchesOption: BranchesOption[] = [
    { id: 0, name: "Сонгох" },
    { id: 1, name: "Хилийн застав" },
  ];

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const addSoldier = async () => {
    try {
      fetch(`http://192.168.1.116:8080/api/users/soldiers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(user),
      }).then((res) => {
        const myRes = res as MyResponse;
        if (myRes.status === 200) {
          router.push("/example");
          alert("Амжилттай нэмлээ");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <SectionTitle>Цэрэг нэмэх</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">
        <Label>
          <span>Овог</span>
          <Input
            className="mt-1"
            placeholder=""
            name="lastname"
            onChange={(e) => handleChange(e)}
          />
        </Label>

        <Label>
          <span>Нэр</span>
          <Input
            className="mt-1"
            placeholder=""
            name="firstname"
            onChange={(e) => handleChange(e)}
          />
        </Label>

        <Label className="mt-4">
          <span>Цэргийн анги</span>
          <Select
            className="mt-1"
            onChange={(e) => handleChange(e)}
            name="branch"
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
              onChange={(e) => handleChange(e)}
              name="rank"
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

        <div className="px-6 my-6">
          <Button
            onClick={addSoldier}
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
