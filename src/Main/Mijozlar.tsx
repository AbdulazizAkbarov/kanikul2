import useMyStor from "./Store/Mystore";
import { Button, Table } from "antd";
import AddMijozlar from "./AddMijozlar";
import api from "./Axios";
import EditMijozlar from "./EditMijozlar";
import { useEffect, useState } from "react";
import { User } from "./Type/Type";



function Mijozlar() {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>();
  const accessToken = useMyStor((state) => state.accessToken);

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);

  const Users = (currentPage: number = page) => {
    api
      .get(`/api/users?limit=${limit}&page=${currentPage}&order=ASC`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setUsers(res.data.items);
        setTotalItems(res.data.total);
      })
      .catch((e) => {
        console.error("Xatolik", e);
      });
  };

  useEffect(() => {
    Users();
  }, [accessToken, page]);

  function Delet(id: number) {
    api.delete(`/api/users/${id}`).then((res) => {
      console.log(res.data);
      setUsers((i) => i.filter((item) => item.id !== id));
      setTotalItems((prev) => prev - 1);
    });
  }

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  const pages = Math.ceil(totalItems / limit);

  return (
    <div className="w-[1300px]">
      <AddMijozlar setOpen={setOpen} open={open} onRefresh={Users} />
      <EditMijozlar setSelected={selected} selected={selected} />
      <Table
        bordered
        style={{ width: "100%" }}
        rowKey="id"
        pagination={false}
        columns={[
          {
            title: "id",
            dataIndex: "id",
          },
          {
            title: "Nomi",
            dataIndex: "name",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Role",
            dataIndex: "role",
          },
          {
            title: "Rasm",
            dataIndex: "image",
            render: (image) => {
              return <img className="h-8 w-10" src={image} alt="user" />;
            },
          },
          {
            title: "Delet & Edit",
            dataIndex: "",
            render: (_, item: any) => {
              return (
                <div className="flex gap-2">
                  <Button
                    type="primary"
                    onClick={() => {
                      setSelected(item);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="primary"
                    style={{ background: "red" }}
                    onClick={() => Delet(item.id)}
                  >
                    Delet
                  </Button>
                </div>
              );
            },
          },
        ]}
        dataSource={users}
      />

      <div className="flex justify-center mt-10">
        <div className="pagination flex gap-2 items-center">
          {page > 1 && (
            <Button
              type="primary"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => changePage(page - 1)}
            >
              Back
            </Button>
          )}

          {[...Array(pages)].map((_, i) => (
            <Button
              key={i}
              type="primary"
              className={`px-4 py-2 rounded border ${
                page === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
              }`}
              onClick={() => changePage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          {page < pages && (
            <Button
              type="primary"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => changePage(page + 1)}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mijozlar;
