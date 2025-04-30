import { Button, Table } from "antd";
import useMyStor from "./Store/Mystore";
import AddMahsulotlarPage from "../Main/AddMahsulotlar";
import api from "./Axios";
import EditMahsulot from "./EditMahsulot";
import { useState, useEffect } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: string;
};

type Category = {
  id: string;
  name: string;
};

function MahsulotlarPage() {
  const [mahsulot, setmahsulot] = useState<Product[]>([]);
  const [editMahsulot, setEditMahsulot] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<Category[]>([]);

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);

  const accessToken = useMyStor((state) => state.accessToken);

  const Mahsulot = (currentPage: number = page) => {
    api
      .get(`api/products?limit=${limit}&page=${currentPage}&order=ASC`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setmahsulot(res.data.items);
        setTotalItems(res.data.total);
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
  }, [page]);

  const Delet = (id: string) => {
    api.delete(`/api/products/${id}`).then(() => {
      setmahsulot((prev) => prev.filter((item) => item.id !== id));
      setTotalItems((prev) => prev - 1);
    });
  };

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  const pages = Math.ceil(totalItems / limit);

  return (
    <div className="w-[1300px]">
      <AddMahsulotlarPage setOpen={setOpen} open={open} onRefresh={Mahsulot} />
      <EditMahsulot
        setEditMahsulot={setEditMahsulot}
        editMahsulot={editMahsulot}
      />
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

export default MahsulotlarPage;
