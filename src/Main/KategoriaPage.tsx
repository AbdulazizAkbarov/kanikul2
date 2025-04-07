import useMyStor from "./Store/Mystore";
import { Button, Table } from "antd";
import api from "./Axios";
import AddCategory from "./AddKategory";
import EditCategory from "./EditKagtigory";
import { useEffect, useState } from "react";


interface Category {
  id: number;
  name: string;
  description: string;
}

function Kategory() {
  const [mahsulot, setmahsulot] = useState<Category[]>([]);
  const [open, setOpen] = useState<boolean>(false); 
  const [editcategory, setEditCategory] = useState<Category>();
  const accessToken = useMyStor((state) => state.accessToken);

  const Category = () => {
    api
      .get("api/categories?limit=10&page=1&order=ASC", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setmahsulot(res.data.items); 
      })
      .catch((e) => {
        console.error("Xatolik", e);
      });
  };

  useEffect(() => {
    Category(); 
  }, [accessToken]);

  function Delet(id: number) {
    api.delete(`/api/categories/${id}`).then((res) => {
      console.log(res.data);
      setmahsulot((i) => i.filter((item) => item.id !== id));
    });
  }

  return (
    <div className="w-[1300px]">
      <AddCategory setOpen={setOpen} open={open} onRefresh={Category} />
      <EditCategory
        setEditCategory={setEditCategory}
        editCategory={editcategory}
      />
      <Table
        bordered
        style={{ width: "100%" }}
        rowKey="id"
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
            title: "Description",
            dataIndex: "description",
          },

          {
            title: "Delet & Edit",
            dataIndex: "",
            render: (_, record) => {
              return (
                <div className=" flex gap-2">
                  <Button
                    type="primary"
                    style={{ background: "red" }}
                    onClick={() => Delet(record.id)}
                  >
                    Delet
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setEditCategory(record);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              );
            },
          },
        ]}
        dataSource={mahsulot}
      />
    </div>
  );
}

export default Kategory;
