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
import Card from "./components/card";

import Modal from "react-modal";
import { useEffect, useState } from "react";
import Login from "./components/login";
import FormComponent from "./components/form";
import { getData } from "./utils/fetch";
import { Stadistics } from "./interfaces/stadistics";
import { FirstTime } from "./interfaces/firstTime";
import { TypePregnancies } from "./interfaces/typePregnancies";
import { handletypePregnancies } from "./utils/propertiesTypePregnancies";

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
  const [data, setData] = useState([]);
  const [ageGroup, setAgeGroup] = useState("");
  const [firstTime, setFirstTime] = useState([] as FirstTime[]);
  const [typePregnancies, setTypePregnancies] = useState(
    [] as TypePregnancies[]
  );

  const handleGetData = async () => {
    const res = await getData("amount_of_cases");
    const dataAux = res.map((item: Stadistics) => ({
      name: item.Departamento,
      uv: item.Cantidad,
      pv: item.Cantidad,
      amt: item.Cantidad,
    }));
    setData(dataAux);

    const resAgeGroup = await getData("age_group");
    setAgeGroup(resAgeGroup[0].Grupo_edades);

    const resFirstTime = await getData("first_time");
    setFirstTime(resFirstTime);

    let resTypePregnancies = await getData("type_pregnancies");
    //add icons
    resTypePregnancies = resTypePregnancies.map((item: TypePregnancies) => {
      return handletypePregnancies(item);
    });

    setTypePregnancies(resTypePregnancies);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(modalToShow: modalToShow) {
    setModalToShow(modalToShow);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  //modal to show
  type modalToShow = "login" | "form" | "first_time";
  const [modalToShow, setModalToShow] = useState<modalToShow>("login");
  type contentModal = "login" | "form" | "first_time";
  const [contentModal, setContentModal] = useState<contentModal>("login");

  const handleChangeContentModal = (content: contentModal) => {
    setContentModal(content);
    openModal(content);
  };

  return (
    <>
      <div className="flex flex-row gap-3">
        <div className="w-36 h-lvh bg-primary flex items-center justify-center">
          <span
            className="cursor-pointer"
            onClick={() => handleChangeContentModal("first_time")}
          >
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
              <span onClick={() => openModal("login")}>
                <LoginIcon />
              </span>
              <span onClick={() => openModal("form")}>
                {" "}
                <FormIcon />
              </span>
            </div>
          </div>

          {/* first row */}
          <div className="flex flex-row gap-3">
            {/* first col */}
            <div className="w-72 h-64 bg-red-800 flex flex-col justify-between rounded-lg">
              <div>
                <p className="absolute top-44 left-52 text-2xl">
                  {ageGroup} años
                </p>
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
            {typePregnancies.map((item, index) => (
              <Card
                key={index}
                Icon={item.Icon}
                subtitle={item.Tipo_embarazo}
                title={item.Porcentaje + "%"}
                titleColor={item.Title}
                bgColor={item.bgColor}
                description={
                  <>
                    La cantidad de{" "}
                    <span className={item.subtitle}>{item.Cantidad}</span>{" "}
                    {item.description}
                  </>
                }
              />
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <Login closeModal={closeModal} /> */}
        {modalToShow === "login" && <Login closeModal={closeModal} />}
        {modalToShow === "form" && <FormComponent closeModal={closeModal} />}
        {modalToShow === "first_time" && (
          <div className="flex flex-col gap-3">
            {firstTime.map((item, index) => (
              <div key={index} className="flex gap-1">
                <p>
                  <span className="font-extrabold">Embarazos de: </span>
                  {item.Rando_edad} años
                </p>
                <p>
                  <span className="font-extrabold">son:</span> {item.Porcentaje}{" "}
                  %
                </p>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
}

export default App;
