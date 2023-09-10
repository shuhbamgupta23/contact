import Contact from "./Contact";
import { useNavigate } from "react-router-dom";
import { useQuery,  } from "react-query";
import { getAllData } from "../fetchContact/fetchContact";
import LoaderIcon from "react-loader-icon";

const Contacts = () => {

  const { data, isLoading, isError } = useQuery("contact", getAllData, {

  });

  const navigate = useNavigate();

  return (
    <div className="w-[80%] mx-auto my-[3rem] border-2 border-blue-100 shadow-md shadow-gray-400 rounded-lg">
      <h1 className="p-6 text-center flex-1 text-3xl font-bold text-gray-700">
        Contact Application
      </h1>
      <div className="text-right mr-10">
        <button
          className="button text-sm px-4"
          onClick={() => navigate("/add")}
        >
          Add Contact
        </button>
      </div>
      {isLoading && <LoaderIcon color={"black"} />}
      {isError && <h2>Something went wrong....</h2>}
      <div className="p-4 lg:p-7 flex items-center flex-wrap gap-5 w-[95%] mx-auto">
        {data?.length === 0 ? (
          <p>No Contact exist</p>
        ) : (
          data?.map((contact, i) => <Contact contact={contact} key={i} />)
        )}
      </div>
    </div>
  );
};

export default Contacts;
