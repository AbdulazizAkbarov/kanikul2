import { Button, Drawer, Form, Input, message, Radio } from "antd";
import { useForm } from "antd/es/form/Form";
import api from "./Axios";

interface AddMijozlarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onRefresh: () => void;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
  image: string;
  role: "admin" | "customer";
}

function AddMijozlar({ setOpen, open, onRefresh }: AddMijozlarProps) {
  const [form] = useForm<FormValues>();

  const handleSubmit = (values: FormValues) => {
    api
      .post("/api/users", values)
      .then(() => {
        message.success("Foydalanuvchi qo‘shildi!");
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
        <Form<FormValues> form={form} layout="vertical" onFinish={handleSubmit}>
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
            rules={[{ required: true, message: "Email kiriting" }]}
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

export default AddMijozlar;
