import axios from "axios";


import { useRouter } from "next/navigation";

const Header = ({ setSearchData, searchData }) => {
  const { push } = useRouter();

  const login = async () => {
    const { data } = await axios.post("/api/auth/logout");
    if(data.state){
      push("/")
    }
  };


  return (
    <header className="bg-gray-800 text-white py-4 px-6 mb-8 flex items-center justify-between w-full">
      <div>
        <h1 className="text-lg font-bold">Starwars Character App</h1>
      </div>
      <div className="w-1/3 md:w-1/2 lg:w-1/3">
        <input
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          type="text"
          placeholder="Search"
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-md py-1 px-2"
        />
      </div>
      <div>
        <button onClick={login} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
