// A functor that represents a box containing a value
const Box = (value) => ({
    // The map function applies a given function to the value inside the box
    map: (func) => Box(func(value)),
    // For demonstration purposes, toString is used to inspect the functor
    toString: () => `Box(${value})`,
  });
  
  // Example usage of the Box functor
  const resultBox = Box(5)
    .map((x) => x * 2)
    .map((x) => x + 1);
  
  console.log(resultBox.toString()); // Output: Box(11)
  