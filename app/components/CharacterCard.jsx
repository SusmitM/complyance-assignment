import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const fetchColor = async (url) => {
  try {
    const data = await fetch(url);
    const species = await data.json();
    const specieColor = species?.skin_colors;

    if (specieColor && specieColor !== "n/a") {
      const colorsArray = specieColor.split(', ');
      return colorsArray[0];
    } else {
      return 'red';
    }
  } catch (error) {
    console.log(error);
    return 'white';
  }
};

const CharacterCard = ({ characterData }) => {
 

  const { data: cardColor, isLoading, isError } = useQuery(
    ['specieColor', characterData?.species[0]],
    () => fetchColor(characterData?.species[0]),
    {
      enabled: !!characterData?.species[0], // Enable the query only if the species URL is available
    }
  );

  useEffect(() => {
    // Using React Query, setting state is no longer required as data will be available in cardColor
    // Use cardColor directly in the JSX
  }, [cardColor]);

  console.log(cardColor); 

  return (
    <div
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
       <p> {isLoading?"Loading..." :""}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
