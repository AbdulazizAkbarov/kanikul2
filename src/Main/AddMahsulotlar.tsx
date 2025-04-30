import { Button, Drawer, Form, Input, message, Select, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import api from "./Axios";
import { useEffect, useState } from "react";
import { AddMahsulotlarPageProps, Category } from "./Type/Type";



function AddMahsulotlarPage({
  setOpen,
  open,
  onRefresh,
}: AddMahsulotlarPageProps) {
  const [form] = useForm();
  const [catName, setCatName] = useState<Category[]>([]);
  useEffect(() => {
    api.get("/api/categories").then((res) => {
      setCatName(res.data.items);
    });
  }, []);

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
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            console.log(values);
            
            api
              .post("/api/products", {
                name: values.name,
                categoryId: values.categoryId,
                description: values.description,
                price: Number(values.price),
                imageUrl: values.imageUrl.file.response.url,
                stock: Number(values.stock),
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
          }}
        >
          <Form.Item label="Ism" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <Form.Item label="Price" name="price">
            <Input />
          </Form.Item>

          <Form.Item name="stock" label="Stock">
            <Input />
          </Form.Item>

          <Form.Item label="Category Name" name={"categoryId"}>
            <Select
              options={catName.map((i) => {
                return {
                  value: i.id,
                  label: i.name,
                };
              })}
            />
          </Form.Item>

          <Form.Item label="Rasm URL" name="imageUrl">
            <Upload name="file"
            action={"https://nt.softly.uz/api/files/upload"}>
              <Button>Click to Upload</Button>
            </Upload>
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

export default AddMahsulotlarPage;
