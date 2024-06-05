import { http } from "../config/http";

export const getData = async (url: string) => {
  const response = await fetch(http + url,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  });
  const data = await response.json();
  console.log(data.data);
  return data.data;
};
