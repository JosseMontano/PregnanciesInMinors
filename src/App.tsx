import "./App.css";
import Computer from "./icons/computer";
import ImgWave from "./assets/waves.png";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function App() {
  const data = [
    {
      name: "Santa Cruz",
      uv: 16,
      pv: 17,
      amt: 18,
    },
    {
      name: "Cochabamba",
      uv: 15,
      pv: 16,
      amt: 17,
    },
    {
      name: "La paz",
      uv: 14,
      pv: 15,
      amt: 16,
    },
    {
      name: "Oruro",
      uv: 13,
      pv: 14,
      amt: 15,
    },
    {
      name: "Potosi",
      uv: 12,
      pv: 13,
      amt: 14,
    },
  ];

  return (
    <div className="flex flex-row gap-3">
      <div className="w-36 h-lvh bg-primary flex items-center justify-center">
        <span className="cursor-pointer">
          <Computer />
        </span>
      </div>

      <div>
        <h2 className="text-4xl">
          Bienvenido,{" "}
          <span className="block text-2xl">
            Estadísticas de embarasos en adolescentes
          </span>
        </h2>

        {/* first row */}
        <div className="flex flex-row gap-3">
          {/* first col */}
          <div className="w-72 h-64 bg-red-800 flex flex-col justify-between rounded-lg">
            <div>
              <p className="absolute top-28 left-56 text-2xl">80.10%</p>
            </div>
            <div>
              <img
                src={ImgWave}
                alt="olas"
                className="h-102 w-72 relative bottom-36 wave rounded-lg"
              />
            </div>
          </div>

          <div className="w-full h-75">
            <ResponsiveContainer>
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="pv"
                  fill="#e99822"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
                <Bar
                  dataKey="uv"
                  fill="#d1d1d1"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
