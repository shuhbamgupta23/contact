import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { addContact, updateContact } from "../../fetchContact/fetchContact";
import { ContactContextShare } from "../../context/Context";
import axios from "axios";

const AddContact = () => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState("");
  const { setUpdate, update } = ContactContextShare();
  const [contact, setContact] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    birth: "",
  });

  const { mutate, isLoading, isError } = useMutation(addContact, {
    onSuccess: () => queryClient.invalidateQueries("contact"),
  });

  const {
    mutate: updateContacts,
    isLoading: updateLoading,
    isError: updateError,
  } = useMutation(updateContact, {
    onSuccess: () => queryClient.invalidateQueries("contact"),
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "shubhamupload");
    data.append("cloud_name", "dqdetczii");

    const imageUrl = await axios.post(
      "https://api.cloudinary.com/v1_1/dqdetczii/image/upload",
      data
    );

    const updatedContact = {
      ...contact,
      image: imageUrl.data.url,
    };

    setContact(updatedContact);

    if (update) {
      updateContacts(updatedContact);
    } else {
      mutate(updatedContact);
    }
    navigate("/");
  };


  useEffect(() => {
    if (update) {
      setContact({
        ...contact,
        fullName: update.fullName,
        email: update.email,
        phoneNumber: update.phoneNumber,
        birth: update.birth.split("T")[0],
        _id: update._id,
      });
    }
  }, []);

  return (
    <section>
      <button
        className="absolute top-[2rem] left-[4rem] button px-5 text-sm"
        onClick={() => navigate("/")}
      >
        Go Back
      </button>
      <div className="flex items-center justify-center h-screen">
        <form
          className="border border-gray-400 w-[30rem] p-5 flex flex-col gap-5 rounded-md shadow-md shadow-gray-400 m-5 lg:m-0"
          type="submit"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-xl font-medium">
            {update ? "Update Contact" : "Add Contact"}
          </h1>
          <input
            className="input"
            type="text"
            placeholder="Full Name..."
            name="fullName"
            required
            value={contact.fullName}
            onChange={(e) =>
              setContact({ ...contact, [e.target.name]: e.target.value })
            }
          />
          <input
            className="input"
            type="text"
            placeholder="Email..."
            name="email"
            required
            value={contact.email}
            onChange={(e) =>
              setContact({ ...contact, [e.target.name]: e.target.value })
            }
          />
          <input
            className="input"
            type="text"
            placeholder="Phone Number..."
            name="phoneNumber"
            value={contact.phoneNumber}
            onChange={(e) =>
              setContact({ ...contact, [e.target.name]: e.target.value })
            }
          />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <input
            className="input"
            type="Date"
            name="birth"
            value={contact.birth}
            onChange={(e) =>
              setContact({ ...contact, [e.target.name]: e.target.value })
            }
          />
          <button className="button">
            {update ? "Update" : "Add Contact"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddContact;
