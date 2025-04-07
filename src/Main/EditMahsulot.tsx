import { Button, Drawer, Form, Input, InputNumber, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import api from "./Axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string; 
  stock: string; 
  imageUrl: string;
}

interface EditMahsulotProps {
  setEditMahsulot: React.Dispatch<React.SetStateAction<Product | undefined>>;
  editMahsulot: Product | undefined;
}

const EditMahsulot: React.FC<EditMahsulotProps> = ({ setEditMahsulot, editMahsulot }:any) => {
  const [form] = useForm();

  const handleSubmit = (values: Product) => {
    api
      .patch(`/api/products/${editMahsulot?.id}`, {
        name: values.name,
        description: values.description,
        price: values.price,
        stock: values.stock,
        imageUrl: values.imageUrl,
      })
      .then(() => {
        message.success("Mahsulot tahrirlandi!");
        form.resetFields();
        setEditMahsulot(undefined); 
      })
      .catch((e) => {
        console.error("Xatolik", e);
        message.error("Xatolik yuz berdi");
      });
  };

  return (
    <div>
      <Drawer
        open={editMahsulot ? true : false}
        onClose={() => {
          setEditMahsulot(undefined);
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editMahsulot}
        >
          <Form.Item label="Ism" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <Form.Item label="Price" name="price">
            <InputNumber />
          </Form.Item>

          <Form.Item name="stock" label="Stock">
            <InputNumber />
          </Form.Item>

          <Form.Item label="Rasm URL" name="imageUrl">
            <Input placeholder="Rasm URL kiriting" />
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
};

export default EditMahsulot;
