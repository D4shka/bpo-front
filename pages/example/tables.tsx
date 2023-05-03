import React, { useState, useEffect } from "react";

import PageTitle from "example/components/Typography/PageTitle";
import SectionTitle from "example/components/Typography/SectionTitle";
import { useRouter } from "next/router";
import Loader from "example/components/Loader/Loader";
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
  branches: [
    {
      id: number;
      name: string;
    }
  ];
}
interface Id {
  id: number;
}

function Tables() {
  const [users, setUsers] = useState<ITableData[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState<any>([]);

  const router = useRouter();

  const getUsers = async () => {
    const response = await fetch(
      `http://192.168.1.135:8080/api/users?page=${page}&size=${10}`,
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

  console.log("users", users);

  const Delete = async (id: number) => {
    console.log("sdsd");
    try {
      fetch(`http://192.168.1.135:8080/api/users/${id}`, {
        method: "DELETE",
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
  }, [page]);

  return (
    <Layout>
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
                    <span className="">
                      Цэргийн анги: {user?.branches[0]?.name}
                    </span>
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
                        src={user.image}
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
                    <span className="text-sm">{user?.branches[0]?.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge>{user?.rank?.name}</Badge>
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
