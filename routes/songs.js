var express = require("express");
var router = express.Router();
const shazamApiService = require("../services/api/shazamApi");

router.get("/search", async function (req, res, next) {
  const termSearch = req.query.q;
  let  newTermSearch = "";
  
  for (let i = 0; i < termSearch.length; i++) {
    if (i % 2 === 1) {
      newTermSearch+=termSearch.charAt(i) + "z";
    }else{
      newTermSearch+=termSearch.charAt(i);
    }
  }
  const songsObjectArray = await shazamApiService.getFilterSongs(newTermSearch);
  const songsStringArray = songsObjectArray.hints.map(
    (songObj) => songObj.term
  );
  res.send(songsStringArray);
});

module.exports = router;
