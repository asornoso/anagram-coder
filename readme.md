# An anagram encoder

## Uses React as a frontend using Map and Tree data structures

## Usage:
- Find a single word anagram:
```javascript
decoder.findSingleWordAnagram('Forest').then( anagram => {
  console.log(anagram)
}
```
- Find a multiword anagram: 
```javascript
decoder.findPhraseAnagram('Eastern forest').then( anagram => {
  console.log(anagram)
}
```

- Find an anagram for a full name(First+last):
```javascript
decoder.findAnagram('Firstname lastname').then( anagram => {
  console.log(anagram)
}
```
