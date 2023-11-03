import React, { Suspense, useEffect, useState } from "react";
import { convertDateFormat } from "../utils/convertDateFormat";
import { useQuery } from "react-query";
import { fetchHomeworldData } from "../api/fetchHomeworldData";
import {GiCancel} from 'react-icons/gi';

const CharacterDetailCard = ({ selectedCharacter, closeModal }) => {

  const {
    data: homeWorldData,
    isLoading,
    isError,
  } = useQuery(
    ["homeWorldData", selectedCharacter?.homeworld],
    () => fetchHomeworldData(selectedCharacter?.homeworld),
    {
      enabled: !!selectedCharacter?.homeworld,
    }
  );

  return (
    <div onClick={closeModal} className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg w-80" onClick={(e)=>e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-center text-lg font-bold">
            {selectedCharacter?.name}
          </h2>
          <button onClick={closeModal} className="text-gray-500">
           <GiCancel/>
          </button>
        </div>
        <div className="mb-4">
          <p>Height:{selectedCharacter?.height} m </p>
          <p>Mass:{selectedCharacter?.mass} Kg </p>
          <p>Date Added:{convertDateFormat(selectedCharacter?.created)} </p>
          <p>No of Films:{(selectedCharacter?.films).length} </p>
          <p>Birth Year:{selectedCharacter?.birth_year} </p>
        </div>
        <div className="mb-4">
          <div>
            <h2 className="text-md font-bold">HomeWorld Info</h2>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <div>
                {" "}
                <h3>Name:{homeWorldData?.name}</h3>
                <p>Terrain: {homeWorldData?.terrain}</p>
                <p>Climate: {homeWorldData?.climate}</p>
                <p>Residents Count: {(homeWorldData?.residents).length}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailCard;
