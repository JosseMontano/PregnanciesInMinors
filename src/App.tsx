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
import LoginIcon from "./icons/login";
import FormIcon from "./icons/form";
import DataIcon from "./icons/data";
import Card from "./components/card";
import StadisticIcon from "./icons/stadistic";
import NaturalIcon from "./icons/natural";

import Modal from "react-modal";
import { useState } from "react";

import Login from "./components/login";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "black",
    borderRadius: "10px",
  },
};


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

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="flex flex-row gap-3">
        <div className="w-36 h-lvh bg-primary flex items-center justify-center">
          <span className="cursor-pointer">
            <Computer />
          </span>
        </div>

        <div className="flex flex-col justify-center gap-3 h-lvh">
          <div className="flex flex-row justify-between">
            <div>
              <h2 className="text-4xl">
                Bienvenido,{" "}
                <span className="block text-2xl">
                  Estadísticas de embarasos en adolescentes
                </span>
              </h2>
            </div>

            <div className="flex items-center justify-center mr-5 gap-3">
              <span onClick={openModal}>
                <LoginIcon />
              </span>
              <FormIcon />
            </div>
          </div>

          {/* first row */}
          <div className="flex flex-row gap-3">
            {/* first col */}
            <div className="w-72 h-64 bg-red-800 flex flex-col justify-between rounded-lg">
              <div>
                <p className="absolute top-44 left-56 text-2xl">80.10%</p>
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

          {/* Second row */}

          <div className="flex flex-row gap-3">
            <Card
              Icon={DataIcon}
              subtitle="Cantidad de datos"
              title="200"
              titleColor="text-secondary"
              bgColor="bg-secondary_child"
              description={
                <>
                  Mas de 200{" "}
                  <span className="text-secondary_child">datos cargados</span>{" "}
                  para el analisis de embarazos
                </>
              }
            />
            <Card
              Icon={StadisticIcon}
              subtitle="Violacion"
              title="10.4%"
              titleColor="text-thertiary"
              bgColor="bg-thertiary_child"
              description={
                <>
                  Porcentaje de{" "}
                  <span className="text-thertiary_child">mujeres</span> que
                  sufrieron una violacion
                </>
              }
            />
            <Card
              Icon={NaturalIcon}
              subtitle="Embarazo Natural"
              title="62"
              titleColor="text-quaternary"
              bgColor="bg-quaternary"
              description={
                <>
                  Porcentaje de personas{" "}
                  <span className="text-quaternary_child">que el embarazo</span>{" "}
                  fue deseado
                </>
              }
            />

            <Card
              Icon={NaturalIcon}
              subtitle="Abortos"
              title="10.0%"
              titleColor="text-quinary"
              bgColor="bg-quinary_child"
              description={
                <>
                  Porcentaje de personas
                  <span className="text-quinary_child"> que hicieron</span> un
                  aborto
                </>
              }
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Login closeModal={closeModal}/>
      </Modal>
    </>
  );
}

export default App;
