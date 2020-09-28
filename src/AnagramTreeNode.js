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

module.exports = AnagramTreeNode
