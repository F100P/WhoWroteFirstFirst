import "./App.css";
import test from "./connections/test";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import commentUserDate from "./commentUserDate";
import sortByDate from "./components/sortByDate";
import { Button } from "@mui/material";

import searchPhrase from "./connections/searchPhrase";

function App() {
  const [search, setSearch] = React.useState("textFromSearchField");
  const [data, setData] = React.useState("data");
  const [loaded, setLoaded] = React.useState("loaded");
  const [selectedView, setSelectedView] = useState(1);
  const [nonValid, setNonValid] = useState(false);
  const [Phrase, setPhrase] = useState();

  useEffect(() => {
    setLoaded(false);
    setData(null);
  }, []);

  const handleChange = (event) => {
    if (event.keyCode == 13) {
      filterLink(event.target.value);
    }
  };

  const filterLink = (webbAdress) => {
    const videoID = webbAdress.split("v=");
    //maskar ut VideoID:t
    if (videoID[1]) {
      setSearch(videoID[1]);
      test(videoID[1]).then((data) => {
        setData(data);

        setLoaded(true);
      });

      setSelectedView(4);

     
    } else {
      //lägg till vad som bör göras när det inte fungerar
      setNonValid(true);
      return console.log("plzz search with a valid youtube adress");
    }
  };

  const printComments = () => {
    if (loaded == true) {
      console.log(sortByDate(data));
      data.map((element) =>
        console.log(element.snippet.topLevelComment.snippet.textOriginal)
      );
      return data.map((element) =>
        commentUserDate(element.snippet.topLevelComment.snippet)
      );
    }
  };
  const showErrorMessages = () => {
    if (nonValid == true) {
      return <text>Plzz use a proper URL</text>;
    }
  };

  const noData = (data) => {
    console.log(data);
    if (data == null || data.length == 0) {
      return (
        <text>Sorry No Search Result Contaning The Phrase "{Phrase}"</text>
      );
    } else {
      return (
        <h1>Here are the first comments containing the Phrase "{Phrase}"</h1>
      );
    }
  };

  const searchDual = (webbAdress, phraseToSearch) => {
    const videoID = webbAdress.split("v=");
    //maskar ut VideoID:t
    if (videoID[1]) {
      console.log("nu söker vi med fras");
      setSearch(videoID[1]);
      setPhrase(phraseToSearch);
      searchPhrase(videoID[1], phraseToSearch).then((data) => {
        setData(data);

        setLoaded(true);
      });

      setSelectedView(5);

      
    } else {
      //lägg till vad som bör göras när det inte fungerar
      setNonValid(true);
      return console.log("plzz search with a valid youtube adress");
    }
  };

  const handleDualSerach = (event) => {
    if (
      event.keyCode == 13 &&
      document.getElementById("searchField").value != "" &&
      document.getElementById("searchPhrase").value != ""
    ) {
      searchDual(
        document.getElementById("searchField").value,
        document.getElementById("searchPhrase").value
      );
    }
  };

  const componentToRender = (selectedView) => {
    switch (selectedView) {
      case 1:
        return (
          <div>
            <Button
              onClick={() => {
                setSelectedView(2);
              }}
            >
              Find First First
            </Button>
            <Button
              onClick={() => {
                setSelectedView(3);
              }}
            >
              Search a phrase
            </Button>
          </div>
        );

      case 2:
        return (
          <div className='search'>
            <h1>Search With URL</h1>
            <TextField
              id='searchField'
              onKeyDown={handleChange}
              variant='outlined'
              fullWidth
              label='Search Using A Youtube URL'
            />
            <Button
              onClick={() => {
                filterLink(document.getElementById("searchField").value);
              }}
            >
              Search
            </Button>
            {showErrorMessages()}
          </div>
          //Släpande kurser
        );

      case 3:
        return (
          <div className='search'>
            <h1>Search With URL</h1>
            <TextField
              id='searchField'
              onKeyDown={handleDualSerach}
              variant='outlined'
              fullWidth
              label='Search Using A Youtube URL'
            />
            <h1>Search With a Phase</h1>
            <TextField
              id='searchPhrase'
              onKeyDown={handleDualSerach}
              variant='outlined'
              fullWidth
              label='Search A Pharse To Find'
            />
            <Button
              onClick={() => {
                searchDual(
                  document.getElementById("searchField").value,
                  document.getElementById("searchPhrase").value
                );
              }}
            >
              Search
            </Button>
            {showErrorMessages()}
          </div>
        );

      case 4:
        return (
          <div className='showComments'>
            
            <h1>Here are the first comments containing the word "First"</h1>
            {printComments()}
          </div>
        );

      case 5:
        return (
          <div className='showComments'>
            {noData(data)}

            {printComments()}
          </div>
        );

      default:
        <text>Något gick snett om du hamnade här</text>;
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>{componentToRender(selectedView)}</header>
    </div>
  );
}

export default App;
