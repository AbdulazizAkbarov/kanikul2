import { Form, Input, message } from "antd";
import ReactApexChart from "react-apexcharts";
import api from "./Axios";
import { useEffect, useState } from "react";

type Data = {
  total: string;
  date: string;
};
const ApexChart = ({ data }: { data: Data[] }) => {
  console.log(data);

  return (
    <div className="w-[1300px]">
      {data ? (
        <ReactApexChart
          options={{
            chart: {
              height: 350,
              type: "area",
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              type: "datetime",
              categories: data.map((i) => {
                return i.date;
              }),
            },
            tooltip: {
              x: {
                format: "yy/MM/dd",
              },
            },
          }}
          series={[
            {
              name: "datas",
              data: data.map((i) => {
                return Number(i.total);
              }),
            },
          ]}
          type="area"
          height={350}
        />
      ) : (
        <div>date yoq</div>
      )}
    </div>
  );
};

function HomePage() {
  const [data, setData] = useState<Data[]>([]);
  const [value1, setValue1] = useState<string>("2025-04-10");
  const [value2, setValue2] = useState<string>("2025-04-29");
  console.log(value1);

  useEffect(() => {
    api
      .post("/api/statistics/daily-order-totals", {
        startDate: value1,
        endDate: value2,
      })
      .then((res) => {
        message.success("Date Qo'shildi");

        setData(res.data);
      })
      .catch((e) => {
        message.error(e);
      });
  }, [value1, value2]);

  return (
    <div>
      <ApexChart data={data} />

      <Form
        layout="vertical"
        style={{
          marginLeft: "500px",
        }}
      >
        <Form.Item label={"Boshlanish Sanasi"} className="w-[200px]">
          <Input
            type="date"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
          />
        </Form.Item>
        <Form.Item label={"Tugash Sanasi"} className="w-[200px]">
          <Input
            type="date"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default HomePage;
