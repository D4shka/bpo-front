import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import {
  Input,
  HelperText,
  Label,
  Select,
  Textarea,
  Button,
} from "@roketid/windmill-react-ui";
import defaultImg from "../../public/assets/img/defaultAvatar.jpg";

import Layout from "example/containers/Layout";
import response from "utils/demo/tableData";

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

function example() {
  const router = useRouter();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [rank, setRank] = useState(0);
  const [branches, setBranches] = useState(0);
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState<any>([]);

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

  const getUser = async () => {
    const response = await fetch(`http://192.168.1.116:8080/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await response.json();
    setUserData(data);
  };
  console.log("===>!", userData);

  useEffect(() => {
    getUser();
  }, []);

  const profile = async () => {
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

      fetch(`http://192.168.1.116:8080/api/users/me`, {
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

  const [page, setPage] = useState(1);
  const [data, setData] = useState<ITableData[]>([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p: number) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  return (
    <Layout>
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />

      <main className="profile-page">
        <section className="relative block h-500-px">
          <div className="absolute top-0 w-full h-full bg-center bg-cover">
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px transform translate-z-0">
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={userData.image || defaultImg.src}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0 mb-20"></div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1"></div>
                </div>
                <div className="px-4 py-3 mb-8 ">
                  <Label>
                    <span>Овог</span>
                    <Input
                      className="mt-1"
                      placeholder=""
                      onChange={(e) => setFirstName(e.target.value)}
                      defaultValue={userData.firstname}
                    />
                  </Label>

                  <Label>
                    <span>Нэр</span>
                    <Input
                      className="mt-1"
                      placeholder=""
                      onChange={(e) => setLastName(e.target.value)}
                      defaultValue={userData?.lastname}
                    />
                  </Label>
                  <Label>
                    <span>Имейл</span>
                    <Input
                      className="mt-1"
                      placeholder=""
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      defaultValue={userData?.email}
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

                  {/* <Label className="mt-4">
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
                  </Label> */}

                  {/* <Label className="mt-4">
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
                  </Label> */}

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
                      onClick={profile}
                      className="bg-[#015A02] active:bg-[#015A02] hover:bg-[#015A02] focus:ring-[#015A02]"
                    >
                      Хадгалах
                      <span className="ml-2" aria-hidden="true">
                        +
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-6/12 px-4 mx-auto text-center"></div>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </Layout>
  );
}

export default example;
