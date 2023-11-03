import axios from "axios";

const fetchHomeworldData = async (homeworldURL) => {
  try {
    const response = await axios.get(homeworldURL);

    return response?.data?.name;
  } catch (error) {
    console.error("Error fetching homeworld data:", error);
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

export const getAllHomeworld = async (data) => {
  const finalResults = [];

  for (const person of data) {
    if (person?.homeworld) {
      const isPresent = doesExist(finalResults, person?.homeworld);
      if (!isPresent) {
        const homeworldData = await fetchHomeworldData(person?.homeworld);
        finalResults.push({
          URL: person?.homeworld,
          Data: homeworldData,
        });
      }
    }
  }

  return finalResults;
};
