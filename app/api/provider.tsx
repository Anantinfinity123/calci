import axios from "axios";

export const calculate = async (payload: string) => {
  const res = await axios.get("/evaluate", { params: { input: payload } });

  return res.data;
};
