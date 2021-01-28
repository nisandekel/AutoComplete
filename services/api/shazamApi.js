var unirest = require("unirest");

const shazamApiService = {

    getFilterSongs: async (condSearch)=>{
        var req = unirest("GET", "https://shazam.p.rapidapi.com/auto-complete");

        req.query({
          term: condSearch,
          locale: "en-US",
        });
      
        req.headers({
          "x-rapidapi-key": "9b89850979mshb196935f7618f52p1534c4jsnc5a567f6b993",
          "x-rapidapi-host": "shazam.p.rapidapi.com",
          useQueryString: true,
        });

        return new Promise((resolve, reject) => {
            req.end(function (res) {
                if (res.error) throw new Error(res.error);
                return resolve(res.body);
            });
        });
    }
}


module.exports = shazamApiService;
