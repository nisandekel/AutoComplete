
new autoComplete({
    data: {                              // Data src [Array, Function, Async] | (REQUIRED)
      src: async () => {
        // API key token
        //const token = "this_is_the_API_token_number";
        // User search query
        const query = document.querySelector("#autoComplete").value;
        // Fetch External Data Source
        const noResultElement = document.querySelector('.no_result');
        noResultElement.classList.add('hidden');

        const source = await fetch(`http://localhost:3000/api/songs/search?q=${query}`);

        // Format data into JSON
        const data = await source.json();
        // Return Fetched data
        return data;
      },
      cache: false
    },
    query: {                             // Query Interceptor               | (Optional)
          manipulate: (query) => {
            return query.replace("pizza", "burger");
          }
    },
    sort: (a, b) => {                    // Sort rendered results ascendingly | (Optional)
        if (a.match < b.match) return -1;
        if (a.match > b.match) return 1;
        return 0;
    },
    placeHolder: "Enter music terms...",     // Place Holder text                 | (Optional)
    selector: "#autoComplete",           // Input field selector              | (Optional)
    observer: true,                      // Input field observer | (Optional)
    threshold: 1,                        // Min. Chars length to start Engine | (Optional)
    debounce: 300,                       // Post duration for engine to start | (Optional)
    searchEngine: "strict",              // Search Engine type/mode           | (Optional)
    resultsList: {                       // Rendered results list object      | (Optional)
        container: source => {
            source.setAttribute("id", "song_list");
        },
        destination: "#autoComplete",
        position: "afterend",
        element: "ul",
        idName: "autoComplete_list",
    },
    highlight: true,                       // Highlight matching results      | (Optional)
    resultItem: {                          // Rendered result item            | (Optional)
        content: (data, source) => {
            source.innerHTML = data.match;
            source.onclick = () =>{
                document.querySelector('.result-display').innerText = data.value;
            }
        },
        element: "li"
    },
    noResults: (dataFeedback, generateList) => {
        // No Results List Item
        const noResultElement = document.querySelector('.no_result');
        noResultElement.innerText = `Found No Results for "${dataFeedback.query}"`;
        noResultElement.classList.remove('hidden');
    },
    onSelection: feedback => {             // Action script onSelection event | (Optional)
        console.log(feedback.selection.value.image_url);
    }
});
