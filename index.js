const fs = require('fs')
const MapSet = require('./MapSet.js')
const AnagramTreeNode = require('./AnagramTreeNode.js')

class AnagramDecoder{

  constructor(){
    this.words = []
    this.firstnames = []
    this.surnames = []

    this.user_input = undefined
    this.anagrams = []

  }

  //Finds an anagram in a name
  findAnagramName(name){
    return new Promise( (res, rej) => {
      let names = []
      name = name.toLowerCase()

      this.load_names().then( (status) => {

        let input_map = new MapSet([...name.replace(/ /g, '')])
        for(let i = 0; i < this.firstnames.length; i++){

          let fmap = new MapSet([...this.firstnames[i]])

          if(!MapSet.is_subset_strict(input_map, fmap))
            continue

          let leftovers = MapSet.subtract(input_map, fmap)
          if(leftovers.size == 0)
            continue;

          for(let j = 0; j < this.surnames.length; j++){
            let smap = new MapSet([...this.surnames[j]])
            if(MapSet.equals_strict(smap, leftovers))
              names.push(this.firstnames[i] + ' ' + this.surnames[j])
          }

        }
        res(names)

      }).catch((err) => {
        console.log(err)
      })
    })

  }

  //Finds a single word anagram for parameter
  findSingleWordAnagram(word){
    return new Promise( (res, rej) => {
      //Remove white spaces in parameter
      word = word.replace(/ /g, '')
      //Load the english word list
      this.load_words().then( ()=> {
        let anagrams = []
        for(let i = 0; i < this.words.length; i++){
          if(this.areAnagrams(word, this.words[i]))
            anagrams.push(this.words[i])
        }
        res(anagrams)
      })
    })

  }

  //Finds an anagram from a while phrase
  findPhraseAnagram(phrase, return_tree = false){
    return new Promise((res, rej) => {
      //Load the english word list
      this.load_words().then( ()=> {
        //Convert phrase into set without spaces
        let map_phrase = new MapSet([...phrase.replace(/ /g, '').toLowerCase()])
        //Create your anagramTree with the phrase as the root node
        let rootNode = new AnagramTreeNode( {word: "", leftovers:map_phrase}, undefined)

        let phrases = []
        this.treeAnagramFinder(rootNode, phrases)
        if(return_tree)
          res( [phrases, rootNode] )
        else
          res( phrases)
      })
    })

  }

  //Checks if 2 strings are anagrams
  areAnagrams(s1, s2){
    //clean strings of whitespace
    s1 = s1.replace(/ /g, '').toLowerCase()
    s2 = s2.replace(/ /g, '').toLowerCase()
    //Convert to mapsets
    const map1 = new MapSet([...s1])
    const map2 = new MapSet([...s2])
    //check if equal mapsets. If true then they are anagrams
    return MapSet.equals_strict(map1, map2)
  }

  //Loads wordlist to class variable words
  load_words(){
    return new Promise((res, rej) => {
      if(this.words.length > 0)
        res(0)

      this.load_word_array('./wordlists/words_array.json').then( words => {
        this.words = words
        res(0)
      })
    })
  }

  //Loads name lists to class variables firstnames and surnames
  load_names(){
    return new Promise((res, rej) => {
      if(this.firstnames.length > 0 && this.surnames.length > 0)
        res(-1)

      let promises = []
      promises.push(this.load_word_array('./wordlists/firstnames.json'))
      promises.push(this.load_word_array('./wordlists/surnames.json'))


      Promise.all( promises).then( data_array => {
        this.firstnames = data_array[0]
        this.surnames = data_array[1]
        res(0)
      })

    })
  }

  //Loads the specified word array and returns it
  load_word_array(filepath){
    return new Promise( function(res, rej){
      fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) throw err
        let strings = JSON.parse(data)
        res(strings)
      })
    })
  }

  //Traverses a tree in reverse to make a phrase and returns that phrase
  traverseToRootFrom(node){
    let phrase = ""
    while(node.parent != undefined){
      phrase = node.data.word+' '+ phrase
      node = node.parent
    }
    return phrase
  }

  //Generates a tree. When no leftovers are present, calls traverseToRootFrom()
  //To generate a phrase and adds it to list of found anagrams
  treeAnagramFinder(node, found){

    for(let i = 0; i < this.words.length; i++){

      const word_map = new MapSet([...this.words[i]])

      if(MapSet.is_subset_strict(node.data.leftovers, word_map)){
        let new_leftovers = MapSet.subtract(node.data.leftovers, word_map)
        let child = new AnagramTreeNode({word: this.words[i], leftovers: new_leftovers}, node)
        node.children.push(child)
        if(new_leftovers.size > 1)
          this.treeAnagramFinder(child, found)
        if(new_leftovers.size == 0)
          found.push(this.traverseToRootFrom(child).trim())
      }
    }

  }

//End of class
}

let decoder = new AnagramDecoder()

decoder.findSingleWordAnagram('forest').then( anagrams => {
  console.log(anagrams)
})

decoder.findPhraseAnagram("hello forest").then( anagrams => {
  console.log(anagrams)
})

decoder.findAnagramName("adam sornoso").then( anagrams => {
  console.log('name: ')
  console.log(anagrams)
})
