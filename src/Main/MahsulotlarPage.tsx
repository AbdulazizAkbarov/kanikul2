import { Button, Table } from "antd";
import useMyStor from "./Store/Mystore";
import AddMahsulotlarPage from "../Main/AddMahsulotlar";
import api from "./Axios";
import EditMahsulot from "./EditMahsulot";
import { useState, useEffect } from "react";


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

function MahsulotlarPage() {
  const [mahsulot, setmahsulot] = useState<Product[]>([]);
  const [editMahsulot, setEditMahsulot] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<Category[]>([]);

  const accessToken = useMyStor((state) => state.accessToken);

  const Mahsulot = () => {
    api
      .get("api/products?limit=10&page=1&order=ASC", {
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
    Mahsulot();
    api.get("api/categories?limit=10&page=1&order=ASC").then((res) => {
      setCategory(res.data.items);
    });
  }, []);

  const Delet = (id: string) => {
    api.delete(`/api/products/${id}`).then(() => {
      setmahsulot((prev) => prev.filter((item) => item.id !== id));
    });
  };

  return (
    <div className="w-[1300px]">
      <AddMahsulotlarPage
        setOpen={setOpen}
        open={open}
        onRefresh={MahsulotlarPage}
      />
      <EditMahsulot
        setEditMahsulot={setEditMahsulot}
        editMahsulot={editMahsulot}
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
            title: "Price",
            dataIndex: "price",
          },
          {
            title: "Stock",
            dataIndex: "stock",
          },
          {
            title: "Rasm",
            dataIndex: "imageUrl",
            render: (image: string) => {
              return <img className="h-8 w-10" src={image} alt="product" />;
            },
          },
          {
            title: "Category",
            dataIndex: "categoryId",
            render: (categoryId: string) => {
              const categoryItem = category.find(
                (cat) => cat.id === categoryId
              );
              return categoryItem?.name;
            },
          },
          {
            title: "Delet & Edit",
            dataIndex: "",
            render: (_, record: Product) => {
              return (
                <div className="flex gap-2">
                  <Button
                    type="primary"
                    style={{ background: "red" }}
                    onClick={() => Delet(record.id)}
                  >
                    Delet
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => setEditMahsulot(record)}
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

export default MahsulotlarPage;
