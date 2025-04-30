import { Button, Drawer, Form, Input, message, Radio, Upload } from "antd";
import api from "./Axios";
import { AddMijozlarProps } from "./Type/Type";

function AddMijozlar({ setOpen, open, onRefresh }: AddMijozlarProps) {
  const handleSubmit = ({ values }: any) => {
    api
      .post("/api/users", values)
      .then(() => {
        message.success("Foydalanuvchi qo‘shildi!");
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
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Ism" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Parol" name="password">
            <Input.Password />
          </Form.Item>

          <Form.Item name="role" label="Rol">
            <Radio.Group
              options={[
                { label: "Mijoz", value: "customer" },
                { label: "Admin", value: "admin" },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>

          <Form.Item label="Rasm URL" name="image">
            <Upload
              name="file"
              action={"https://nt.softly.uz/api/files/upload"}
            >
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

export default AddMijozlar;
