import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const Form = require("form-data");

export const uploadImage = async (imgBuffer: any, filename: string) => {
  const formData = new Form();
  formData.append("chat_id", process.env.CHAT_ID);
  formData.append("document", imgBuffer, {
    filename,
  }); // Specify filename in FormData

  const { data } = await axios.post(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendDocument`,
    formData
  );
  const fileId = data?.result?.document?.file_id;
  return getUrl(fileId);
};

const getUrl = async (fileId: string) => {
  const { data } = await axios.get(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile?file_id=${fileId}`
  );
  const path = data?.result?.file_path;
  return `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${path}`;
};
