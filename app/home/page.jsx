"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import LoadingPage from "../loading";
import CharacterCard from "../components/CharacterCard";
import { useQuery } from "react-query";


async function fetchPeople(url = "https://swapi.dev/api/people/?page=1") {
  try {
    const response = await fetch(url);
    const peopleData = await response.json();
    return peopleData;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching data");
  }
}

const HomePage = () => {
  const [data, setData] = useState([]);
 

  const {
    data: peopleData,
    isLoading,
    isError,
  } = useQuery("peopleData", () =>
    fetchPeople("https://swapi.dev/api/people/?page=1")
  );

  // console.log(peopleData);

  useEffect(() => {
    if(peopleData){
      setData(peopleData)
    }
  }, [peopleData]);

  const filteredPeople = () => {
    let peopleToShow = data;
    return peopleToShow;
  };
  if (isError) {
    return <div>Error fetching data</div>; 
  }

  return (
    <div>
      <Header />
      <div className="mt-5">
        {isLoading? (
          <LoadingPage />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-4 justify-center items-center">
            {filteredPeople()?.results?.map((item) => (
              <CharacterCard key={item?.name
              } characterData={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
