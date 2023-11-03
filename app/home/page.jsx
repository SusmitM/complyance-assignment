"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import LoadingPage from "../loading";
import CharacterCard from "../components/CharacterCard";
import { useQuery } from "react-query";
import { fetchPeople } from "../api/fetchPeople";
import { FcNext, FcPrevious } from "react-icons/fc";
import CharacterDetailCard from "../components/CharacterDetailCard";
import { getAllFilms } from "../api/fetchFilmData";
import { getAllSpecies } from "../api/fetchSpeciesData";
import { getAllHomeworld } from "../api/fetchAllHomeworldData";
import TabDropdown from "../components/tabDropdown";
import OptionDropdown from "../components/OptionDropdown";

const tabArray = ["None", "Films", "Homeworld", "Species"];

const HomePage = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [currentUrl, setCurrentUrl] = useState(
    "https://swapi.dev/api/people/?page=1"
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedCharacter, setSelectedCharcter] = useState("");

  const [selectedTab, setSelectedTab] = useState(tabArray[0]);

  const [selectedOption, setSelectedOption] = useState("All");
  const [showOptionDropdown, setShowOptionDropdown] = useState(false);
  const [options, setOptions] = useState({
    Films: [],
    Homeworld: [],
    Species: [],
  });

  // function to close the character details modal
  const closeModal = () => {
    setShowModal(false);
  };

  // function to open the character details modal
  const openModal = () => {
    setShowModal(true);
  };

  const updateSelectedCharacter = (characterData) => {
    setSelectedCharcter(characterData);
  };

  // function to change page on pagination
  const changePage = (page) => {
    setCurrentUrl(page);

    setSelectedOption("");
    setSelectedTab(tabArray[0]);
    setOptions({
      Films: [],
      Homeworld: [],
      Species: [],
    });
  };

  // query to fetch the people data
  const {
    data: peopleData,
    isLoading,
    isError,
  } = useQuery(["peopleData", currentUrl], () => fetchPeople(currentUrl), {
    enabled: !!currentUrl,
  });

  // effect to manage the peopleData state
  useEffect(() => {
    if (peopleData) {
      setData(peopleData);
    }
  }, [peopleData]);

  // effect to manage the options state on selectedTab change
  useEffect(() => {
    setShowOptionDropdown(false);
    if (selectedTab === "Species") {
      const setSpecies = async () => {
        const speciesOption = await getAllSpecies(peopleData?.results);

        setOptions((prev) => ({ ...prev, Species: [...speciesOption] }));
        setShowOptionDropdown(true);
        setSelectedOption("All");
      };
      setSpecies();
    }
    if (selectedTab === "Films") {
      const setFilms = async () => {
        const filmsOption = await getAllFilms(peopleData?.results);

        setOptions((prev) => ({ ...prev, Films: [...filmsOption] }));
        setShowOptionDropdown(true);
        setSelectedOption("All");
      };
      setFilms();
    }
    if (selectedTab === "Homeworld") {
      const setHomeworld = async () => {
        const homeworldOptions = await getAllHomeworld(peopleData?.results);

        setOptions((prev) => ({ ...prev, Homeworld: [...homeworldOptions] }));
        setShowOptionDropdown(true);
        setSelectedOption("All");
      };
      setHomeworld();
    }
  }, [selectedTab]);

  // function to filter people data based on filters
  const filteredPeople = () => {
    let peopleToShow = { ...data };

    if (searchData !== "") {
      let peopleArray = peopleToShow?.results?.filter((peopleData) =>
        peopleData?.name?.toLowerCase().includes(searchData.toLowerCase())
      );
      peopleToShow = { ...peopleToShow, results: peopleArray };
    }
    if (selectedTab !== "None" && selectedOption !== "All") {
      console.log(selectedTab, { selectedOption });

      if (selectedTab === "Species") {
        let peopleArray = peopleToShow?.results?.filter((peopleData) =>
          peopleData?.species?.includes(selectedOption)
        );

        peopleToShow = { ...peopleToShow, results: peopleArray };
      }
      if (selectedTab === "Films") {
        let peopleArray = peopleToShow?.results?.filter((peopleData) =>
          peopleData?.films?.includes(selectedOption)
        );

        peopleToShow = { ...peopleToShow, results: peopleArray };
      }
      if (selectedTab === "Homeworld") {
        let peopleArray = peopleToShow?.results?.filter((peopleData) =>
          peopleData?.homeworld?.includes(selectedOption)
        );

        peopleToShow = { ...peopleToShow, results: peopleArray };
      }
    }
    return peopleToShow;
  };

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <Header searchData={searchData} setSearchData={setSearchData} />

      <div className="mt-5 text-center">
        {showModal && (
          <CharacterDetailCard
            selectedCharacter={selectedCharacter}
            closeModal={closeModal}
          />
        )}

        <TabDropdown
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          setSelectedOption={setSelectedOption}
          tabArray={tabArray}
        />

        {selectedTab !== "None" ? (
          showOptionDropdown ? (
            <OptionDropdown
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              options={options}
              selectedTab={selectedTab}
            />
          ) : (
            <LoadingPage />
          )
        ) : (
          ""
        )}

        {isLoading ? (
          <LoadingPage />
        ) : filteredPeople()?.results?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-4 justify-center items-center">
            {filteredPeople()?.results?.map((item) => (
              <CharacterCard
                key={item?.name}
                characterData={item}
                openModal={openModal}
                updateSelectedCharacter={updateSelectedCharacter}
              />
            ))}
          </div>
        ) : (
          <div className="text-lg font-semibold">No Results Found</div>
        )}

        {!isLoading && filteredPeople()?.results?.length > 0 && (
          <div className="w-full flex justify-center items-center">
            <button
              disabled={!filteredPeople()?.previous}
              onClick={() => {
                changePage(filteredPeople()?.previous);
              }}
              className="ml-2 bg-blue-300 hover:bg-blue-400 text-white-500 font-bold py-2 px-4 rounded focus:outline-none"
            >
              <FcPrevious />
            </button>
            <span className="m-2 font-bold">{currentUrl.split("=")[1]}</span>
            <button
              disabled={!filteredPeople()?.next}
              onClick={() => {
                changePage(filteredPeople()?.next);
              }}
              className="ml-2 bg-blue-300 hover:bg-blue-400 text-white-500 font-bold py-2 px-4 rounded focus:outline-none"
            >
              <FcNext />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
