# An anagram encoder

## Uses React as a frontend with ES6 classes for Map and Tree data structures

## Frontend:
The frontend is a Single Page Application built with create-react-app.  
React components are all functional components utilizing hooks(useEffect and useState).  
The simplicity of the project allows for no state management solution(redux or contexts).  
ES6 classes are used for data structures that Javascript does not provide(trees and Maps with set theory operations)


## Backend:
There is no backend for this project. All computation is completed on the client's end.

Why is there no backend? I wanted to give web workers a shot. 

What is a web worker? A web worker is basically threading for the browser. Javascript is single threaded, so while it may not be "blocking", any heavy computation will cause the UI to freeze. By spawning a webworker, the UI remains interactive while the computation is done on a separate thread.  

Wouldn't a traditional backend be quicker? Yes, usually, but this was mostly an exercise in web workers with CRA. 

### Demo: https://anagram-encoder.firebaseapp.com/

## Usage(of AnagramEncoder.js):
- Find a single word anagram:
```javascript
encoder.findSingleWordAnagram('Forest').then( anagram => {
  console.log(anagram)
}
```
- Find a multiword anagram: 
```javascript
encoder.findPhraseAnagram('Eastern forest').then( anagram => {
  console.log(anagram)
}
```

- Find an anagram for a full name(First+last):
```javascript
encoder.findAnagram('Firstname lastname').then( anagram => {
  console.log(anagram)
}
```
