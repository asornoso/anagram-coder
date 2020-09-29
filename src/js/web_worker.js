import greenlet from 'greenlet'

export const workerFn = greenlet(`async (type, input, e) => {


  class AnagramTreeNode {

    constructor( data, parent){
      this.parent = parent
      this.data = data
      // {
      //   word: The word that fits this anagram set
      //   leftovers: a map of letters left over
      // }
      this.children = []
    }

  }



  class MapSet extends Map{

    constructor(a, b){
      super()
      if(a && Array.isArray(a))
        this.create_from_array(a, b)
      else if(a && !b && typeof a === "object")
        this.create_from_object(a)
    }

    // New constructor functions for quicker instanciations from object
    create_from_object(object){
      let keys = Object.keys(object)
      for(let i = 0; i < keys.length; i++)
        this.set(keys[i], object[keys[i]])
    }

    // New constructor functions for quicker instanciations from array
    create_from_array(array, default_val = undefined){
      if(default_val)
      {
        for(let i = 0; i < array.length; i++)
          this.set(array[i], default_val)
      }
      else{
        for(let i = 0; i < array.length; i++){
          if(this.has(array[i]))
            this.set(array[i], this.get(array[i])+1)
          else
            this.set(array[i], 1)
        }
      }
    }


    static deep_copy(map){
      let copy = new MapSet()
      for( let key of map.keys()){
        copy.set(key, map.get(key))
      }
      return copy
    }

    //Returns a new map of every key in both map a and b
    //values of matching keys are summed up if summation is true
    static union(map_a, map_b, summation = false){
      let union = this.deep_copy(map_a)
      for(let key of map_b.keys()){
        if(union.has(key)){
          if(summation)
            union.set(key, map_a.get(key) + map_b.get(key))
        }
        else
          union.set(key, map_b.get(key))
      }
      return union
    }

    //Returns a new map of keys that occur in both map a and b
    //values of matching keys(all keys in intersection) are summed up if summation is true
    static intersection(map_a, map_b, summation = false){
      let inter = new MapSet()
      for( let key of map_b.keys()){
          if(map_a.has(key)){
            if(summation)
              inter.set(key, map_a.get(key) + map_b.get(key))
            else
              inter.set(key, map_a.get(key))
          }
      }
      return inter
    }

    //Returns a new map of keys that occur in both map a and b with the same value
    //values of matching keys(all keys in intersection) are summed up if summation is true
    static intersection_strict(map_a, map_b, summation = false){
      let inter = new MapSet()
      for( let key of map_b.keys()){
          if(map_a.has(key) && map_a.get(key) === map_b.get(key)){
            if(summation)
              inter.set(key, map_a.get(key) + map_b.get(key))
            else
              inter.set(key, map_a.get(key))
          }
      }
      return inter
    }


    //Returns true if b is a subset of a
    //Only checks keys
    static is_subset(map_a, map_b){
      for( let key of map_b.keys()){
          if(!map_a.has(key))
            return false
      }
      return true
    }

    //Returns true if b is a subset of a
    //Checks keys and value
    static is_subset_strict(map_a, map_b){
      for( let key of map_b.keys()){
          if(!map_a.has(key))
            return false
          if(map_a.get(key) < map_b.get(key))
            return false
      }
      return true
    }

    //Returns a new map of all keys that occur only in map a
    static difference(map_a, map_b){
      let diff = this.deep_copy(map_a)
      for( let key of map_b.keys()){
        if(diff.has(key))
          diff.delete(key)
      }
      return diff
    }

    //Returns a new map of all keys in a, with keys that appear in both having
    //their values subtracted value = map_a[value] - map_b[value]
    static subtract(map_a, map_b){
      let subtracted = MapSet.deep_copy(map_a)
      for( let key of map_b.keys()){
        if(map_a.has(key)){
          let value = map_a.get(key) - map_b.get(key)
          if(value <= 0)
            subtracted.delete(key)
          else
            subtracted.set(key, value)
        }
      }
      return subtracted
    }

  //Returns true if both maps have the same keys
    static equals(map_a, map_b){
      if(map_a.size() !== map_b.size())
        return false
      else {
        for(let key of map_b.keys()){
          if(!map_a.has(key))
            return false
        }
      }
      return true
    }

  //Returns true if both maps have the same key value pairs
    static equals_strict(map_a, map_b){
      if(map_a.size !== map_b.size)
        return false
      else {
        for(let entry of map_b){
          if(map_a.has(entry[0])){
            if(map_a.get(entry[0]) !== entry[1])
              return false
          }
          else
            return false
        }
      }
      return true
    }

}
    class AnagramEncoder{

      constructor(words, firstnames, surnames){
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
      traverseToRootFrom(node){
        let phrase = ""
        while(node.parent !== undefined){
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
            if(new_leftovers.size === 0)
              found.push(this.traverseToRootFrom(child).trim())
          }
        }

      }

    //End of class
    }




    let encoder = new AnagramEncoder(e.words, e.firstnames, e.surnames)
    if(type === 'single'){
      return await encoder.findSingleWordAnagram(input)
    }
    else if (type === 'phrase'){
        return await encoder.findPhraseAnagram(input)
    }
    else if (type === 'name'){
        return await encoder.findAnagramName(input)
    }

}`)
