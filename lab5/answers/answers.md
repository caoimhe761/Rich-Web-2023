# Question 1 
Props (short for properties) are a way to pass data from a parent component to a child component in React. They are immutable and are used to communicate between components. Props are set by the parent component and are read-only for the child component. 
example to question is in question1.js 

# Question 2

In functional programming, a functor is an object or data structure that implements a map function, allowing you to apply a function to the values it contains while preserving the structure of the functor. Functors are a way of abstracting and generalizing the concept of mapping over elements in a container.

In JavaScript, arrays are common examples of functors because they have a map method that applies a provided function to each element in the array and returns a new array with the results.
example to question is in question2.js 

# Question 3
# Callbacks:

Advantage: Callbacks are simple and widely supported in JavaScript. They are easy to understand, especially for handling asynchronous operations in a sequential manner.

Disadvantage:If an additional asynchronous request is required based on the response from a previous one, the second asynchronous request must incorporate the callback logic of the first request.

# promises
Advantage: Promises can also be composed or passed as arguments to functions

Disadvantage: Promises can break badly when logical ordering of responses is required

# Streams:
Advantage: Streams provide immediate access to data. Previously, the client had to wait for the complete file to download before gaining access to it.

Disadvantage: Streams can be more complex to understand, especially for beginners. Implementing and debugging stream-based code may require a better understanding of concepts like backpressure and event-driven programming.

# Question 4

example and image in question 4 folder 

# Question 5

When a user enters a URL into a web browser, the browser initiates a sequence of steps to load and bootstrap a rich web application. This process begins with DNS resolution to obtain the server's IP address, followed by an HTTP request for the requested resource, typically an HTML document. As the browser parses the HTML, it encounters external resources like stylesheets and scripts, triggering parallel requests. The browser constructs the Document Object Model (DOM) and CSS Object Model (CSSOM), leading to the creation of a Render Tree, which defines the visual hierarchy. Layout and painting operations follow, rendering the content on the screen. If the web application relies on a framework, its initialization occurs, enabling client-side routing and state management. Modern applications may leverage asynchronous loading for dynamic content, and service workers can be registered for additional features. Once completed, the web application is fully loaded, responsive to user interactions, and operational.
