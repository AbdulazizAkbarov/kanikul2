import { Button, Table } from "antd";
import api from "./Axios";
import { useState, useEffect } from "react";
import AddBuyurtma from "./AddBuyurtma";
import EditBuyurtma from "./EditBuyrtma";

type Product = {
  id: number;
  name: string;
};

type User = {
  id: number;
  name: string;
};

type OrderItem = {
  productId: number;
  quantity: number;
  price: number;
};

type Order = {
  id: number;
  customerId: number;
  status: string;
  totalPrice: number;
  items: OrderItem[];
};

function Buyurtma() {
  const [buyurtmaState, setBuyurtmaState] = useState<Order[]>([]);
  const [userState, setUserState] = useState<User[]>([]);
  const [productState, setProductState] = useState<Product[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const orders = (page = 1, limit = 10) => {
    api
      .get(`/api/orders?order=ASC&page=${page}&limit=${limit}`)
      .then((res) => {
        setBuyurtmaState(res.data.items);
        setTotal(res.data.meta.totalItems);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  useEffect(() => {
    orders(currentPage, pageSize);

    api.get("/api/users").then((res) => {
      setUserState(res.data.items);
    });

    api.get("/api/products").then((res) => {
      setProductState(res.data.items);
    });
  }, [currentPage, pageSize]);

  function Delet(id: number) {
    api
      .delete(`/api/orders/${id}`)
      .then(() => {
        setBuyurtmaState((item) => item.filter((item) => item.id !== id));
        orders(currentPage, pageSize); 
      });
  }

  return (
    <div className="bg-gray-50 w-[1300px]">
      <AddBuyurtma open={open} setOpen={setOpen} onRefresh={() => orders(currentPage, pageSize)} />

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
            render: (totalPrice) => {
              return <p>{totalPrice.toLocaleString("ru")} so'm</p>;
            },
          },
          {
            key: "items",
            dataIndex: "items",
            title: "Mahsulot",
            render: (items) => {
              return (
                <div>
                  {items?.map((item: any) => {
                    const nomi = productState.find((productItem) => {
                      return productItem.id === item.productId;
                    });
                    return <div key={item.productId}>{nomi?.name}</div>;
                  })}
                </div>
              );
            },
          },
          {
            title: "Delet & Edit",
            dataIndex: "",
            render: (_, record) => {
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
                    onClick={() => {
                      setSelectedOrder(record);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              );
            },
          },
        ]}
        dataSource={buyurtmaState}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
      />
    </div>
  );
}

export default Buyurtma;
