import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";


const Header = () => {
  const { push } = useRouter();
  
  return (
    <header className="bg-gray-800 text-white py-4 px-6 mb-8 flex items-center justify-between w-full">
      <div>
        <h1 className="text-lg font-bold">Starwars Character App</h1>
      </div>
      <div className="w-1/3 md:w-1/2 lg:w-1/3">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-md py-1 px-2"
        />
      </div>
      <div>
        <button
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
         
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
