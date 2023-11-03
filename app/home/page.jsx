"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import LoadingPage from "../loading";
import CharacterCard from "../components/CharacterCard";
import { useQuery } from "react-query";
import { fetchPeople } from "../api/fetchPeople";
import { FcNext, FcPrevious  } from 'react-icons/fc';
import CharacterDetailCard from "../components/CharacterDetailCard";


const HomePage = () => {
  const [data, setData] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(
    "https://swapi.dev/api/people/?page=1"
  );
  const[showModal,setShowModal]=useState(false);
  const [selectedCharacter,setSelectedCharcter]=useState("")

  const closeModal=()=>{
    setShowModal(false);
  }
  const openModal=()=>{
    setShowModal(true);
  }
  const updateSelectedCharacter=(characterData)=>{
    setSelectedCharcter(characterData)
  }

  const {
    data: peopleData,
    isLoading,
    isError,
  } = useQuery(["peopleData", currentUrl], () => fetchPeople(currentUrl), {
    enabled: !!currentUrl,
  });

  // console.log(peopleData);

  useEffect(() => {
    if (peopleData) {
      setData(peopleData);
    }
  }, [peopleData]);

  const filteredPeople = () => {
    let peopleToShow = data;
    return peopleToShow;
  };
  console.log(filteredPeople()?.results?.length);

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <Header />

      <div className="mt-5">
        {isLoading ? (
          <LoadingPage />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-4 justify-center items-center">
            {filteredPeople()?.results?.map((item) => (
              <CharacterCard key={item?.name} characterData={item} openModal={openModal}  updateSelectedCharacter={ updateSelectedCharacter} />
            ))}
          </div>
        )}
       {showModal &&  <CharacterDetailCard selectedCharacter={selectedCharacter} closeModal={closeModal} />}
      

      {!isLoading && (
        <div className="w-full flex justify-center items-center">
          <button
            disabled={!filteredPeople()?.previous}
            onClick={() => setCurrentUrl(filteredPeople()?.previous)}
            className="ml-2 bg-blue-300 hover:bg-blue-400 text-white-500 font-bold py-2 px-4 rounded focus:outline-none"
          >
            <FcPrevious/>
          </button>
          <span className="m-2 font-bold">{currentUrl.split("=")[1]}</span>
          <button
            disabled={!filteredPeople()?.next}
            onClick={() => setCurrentUrl(filteredPeople()?.next)}
            className="ml-2 bg-blue-300 hover:bg-blue-400 text-white-500 font-bold py-2 px-4 rounded focus:outline-none"
          >
           <FcNext  />
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default HomePage;
