import axios from "axios";

const baseURL = "https://contact-backend-rmsl.onrender.com";

export const getAllData = async () => {
  try {
    const res = await axios.get(`${baseURL}/contact`);
    return res.data.allContact;
  } catch (err) {
    throw new Error(err);
  }
};

export const addContact = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/contact/create`, data);
    return res.newContact;
  } catch (err) {
    throw new Error(err);
  }
};

export const removeContact = async (id) => {
  try {
    await axios.delete(`${baseURL}/contact/delete/${id}`);
  } catch (err) {
    throw new Error(err);
  }
};

export const updateContact = async (contact) => {
  try {
    await axios.put(`${baseURL}/contact/update/${contact._id}`, contact);
  } catch (err) {
    throw new Error(err);
  }
};
