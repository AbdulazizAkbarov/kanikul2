import { Button, Drawer, Form, Input, message, Switch, Upload } from "antd";
import api from "./Axios";
import { useForm } from "antd/es/form/Form";

interface FormValues {
  title: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string; 
}

interface AddBannerProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  onRefresh?: () => void;
}

function AddBanner({ setOpen, open, onRefresh }: AddBannerProps) {
  const [form] = useForm<FormValues>();

  const handleSubmit = (values:any) => {
    api
      .post("/api/banners", {
        title: values.title,
        imageUrl: values.imageUrl.file.response.url,
        isActive: values.isActive,
        createdAt: values.createdAt,
      })
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
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>

          <Form.Item label="isActive" name="isActive" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label="Parol" name="createdAt">
            <Input />
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

export default AddBanner;
