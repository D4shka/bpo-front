import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import defaultImg from "../../public/assets/img/defaultAvatar.jpg";

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
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [rank, setRank] = useState(0);
  const [branches, setBranches] = useState(0);
  const [image, setImage] = useState("");

  // const user = localStorage.getItem("user");

  const rankOptions: RankOption[] = [
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
    { id: 1, name: "Хилийн застав" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
    { id: 4, name: "Option 4" },
  ];

  console.log("rank", rank);

  const updateSoldier = async () => {
    try {
      const item = {
        firstname,
        lastname,
        email,
        rank: {
          id: rank,
          name: rankOptions.find((opt) => opt.id === rank)?.name,
        },
        branch: {
          id: branches,
          name: branchesOption.find((opt) => opt.id === branches)?.name,
        },
      };

      fetch(`http://192.168.1.116:8080/api/users/soldiers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(item),
      }).then((res) => {
        const myRes = res as MyResponse;
        if (myRes.status === 200) {
          myRes.json().then((d) => {
            console.log("d", d);
            alert("Амжилттай шинчиллээ");
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <SectionTitle>Хэрэглэгчийн мэдээлэл шинчлэх</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md ">
        <div className="flex justify-center items-center">
          <img
            className="rounded-full w-36 h-36"
            src={defaultImg.src}
            // src={user.image || defaultImg.src}
            alt="Extra large avatar"
          />
        </div>
        <Label>
          <span>Овог</span>
          <Input
            className="mt-1"
            placeholder=""
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Label>

        <Label>
          <span>Нэр</span>
          <Input
            className="mt-1"
            placeholder=""
            onChange={(e) => setLastName(e.target.value)}
            defaultValue={"sdsdsds"}
          />
        </Label>
        <Label>
          <span>Имейл</span>
          <Input
            className="mt-1"
            placeholder=""
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Label>
        <Label>
          <span>Нууц үг</span>
          <Input
            className="mt-1"
            placeholder="********"
            name="password"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Цэргийн анги</span>
          <Select
            className="mt-1"
            onChange={(e) => setBranches(Number(e.target.value))}
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
              onChange={(e) => setRank(Number(e.target.value))}
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
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </Label>

        <div className="px-6 my-6">
          <Button
            onClick={updateSoldier}
            className="bg-[#015A02] active:bg-[#015A02] hover:bg-[#015A02] focus:ring-[#015A02]"
          >
            Хадгалах
            <span className="ml-2" aria-hidden="true">
              +
            </span>
          </Button>
        </div>
      </div>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md ">
        <Label>
          <span>Invalid input</span>
          <Input className="mt-1" valid={false} placeholder="Jane Doe" />
          <HelperText valid={false}>Your password is too short.</HelperText>
        </Label>

        <Label className="mt-4">
          <span>Valid input</span>
          <Input className="mt-1" valid={true} placeholder="Jane Doe" />
          <HelperText valid={true}>Your password is strong.</HelperText>
        </Label>

        <Label className="mt-4">
          <span>Helper text</span>
          <Input className="mt-1" placeholder="Jane Doe" />
          <HelperText>
            Your password must be at least 6 characters long.
          </HelperText>
        </Label>
      </div>
    </Layout>
  );
}

export default Forms;
