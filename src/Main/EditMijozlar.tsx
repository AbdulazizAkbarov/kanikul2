import { Button, Drawer, Form, Input, Radio, message } from "antd";
import { useForm } from "antd/es/form/Form";
import api from "./Axios";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  role: "admin" | "customer";
}

interface EditMijozlarProps {
  selected?: User;
  setSelected: (value: User | undefined) => void;
}

function EditMijozlar({ setSelected, selected }:EditMijozlarProps) {
  const [form] = useForm<User>();

  const handleSubmit = (values: User) => {
    if (!selected) return;

    api
      .patch(`/api/users/${selected.id}`, values)
      .then(() => {
        message.success("Foydalanuvchi yangilandi!");
        form.resetFields();
        setSelected(undefined); 
      })
      .catch((e) => {
        console.error("Xatolik", e);
        message.error("Xatolik yuz berdi");
      });
  };

  return (
    <div>
      <Drawer
        open={!!selected}
        onClose={() => setSelected(undefined)}
        destroyOnClose
      >
        <Form<User>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={selected}
        >
          <Form.Item
            label="Ism"
            name="name"
            rules={[{ required: true, message: "Ismni kiriting" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Emailni kiriting" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Parol"
            name="password"
            rules={[{ required: true, message: "Parolni kiriting" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="role"
            label="Rol"
            rules={[{ required: true, message: "Rolni tanlang" }]}
          >
            <Radio.Group
              options={[
                { label: "Mijoz", value: "customer" },
                { label: "Admin", value: "admin" },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>

          <Form.Item
            label="Rasm URL"
            name="image"
            rules={[{ required: true, message: "Rasm URL kiriting" }]}
          >
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
}

export default EditMijozlar;
