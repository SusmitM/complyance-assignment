import axios from "axios";

const fetchFilmData = async (filmURL) => {
  try {
    const response = await axios.get(filmURL);
 
    return response?.data?.title;
  } catch (error) {
    console.error("Error fetching film data:", error);
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

export const getAllFilms = async (data) => {
  const finalResults = [];
  
  for (const person of data) {
    if (person?.films.length > 0) {
      for (const film of person?.films) {
        const isPresent = doesExist(finalResults, film);
        if (!isPresent) {
         
          const filmData = await fetchFilmData(film);
          finalResults.push({
            URL: film,
            Data: filmData,
          });
        }
      }
    }
  }

  return finalResults;
};
