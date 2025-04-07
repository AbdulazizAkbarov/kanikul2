import { Button, Card, Form, Input } from "antd";
import { useState } from "react";
import api from "./Axios";
import useMyStor from "./Store/Mystore";
function LoginPage() {
  const [loading, setloading] = useState(false);
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className=" w-[400px] ">
        <Form
          layout="vertical"
          initialValues={{
            email: "admin@nt.uz",
            password: "pass123",
          }}
          onFinish={(valus) => {
            console.log(valus);

            setloading(true);
            api
              .post("/api/auth/login", valus)
              .then((res) => {
                useMyStor.setState({
                  accessToken: res.data.accessToken,
                  user: res.data.user,
                });
                api.defaults.headers.accessToken = `Bearer ${res.data.accessToken}`;

                localStorage.setItem("auth", JSON.stringify(res.data));
              })
              .catch((e) => {
                console.error(e);
              })
              .finally(() => {
                setloading(false);
              });
          }}
        >
          <Form.Item
            label="email"
            name="email"
            rules={[
              {
                required: true,
                message: "logini krit",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Parolni kirit",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
