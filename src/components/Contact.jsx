import { useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { removeContact } from "../fetchContact/fetchContact";
import { ContactContextShare } from "../context/Context";
import moment from "moment";

// eslint-disable-next-line react/prop-types
const Contact = ({ contact }) => {
  //   eslint-disable-next-line react/prop-types
  const { fullName, email, phoneNumber, image, birth, _id } = contact;
  const navigate = useNavigate();
  const { setUpdate, update } = ContactContextShare();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(
    ["contact", _id],
    removeContact,
    {
      onSuccess: () => queryClient.invalidateQueries("contact"),
    }
  );

  const handleUpdate = () => {
    setUpdate(contact);
    navigate("/add");
  };

  return (
    <div className="w-[17rem] shadow-md shadow-gray-400 overflow-hidden rounded-lg">
      <img
        className="w-full h-[12rem] object-cover"
        src={image}
        alt="contactImg"
      />
      <div className="p-3 text-sm flex flex-col gap-1">
        <p>Full Name : {fullName}</p>
        <p>Email : {email}</p>
        <p>Phone : {phoneNumber}</p>
        <p>Date of Birth : {moment(birth).format("l")}</p>
      </div>
      <div className="p-3 flex  items-center justify-end  gap-2">
        <button
          className="text-red-700 hover:opacity-75"
          onClick={() => mutate(_id)}
        >
          <BsFillTrashFill />
        </button>
        <button
          className="text-blue-700 hover:opacity-75"
          onClick={handleUpdate}
        >
          <AiFillEdit />
        </button>
      </div>
    </div>
  );
};

export default Contact;
