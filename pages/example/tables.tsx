import React, { useState, useEffect } from "react";

import PageTitle from "example/components/Typography/PageTitle";
import SectionTitle from "example/components/Typography/SectionTitle";
import { useRouter } from "next/router";
import defaultImg from "../../public/assets/img/defaultAvatar.jpg";
import Loader from "example/components/Loader/Loader";
import { Input } from "@roketid/windmill-react-ui";
import { SearchIcon } from "icons";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from "@roketid/windmill-react-ui";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@roketid/windmill-react-ui";
import { EditIcon, TrashIcon } from "icons";

import { Label, Select } from "@roketid/windmill-react-ui";

import Layout from "example/containers/Layout";

interface MyResponse extends Response {
  accessToken?: string;
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
interface Id {
  id: number;
}

interface RankOption {
  id: number;
  name: string;
}

interface BranchesOption {
  id: number;
  name: string;
}

interface User {
  firstname: string;
  lastname: string;
  id: number;
}

function Tables() {
  const [users, setUsers] = useState<ITableData[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState<any>([]);
  const [rankId, setRankId] = useState(0);
  const [branchId, setBranchId] = useState(0);
  const [searchPattern, setSearchPattern] = useState("");

  const [searchResults, setSearchResults] = useState<User[]>([]);

  const router = useRouter();

  const rankOptions: RankOption[] = [
    { id: 0, name: "Бүгд" },
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
    { id: 0, name: "Бүгд" },
    { id: 1, name: "Хилийн застав" },
  ];

  const getUsers = async () => {
    const response = await fetch(
      `http://192.168.1.116:8080/api/users?page=${page}&size=${10}&searchPattern=${searchPattern}&rankId=${rankId}&branchId=${branchId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const data = await response.json();
    setTotalElements(data.totalElements);
    setUsers(data.content);
  };

  const Delete = async (id: number) => {
    console.log("sdsd");
    try {
      fetch(`http://192.168.1.116:8080/api/users/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => {
        // const myRes = res as MyResponse;
        // if (myRes.status === 204) {
        //   myRes.json().then((d) => {
        //     console.log("d", d);
        //   });
        // }
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const Edit = (user: ITableData) => {
    router.push("/example/modals");
    localStorage.setItem("user", JSON.stringify(user));
  };

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function onPageChangeTable2(p: number) {
    setPage(p - 1);
  }

  useEffect(() => {
    getUsers();
  }, [page, searchPattern, rankId, branchId]);

  return (
    <Layout>
      <div className="grid grid-cols-4">
        <div className="col-span-2 pt-3">
          <div className="flex justify-center flex-1 lg:mr-32 pt-4">
            <div className="relative w-full max-w-xl mr-1 focus-within:text-purple-500">
              <div className="absolute inset-y-0 flex items-center pl-2">
                <SearchIcon
                  className="w-4 h-4 text-[#015A02]"
                  aria-hidden="true"
                />
              </div>
              <Input
                className="pl-8 text-gray-700"
                placeholder="Хайх"
                aria-label="Search"
                onChange={(e) => setSearchPattern(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 ">
          <span className="text-[14px]">Цэргийн анги</span>
          <Label className="pt-1">
            <Select
              className="w-44"
              onChange={(e) => setBranchId(Number(e.target.value))}
            >
              {branchesOption.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
          </Label>
        </div>
        <div className="col-span-1">
          <span className="text-[14px]">Цол</span>
          <Label className="pt-1">
            <Label className="">
              <Select
                className="w-44"
                onChange={(e) => setRankId(Number(e.target.value))}
              >
                {rankOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </Label>
          </Label>
        </div>
      </div>
      <div className="grid grid-rows-4 grid-flow-col gap-4">
        {searchResults.map((user) => (
          <div key={user.id}>
            <p>
              {user.firstname} {user.lastname}
            </p>
          </div>
        ))}
      </div>
      {/* <Loader /> */}
      {users.map((user, i) => (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Хувийн мэдээлэл</ModalHeader>
          <ModalBody>
            <div className="max-w-md p-8 sm:flex sm:space-x-6">
              <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                <img
                  src="https://source.unsplash.com/100x100/?portrait?1"
                  alt=""
                  className="object-cover object-center w-full h-full rounded"
                />
              </div>
              <div className="flex flex-col space-y-4">
                <div>
                  <span className="flex items-center space-x-2">
                    <span className="">Овог: {user.firstname}</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <span className="">Нэр: {user.lastname}</span>
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="flex items-center space-x-2">
                    <span className="">Цэргийн анги: {user?.branch?.name}</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <span className="">Цол: {user?.rank?.name}</span>
                  </span>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button>Accept</Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large">
                Accept
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      ))}

      <SectionTitle>Жагсаалт</SectionTitle>
      {users != null && (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Хэрэглэгч</TableCell>
                <TableCell>Цэргийн анги</TableCell>
                <TableCell>Цол</TableCell>
                <TableCell>Засварлах</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {users.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Avatar
                        className="hidden mr-3 md:block"
                        src={user.image || defaultImg.src}
                        alt="User avatar"
                        onClick={openModal}
                      />
                      <div>
                        <p className="font-semibold">{user.firstname}</p>
                        <p className="text-xs text-gray-600">{user.lastname}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user?.branch?.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className="text-white bg-[#015A02] dark:bg-[#015A02]">
                      {user?.rank?.name}
                    </Badge>
                  </TableCell>
                  {/* <TableCell>
                    <span className="text-sm">
                      {new Date(user.createdDate).toLocaleDateString()}
                    </span>
                  </TableCell> */}
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button
                        layout="link"
                        size="small"
                        aria-label="Edit"
                        onClick={(event) => Edit(user)}
                      >
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      <Button
                        layout="link"
                        size="small"
                        aria-label="Delete"
                        onClick={(event) => Delete(user.id)}
                      >
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalElements}
              resultsPerPage={10}
              onChange={(e) => onPageChangeTable2(e)}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      )}
    </Layout>
  );
}

export default Tables;
