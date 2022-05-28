import { Box } from "@mui/system";
import React from "react";

import "./App.css";
function commentUserDate(data) {
  console.log(data);
  const author = data.authorDisplayName;
  const date = data.publishedAt;
  const comment = data.textOriginal;
  const profilePicture = data.authorProfileImageUrl;
  console.log(profilePicture);
  return (
    <Box className='commentBox'>
   
      
        <div className='authorNDate'>
        <img id='profilepic' src={profilePicture} />
          <div >
            <text>Author: {author}</text><p></p>
            <text>Commented: {date.substr(0,10)} at {date.substr(11,17)} </text>
          </div>

          
        </div>
      
      <div className='picNComment'>
        
        <text className='comment'>{comment}</text>
      </div>
    </Box>
  );
}
export default commentUserDate;
