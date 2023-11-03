import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchColor } from "../api/fetchColor";

const CharacterCard = ({ characterData, updateSelectedCharacter,openModal }) => {
  const {
    data: cardColor,
    isLoading,
    isError,
  } = useQuery(
    ["specieColor", characterData?.species[0]],
    () => fetchColor(characterData?.species[0]),
    {
      enabled: !!characterData?.species[0],
    }
  );

 

  

  if (isError) {
    return <div>`${characterData?.name} Card Not Available`</div>;
  }
  return (
    <div
    onClick={()=>{ updateSelectedCharacter(characterData);openModal()}}
      style={{ backgroundColor: cardColor }}
      className="w-full md:w-64 mx-4 my-4 shadow-md transition-transform duration-300 hover:shadow-2xl  hover:-translate-y-2 transition-all"
    >
      <div className="w-full h-48 md:h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={`https://picsum.photos/id/${
            isNaN(Number(characterData?.mass))
              ? 50
              : Math.floor(characterData?.mass)
          }/200`}
          alt={characterData?.name}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{characterData?.name}</h3>
        <p> {isLoading ? "Loading..." : ""}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
