

export default async function searchPhrase(inputID,inputString){
 
  



    const key = process.env.API_KEY
    
    const id = inputID;
    const phrase = inputString;
    
    var test;
    
    
    //Hämtar kommentarer från en video baserat på ID
    await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.API_KEY}&videoId=${id}&part=snippet&order=time&searchTerms=${phrase}`, {
        method: "GET"
    })

    .then((response) => {if(!response.ok){
       //vad händer om man söker på ASDFaegadfjglka? varför ger det felmeddelande?
        throw new Error("something went wrong");
        
      }
      test=response.json();
      return test;
    }
  )
  
  .then((response) => {
    console.log(response);
    test = response;
    
    
  })
  .catch((err) => {console.log("Error fetching test endpoint", err)});
    return test.items;
}