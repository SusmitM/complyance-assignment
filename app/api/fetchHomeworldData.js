export const fetchHomeworldData=async(url)=>{
    try{
        const response=await fetch(url);
        const homeworldInfo=await response.json();
        
        return homeworldInfo
  
    }
    catch(error){
      console.error(error);
      throw new Error("Error fetching data");
    }
  }