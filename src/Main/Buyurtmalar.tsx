import { Button, Table } from "antd";
import api from "./Axios";
import { useState, useEffect } from "react";
import AddBuyurtma from "./AddBuyurtma";
import EditBuyurtma from "./EditBuyrtma";

type Product= {
  id: number;
  name: string;
}

type User= {
  id: number;
  name: string;
}

type OrderItem= {
  productId: number;
  quantity: number;
  price: number;
}

type Order= {
  id: number;
  customerId: number;
  status: string;
  totalPrice: number;
  items: OrderItem[];
}

function Buyurtma() {
  const [buyurtmaState, setBuyurtmaState] = useState<Order[]>([]);
  const [userState, setUserState] = useState<User[]>([]);
  const [productState, setProductState] = useState<Product[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders = () => {
    api
      .get("/api/orders?order=ASC")
      .then((res) => {
        setBuyurtmaState(res.data.items);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  useEffect(() => {
    orders();

    api.get("/api/users").then((res) => {
      setUserState(res.data.items);
    });

    api.get("/api/products").then((res) => {
      setProductState(res.data.items);
    });
  }, []);

  function Delet(id:number) {
    api
      .delete(`/api/orders/${id}`)
      .then(() =>
        setBuyurtmaState((item) => item.filter((item) => item.id !== id))
      );
  }

  return (
    <div className=" bg-gray-50 w-[1300px]">
      <AddBuyurtma open={open} setOpen={setOpen} onRefresh={orders} />

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
            title: "status",
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
                  {items?.map((item:any) => {
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
      />
    </div>
  );
}

export default Buyurtma;
