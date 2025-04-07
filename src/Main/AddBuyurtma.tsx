import { Button, Drawer, Form, Input, message, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import api from "./Axios";
import { useState } from "react";
import { useEffect } from "react";

interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
}

interface AddBuyurtmaProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onRefresh?: () => void;
}

interface FormValues {
  customerId: number;
  productId: number;
  quantity: number;
}


function AddBuyurtma({ setOpen, open, onRefresh }:AddBuyurtmaProps) {
  const [form] = useForm<FormValues>();
  const [userState, setUserState] = useState<User[]>([]);
  const [productState, setProductState] = useState<Product[]>([]);

  useEffect(() => {
    api.get("/api/users").then((res) => {
      setUserState(res.data.items);
    });
  }, []);

  useEffect(() => {
    api.get("/api/products").then((res) => {
      setProductState(res.data.items);
    });
  }, []);

  const handleSubmit = (values:any) => {
    api
      .post("api/orders", {
        customerId: values.customerId,
        items: [
          {
            productId: values.productId,
            quantity: values.quantity,
          },
        ],
      })
      .then(() => {
        message.success("Mahsulot qo‘shildi!");
        form.resetFields();
        setOpen(false);
        onRefresh?.();
      })
      .catch((e) => {
        console.error("Xatolik", e);
        message.error("Xatolik yuz berdi");
      });
  };

  return (
    <div>
      <Button
        className="ml-[1200px] my-4"
        type="primary"
        onClick={() => setOpen(true)}
      >
        Qo‘shish
      </Button>

      <Drawer open={open} onClose={() => setOpen(false)} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="CustomerId" name="customerId">
            <Select
              options={userState.map((i) => {
                return {
                  value: i.id,
                  label: i.name,
                };
              })}
            />
          </Form.Item>

          <Form.Item label="ProductId" name="productId">
            <Select
              options={productState.map((i) => {
                return {
                  value: i.id,
                  label: i.name,
                };
              })}
            />
          </Form.Item>
          <Form.Item label="Miqdori" name="quantity">
            <Input type="number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default AddBuyurtma;
