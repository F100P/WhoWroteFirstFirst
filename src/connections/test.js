

export default async function test(inputID){
    
    const id = inputID;
    console.log(id);
    var test;
    var First = "first";
    
    //Hämtar kommentarer från en video baserat på ID
    await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.REACT_APP_API_KEY}&videoId=${id}&part=snippet&order=time&searchTerms=${First}`, {
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