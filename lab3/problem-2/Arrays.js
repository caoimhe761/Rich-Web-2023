// Use the fetch API to get data from the API
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(posts => {
  // Extract title contents from the fetched posts
  const titleContents = posts.map(post => post.title);

  const postTitlesWithMoreThanSixWords = titleContents
  .filter(title => title.split(' ').length > 6); // Filter by word count


  console.log(postTitlesWithMoreThanSixWords);

  const bodyContent = posts.map(post => post.body);


  // Combine all body contents into a single string and split it into words
  //flatMap similar to map, but puts all new words into a new array.
  const words = bodyContent.flatMap(bodyContent=> bodyContent.split(/\s+/));

  const wordFrequencyMap = words.reduce((wordMap, word) => {
    word = word.toLowerCase(); // Convert to lowercase to make it case-insensitive

    // word =increments the associated value by 1. or initializes
    wordMap[word] = (wordMap[word] || 0) + 1;
    return wordMap;
  }, {});
  console.log(wordFrequencyMap);
})
   