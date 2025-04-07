import { useEffect, useState } from "react";
import api from "./Axios";
import useMyStor from "./Store/Mystore";
import AddBanner from "./AddBanner";
import EditBanner from "./EditBanner";
import { Button, Switch, Table } from "antd";

interface BannerItem {
  id: number;
  title: string;
  isActive: boolean;
  createdAt: string;
  imageUrl: string;
}

function Banner() {
  const [banner, setBanner] = useState<BannerItem[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [editBanner, seteditBanner] = useState<any>();

  const accessToken = useMyStor((state) => state.accessToken);

  const fetchBanner = () => {
    api
      .get("/api/banners?limit=10&page=1&order=ASC")
      .then((res) => {
        setBanner(res.data.items);
      })
      .catch((e) => {
        console.error("Xatolik", e);
      });
  };

  useEffect(() => {
    fetchBanner();
  }, [accessToken]);

  const Delet = (id: number): void => {
    api.delete(`/api/banner/${id}`).then((res) => {
      console.log(res.data);
      setBanner((prev) => prev.filter((item) => item.id !== id));
    });
  };

  return (
    <div className="w-[1300px]">
      <AddBanner setOpen={setOpen} open={open} onRefresh={fetchBanner} />
      <EditBanner
        seteditBanner={seteditBanner}
        editBanner={editBanner}
      />
      <Table<BannerItem>
        bordered
        style={{ width: "100%" }}
        rowKey="id"
        columns={[
          {
            title: "id",
            dataIndex: "id",
          },
          {
            title: "title",
            dataIndex: "title",
          },
          {
            title: "isActive",
            dataIndex: "isActive",
            render: (isActive: boolean) => {
              return <Switch checked={isActive} />;
            },
          },
          {
            title: "createdAt",
            dataIndex: "createdAt",
          },
          {
            title: "Rasm",
            dataIndex: "imageUrl",
            render: (imageUrl: string) => {
              return <img className="h-8 w-10" src={imageUrl} alt="user" />;
            },
          },
          {
            title: "Delet & Edit",
            dataIndex: "",
            render: (record) => {
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
                      seteditBanner(record);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              );
            },
          },
        ]}
        dataSource={banner}
      />
    </div>
  );
}

export default Banner;
