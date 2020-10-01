import AnagramEncoder from '../js/AnagramEncoder.js'
import AnagramTreeNode from '../js/AnagramTreeNode.js'

describe("areAnagrams function test", () => {
  test("It should return true when both strings are anagrams of each other", () => {

    const myEncoder = new AnagramEncoder()
    expect( myEncoder.areAnagrams('test', 'test')).toBeTruthy()
    expect( myEncoder.areAnagrams('forest', 'foster')).toBeTruthy()
    expect( myEncoder.areAnagrams('1', 'a')).toBeFalsy()
    expect( myEncoder.areAnagrams('', 'a')).toBeFalsy()
    expect( myEncoder.areAnagrams('1', '')).toBeFalsy()
  })
})

describe("findSingleWordAnagram function test", () => {
  test("It should return an array of anagrams for a specific word", () => {

    const myEncoder = new AnagramEncoder()
    myEncoder.words = ['ab', 'ba', 'bc', 'cd']
    myEncoder.findSingleWordAnagram('ab').then((words) => {
      expect( words.sort() ).toEqual( ['ab', 'ba'].sort() )
    })
  })
})

describe("findSingleWordAnagram function test", () => {
  test("It should return an array of anagrams for a specific word", async () => {

    const myEncoder = new AnagramEncoder()
    myEncoder.words = ['ab', 'ba', 'bc', 'cd']
    let words = await myEncoder.findPhraseAnagram('ab ba')

    expect( words.sort() ).toEqual( ['ab ba', 'ba ab', 'ab ab', 'ba ba'].sort() )
  })
})

describe("findAnagramName function test", () => {
  test("It should return an array of anagrams for a name", async () => {

    const myEncoder = new AnagramEncoder()
    myEncoder.firstnames = ['ab', 'ba', 'ca']
    myEncoder.surnames = ['ab', 'yx', 'xy']
    let words = await myEncoder.findAnagramName('ac xy')

    expect( words.sort() ).toEqual( ['ca yx', 'ca xy'].sort() )
  })
})

describe("traverseToRootFrom function test", ()=> {
  test("It should return a string based upon the reverse traversial of the tree", () => {

    const rootNode = new AnagramTreeNode({word:"", leftovers: undefined})
    const level1Node = new AnagramTreeNode({word:"this", leftovers: undefined}, rootNode)
    const level2Node = new AnagramTreeNode({word:"is", leftovers: undefined}, level1Node)
    const level3Node = new AnagramTreeNode({word:"a", leftovers: undefined}, level2Node)
    const randomNode = new AnagramTreeNode({word:"asdfasdfasdf", leftovers: undefined}, level2Node)
    const level4Node = new AnagramTreeNode({word:"test", leftovers: undefined}, level3Node)

    const string = AnagramEncoder.traverseToRootFrom(level4Node)
    expect(string).toEqual("this is a test")

  })
})
