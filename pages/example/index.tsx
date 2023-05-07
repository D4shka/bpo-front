import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { Input, Label, Select, Button } from "@roketid/windmill-react-ui";
import ImageUploading, { ImageListType } from "react-images-uploading";

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
  // const [image, setImage] = useState("");
  const [userData, setUserData] = useState<any>([]);
  const [image, setImage] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ITableData[]>([]);
  const [images, setImages] = React.useState([]);

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
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
    var data = await response.json();

    data = {
      ...data,
      ["rank"]: data.rank ? data.rank.id : 0,
      ["branch"]: data.branch ? data.branch.id : 0,
    };
    setUserData(data);
  };
  console.log("===>!", userData);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log("HELLO ", userData);
  }, [userData]);

  const profile = async () => {
    try {
      fetch(`http://192.168.1.116:8080/api/users/${userData.id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(userData),
      }).then((res) => {
        const myRes = res as MyResponse;
        if (myRes.status === 200) {
          alert("Амжилттай шинчиллээ");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    console.log(imageList, addUpdateIndex);
    var name = new Date().valueOf();

    var formdata = new FormData();
    formdata.append("file", imageList[0].file ?? "");
    formdata.append("name", name + ".jpeg");
    formdata.append("folder", "profile");

    setImage(name);

    console.log(
      'localStorage.getItem("accessToken")',
      localStorage.getItem("accessToken")
    );

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: formdata,
    };

    fetch("http://192.168.1.116:8080/api/files", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log("result", result))
      .catch((error) => console.log("error", error));
  };

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
    <>
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
                      <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={69}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps,
                        }) => (
                          // write your building UI
                          <div className="upload__image-wrapper">
                            <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
                              <img
                                alt="not found"
                                src={
                                  images[0]
                                    ? images[images.length - 1]["data_url"]
                                    : `http://192.168.1.116:8080/profile/${image}`
                                }
                                className="rounded-full align-middle border-none w-32 h-32"
                              />
                              <a
                                className="cursor-pointer"
                                id="image-upload"
                                type="file"
                                onClick={onImageUpload}
                                {...dragProps}
                              >
                                <div className="absolute rounded-full bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-indigo-400 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
                              </a>
                            </div>
                          </div>
                        )}
                      </ImageUploading>
                    </div>

                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0 mb-20"></div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1"></div>
                  </div>
                  <div className="px-4 py-3 mb-8 ">
                    <Label className="mt-2">
                      <span>Овог</span>
                      <Input
                        className="mt-1"
                        placeholder=""
                        name="lastname"
                        onChange={(e) => handleChange(e)}
                        defaultValue={userData.lastname}
                      />
                    </Label>
                    <Label className="mt-2">
                      <span>Нэр</span>
                      <Input
                        className="mt-1"
                        placeholder=""
                        name="firstname"
                        onChange={(e) => handleChange(e)}
                        defaultValue={userData.firstname}
                      />
                    </Label>
                    <Label className="mt-2">
                      <span>Имейл</span>
                      <Input
                        className="mt-1"
                        placeholder=""
                        name="email"
                        onChange={(e) => handleChange(e)}
                        defaultValue={userData.email}
                      />
                    </Label>
                    {/* <Label>
                      <span>Нууц үг</span>
                      <Input
                        className="mt-1"
                        placeholder="********"
                        name="password"
                        onChange={(e) => setEmail(e.target.value)}
                        defaultValue={userData.email}
                      />
                    </Label> */}
                    {userData.roles && userData?.roles[0] === "ROLE_ADMINs" ? (
                      <></>
                    ) : (
                      <>
                        <Label className="mt-2">
                          <span>Цэргийн анги</span>
                          <Select
                            className="mt-1"
                            name="branch"
                            onChange={(e) => handleChange(e)}
                            defaultValue={userData.branch?.id}
                          >
                            {branchesOption.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </Select>
                        </Label>
                        <Label className="mt-2">
                          <span>Цол</span>
                          <Select
                            className="mt-1"
                            name="rank"
                            onChange={(e) => handleChange(e)}
                            defaultValue={userData.rank?.id}
                          >
                            {rankOptions.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </Select>
                        </Label>
                      </>
                    )}
                    <div className="my-6">
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
    </>
  );
}

export default example;
