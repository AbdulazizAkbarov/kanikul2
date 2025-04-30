import { Button, Table } from "antd";
import api from "./Axios";
import { useState, useEffect } from "react";
import AddBuyurtma from "./AddBuyurtma";
import EditBuyurtma from "./EditBuyrtma";
import { Order, Product, User } from "./Type/Type";

function Buyurtma() {
  const [buyurtmaState, setBuyurtmaState] = useState<Order[]>([]);
  const [userState, setUserState] = useState<User[]>([]);
  const [productState, setProductState] = useState<Product[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);

  const fetchOrders = (currentPage: number = page) => {
    api
      .get(`/api/orders?order=ASC&limit=${limit}&page=${currentPage}`)
      .then((res) => {
        setBuyurtmaState(res.data.items);
        setTotalItems(res.data.total);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  useEffect(() => {
    fetchOrders(page);

    api.get("/api/users").then((res) => {
      setUserState(res.data.items);
    });

    api.get("/api/products").then((res) => {
      setProductState(res.data.items);
    });
  }, [page]);

  function Delet(id: number) {
    api.delete(`/api/orders/${id}`).then(() => {
      setBuyurtmaState((item) => item.filter((item) => item.id !== id));
      setTotalItems((prev) => prev - 1);
    });
  }

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  const pages = Math.ceil(totalItems / limit);

  return (
    <div className="bg-gray-50 w-[1300px]">
      <AddBuyurtma
        open={open}
        setOpen={setOpen}
        onRefresh={() => fetchOrders()}
      />
      <EditBuyurtma
        buyurtmaState={selectedOrder}
        setBuyurtmaState={setBuyurtmaState}
      />

      <Table
        style={{
          overflow: "auto",
          height: 560,
          width: "1400px",
        }}
        size="large"
        columns={[
          {
            key: "id",
            dataIndex: "id",
            title: "Buyurtma raqami",
          },
          {
            key: "customerId",
            dataIndex: "customerId",
            title: "Mijoz",
            render: (customerId) => {
              const new_customer = userState.find(
                (item) => item.id === customerId
              );
              return new_customer?.name;
            },
          },
          {
            key: "status",
            dataIndex: "status",
            title: "Status",
            render: (status) => <p>{status}</p>,
          },
          {
            key: "totalPrice",
            dataIndex: "totalPrice",
            title: "Jami",
            render: (totalPrice) => (
              <p>{totalPrice.toLocaleString("ru")} so'm</p>
            ),
          },
          {
            key: "items",
            dataIndex: "items",
            title: "Mahsulot",
            render: (items) => (
              <div>
                {items?.map((item: any) => {
                  const nomi = productState.find(
                    (productItem) => productItem.id === item.productId
                  );
                  return <div key={item.productId}>{nomi?.name}</div>;
                })}
              </div>
            ),
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
                    setSelectedOrder(record);
                  }}
                >
                  Edit
                </Button>
              </div>
            ),
          },
        ]}
        dataSource={buyurtmaState}
        rowKey="id"
        pagination={false}
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

          {[...Array(pages)]
            .map((_, i) => i + 1)
            .filter(
              (pageNumber) => Math.abs(pageNumber - page) <= 2
            )
            .map((pageNumber) => (
              <Button
                key={pageNumber}
                type="primary"
                className={`px-4 py-2 rounded border mx-1 ${
                  page === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
                }`}
                onClick={() => changePage(pageNumber)}
              >
                {pageNumber}
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

export default Buyurtma;
