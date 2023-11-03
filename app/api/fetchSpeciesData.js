import axios from "axios";

const fetchSpecieData = async (specieURL) => {
  try {
    const response = await axios.get(specieURL);
    return response?.data?.name;

  } catch (error) {
    console.error("Error fetching Specie data:", error);
    return null;
  }
};

const doesExist = (master, url) => {
  for (let i = 0; i < master.length; i++) {
    if (master[i]?.URL === url) {
      return true;
    }
  }
  return false;
};

export const getAllSpecies = async (data) => {
  const finalResults = [];

  for (const person of data) {
    if (person.species.length > 0) {
      for (const specie of person?.species) {
        const isPresent = doesExist(finalResults, specie);
        if (!isPresent) {
          const specieData = await fetchSpecieData(specie);
          finalResults.push({
            URL: specie,
            Data: specieData,
          });
        }
      }
    }
  }

  return finalResults;
};
