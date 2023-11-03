export const fetchColor = async (url) => {
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