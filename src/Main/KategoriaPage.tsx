import useMyStor from "./Store/Mystore";
import { Button, Table } from "antd";
import api from "./Axios";
import AddCategory from "./AddKategory";
import EditCategory from "./EditKagtigory";
import { useEffect, useState } from "react";
import { Category } from "./Type/Type";

function Kategory() {
  const [mahsulot, setmahsulot] = useState<Category[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [editcategory, setEditCategory] = useState<Category>();
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);

  const accessToken = useMyStor((state) => state.accessToken);

  const getCategory = (currentPage: number = page) => {
    api
      .get(`api/categories?limit=${limit}&page=${currentPage}&order=ASC`, {
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
    getCategory();
  }, [page]);

  function Delet(id: number) {
    api.delete(`/api/categories/${id}`).then(() => {
      setmahsulot((i) => i.filter((item) => item.id !== id));
      setTotalItems((prev) => prev - 1);
    });
  }

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  const pages = Math.ceil(totalItems / limit);

  return (
    <div className="w-[1300px]">
      <AddCategory setOpen={setOpen} open={open} onRefresh={getCategory} />
      <EditCategory
        setEditCategory={setEditCategory}
        editCategory={editcategory}
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
            title: "Delet & Edit",
            dataIndex: "",
            render: (_, record) => (
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
                  onClick={() => {
                    setEditCategory(record);
                  }}
                >
                  Edit
                </Button>
              </div>
            ),
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

export default Kategory;
