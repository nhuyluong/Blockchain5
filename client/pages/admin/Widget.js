import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import React, { useState, useEffect } from "react";
import Axios from "axios";

const Widget = ({ type }) => {
  const [pbList, setPbList] = useState([]);
  const [plList, setPlList] = useState([]);
  const [bkList, setBkList] = useState([]);
  useEffect(() => {
    fetchSigleRsList();
    fetchSigleReList();
    fetchSigleBookingList();
  }, []);
  async function fetchSigleReList() {
    let promise = Axios({
      url: `http://localhost:5000/api/user/`,
      method: "GET",
    });
    promise
      .then((rs) => {
        setPbList(rs.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function fetchSigleRsList() {
    let promise = Axios({
      url: `http://localhost:5000/api/realEstate/`,
      method: "GET",
    });
    promise
      .then((rs) => {
        setPlList(rs.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  let data;
  async function fetchSigleBookingList() {
    let promise = Axios({
      url: `http://localhost:5000/api/datebooking/`,
      method: "GET",
    });
    promise
      .then((rs) => {
        setBkList(rs.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  let total = 0;
  bkList.map((each) => {
    total += each.Price;
    return total;
  });
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="h-10 w-10 rounded"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
        amount: pbList.length,
      };
      break;
    case "real":
      data = {
        title: "REAL ESTATE",
        isMoney: false,
        link: "View all real estate",
        icon: (
          <ShoppingCartOutlinedIcon
            className="h-10 w-10 rounded"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        amount: plList.length,
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="h-10 w-10 rounded"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
        amount: total,
      };
      break;
    default:
      break;
  }
  return (
    <div className=" text-white flex justify-between flex-1 rounded h-44 w-80 bg-black box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47); pl-1 pr-1 pb-1 -mt-96  ">
      <div className="flex flex-col justify-between h-44 w-full ">
        <span className="font-bold text-sm text-zinc-400">{data.title}</span>
        <span className="text-3xl font-light">
          {data.amount} {data.isMoney && "ETH"}
        </span>
        <span className="w-max text-xs border-b text-white m-1">
          {data.link}
        </span>
      </div>
      <div className="flex flex-col justify-between">
        <div className="percentage positive text-white"></div>
        {data.icon}
      </div>
    </div>
  );
};
export default Widget;