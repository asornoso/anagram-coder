
import MapSet from './MapSet.js'
import AnagramTreeNode from './AnagramTreeNode.js'
import {firstnames} from './wordlists/firstnames.js'
import {surnames} from './wordlists/surnames.js'
import {words} from './wordlists/words_array.js'

class AnagramEncoder{

  constructor(){
    this.words = words
    this.firstnames = firstnames
    this.surnames = surnames

    this.user_input = undefined
    this.anagrams = []
  }

  //Finds an anagram in a name
  async findAnagramName(name){
      let names = []
      name = name.toLowerCase()

        let input_map = new MapSet([...name.replace(/ /g, '')])
        for(let i = 0; i < this.firstnames.length; i++){

          let fmap = new MapSet([...this.firstnames[i]])

          if(!MapSet.is_subset_strict(input_map, fmap))
            continue

          let leftovers = MapSet.subtract(input_map, fmap)
          if(leftovers.size === 0)
            continue;

          for(let j = 0; j < this.surnames.length; j++){
            let smap = new MapSet([...this.surnames[j]])
            if(MapSet.equals_strict(smap, leftovers))
              names.push(this.firstnames[i] + ' ' + this.surnames[j])
          }

        }
        return names
  }

  //Finds a single word anagram for parameter
  async findSingleWordAnagram(word){
      //Remove white spaces in parameter
      word = word.replace(/ /g, '')
      //Load the english word list
        let anagrams = []
        for(let i = 0; i < this.words.length; i++){
          if(this.areAnagrams(word, this.words[i]))
            anagrams.push(this.words[i])
        }
        return anagrams
  }

  //Finds an anagram from a while phrase
  async findPhraseAnagram(phrase, return_tree = false){
        //Convert phrase into set without spaces
        let map_phrase = new MapSet([...phrase.replace(/ /g, '').toLowerCase()])
        //Create your anagramTree with the phrase as the root node
        let rootNode = new AnagramTreeNode( {word: "", leftovers:map_phrase}, undefined)

        let phrases = []
        this.treeAnagramFinder(rootNode, phrases)
        if(return_tree)
         return [phrases, rootNode]
       else
         return phrases
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


  //Traverses a tree in reverse to make a phrase and returns that phrase
  static traverseToRootFrom(node){
    let phrase = ""
    while(node.parent !== undefined){
      phrase = node.data.word+' '+ phrase
      node = node.parent
    }
    return phrase.trim()
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
        if(new_leftovers.size === 0)
          found.push(AnagramEncoder.traverseToRootFrom(child))
      }
    }
  }

//End of class
}

export default AnagramEncoder
