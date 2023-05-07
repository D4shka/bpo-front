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

interface ITableData {
  image: string;
  firstname: string;
  lastname: string;
  id: number;
  rank: {
    id: number;
    name: string;
  };
  roles: string;
  branch: {
    id: number;
    name: string;
  };
}

function Forms() {
  const router = useRouter();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [rank, setRank] = useState(0);
  const [branches, setBranches] = useState(0);
  const [image, setImage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("localStorage user", user);

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
    const id = user.id;
    console.log("id", id);
    try {
      const item = {
        firstname,
        lastname,
        rank: {
          id: rank,
          name: rankOptions.find((opt) => opt.id === rank)?.name,
        },
        branch: {
          id: branches,
          name: branchesOption.find((opt) => opt.id === branches)?.name,
        },
      };

      fetch(`http://192.168.1.116:8080/api/users/${id}`, {
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
      <SectionTitle>Цэргийн мэдээлэл</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center items-center">
          <img
            className="rounded-full w-36 h-36"
            src={user.image || defaultImg.src}
            alt="Extra large avatar"
          />
        </div>
        <Label>
          <span>Овог</span>
          <Input
            className="mt-1"
            placeholder=""
            onChange={(e) => setFirstName(e.target.value)}
            defaultValue={user?.firstname}
          />
        </Label>

        <Label>
          <span>Нэр</span>
          <Input
            className="mt-1"
            placeholder=""
            onChange={(e) => setLastName(e.target.value)}
            defaultValue={user?.lastname}
          />
        </Label>

        <Label className="mt-4">
          <span>Цэргийн анги</span>
          <Select
            className="mt-1"
            onChange={(e) => setBranches(Number(e.target.value))}
            defaultValue={user?.branch?.id}
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
              defaultValue={user?.rank?.id}
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
    </Layout>
  );
}

export default Forms;
