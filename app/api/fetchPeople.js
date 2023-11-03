export const fetchPeople=async (url = "https://swapi.dev/api/people/?page=1")=> {
  try {
    const response = await fetch(url);
    const peopleData = await response.json();
    return peopleData;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching data");
  }
}

