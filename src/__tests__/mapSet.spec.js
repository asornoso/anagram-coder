import MapSet from '../js/MapSet.js'

describe("Create mapset from object", () => {
  test("It should create a mapset from an object", () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
      d: 0
    }

    let myMap = new MapSet(obj)
    const expectedMapSet = new MapSet()
    expectedMapSet.set('a', 1)
    expectedMapSet.set('b', 2)
    expectedMapSet.set('c', 3)
    expectedMapSet.set('d', 0)

    expect(myMap).toEqual(expectedMapSet)
  })
})


describe("Create mapset from array v1", () => {
  test("It should create a mapset from an array with no default value", () => {
    const arr = [..."Hello"]
    let myMap = new MapSet(arr)

    let expectedMapSet = new MapSet()
    expectedMapSet.set('H', 1)
    expectedMapSet.set('e', 1)
    expectedMapSet.set('l', 2)
    expectedMapSet.set('o', 1)

    expect(myMap).toEqual(expectedMapSet)
  })
})

describe("Create mapset from array v2", () => {
  test("It should create a mapset from an array with a default value of 5", () => {
    const arr = [..."Hello"]
    let myMap = new MapSet(arr, 0)

    let expectedMapSet = new MapSet()
    expectedMapSet.set('H', 0)
    expectedMapSet.set('e', 0)
    expectedMapSet.set('l', 1)
    expectedMapSet.set('o', 0)

    expect(myMap).toEqual(expectedMapSet)
  })
})

describe("Deep copy mapset", () => {
  test("It should create a deep copy of an existing mapset", () => {
    let myMap = new MapSet([..."Test"])

    let copyMap = MapSet.deep_copy(myMap)

    expect(myMap).toEqual(copyMap)
  })
})

describe("MapSet Equals 1", () => {
  test("It should return true for equal mapsets by key", () => {
    let myMap = new MapSet([..."Test"])
    let copyMap = new MapSet([..."Testeeee"])

    expect(MapSet.equals(myMap, copyMap)).toBeTruthy()
  })
})

describe("MapSet Equals 2", () => {
  test("It should return false for unequal mapsets by key", () => {
    let myMap = new MapSet([..."Test"])
    let copyMap = new MapSet([..."abcd"])

    expect(MapSet.equals(myMap, copyMap)).toBeFalsy()
  })
})

describe("MapSet Strict Equals 1", () => {
  test("It should return true for equal mapsets by key and value", () => {
    let myMap = new MapSet([..."Test"])
    let copyMap = new MapSet([..."Test"])

    expect(MapSet.equals_strict(myMap, copyMap)).toBeTruthy()
  })
})

describe("MapSet Strict Equals 2", () => {
  test("It should return false for unequal mapsets by key and value", () => {
    let myMap = new MapSet([..."Test"])
    let copyMap = new MapSet([..."Testeeee"])

    expect(MapSet.equals_strict(myMap, copyMap)).toBeFalsy()
  })
})

describe("MapSet Subset test 1", () => {
  test("It should return true for map B being a subset of map A", () => {
    let map_a = new MapSet([..."abcd"])
    let map_b = new MapSet([..."abc"])

    expect(MapSet.is_subset(map_a, map_b)).toBeTruthy()
  })
})

describe("MapSet Subset test 2", () => {
  test("It should return false for map B not being a subset of map A", () => {
    let map_a = new MapSet([..."abcd"])
    let map_b = new MapSet([..."abce"])

    expect(MapSet.is_subset(map_a, map_b)).toBeFalsy()
  })
})

describe("MapSet Strict Subset test 1", () => {
  test("It should return true for map B being a subset of map A", () => {
    let map_a = new MapSet([..."abccccd"])
    let map_b = new MapSet([..."abcc"])

    expect(MapSet.is_subset_strict(map_a, map_b)).toBeTruthy()
  })
})

describe("MapSet Strict Subset test 2", () => {
  test("It should return false for map B not being a subset of map A", () => {
    let map_a = new MapSet([..."abcd"])
    let map_b = new MapSet([..."abcc"])

    expect(MapSet.is_subset_strict(map_a, map_b)).toBeFalsy()
  })
})

describe("MapSet Difference test 1", () => {
  test("It should return a new map of all keys in map_a but not in map_b", () => {
    let map_a = new MapSet([..."abcd"])
    let map_b = new MapSet([..."ab"])
    expect(MapSet.difference(map_a, map_b)).toEqual(new MapSet([..."cd"]))
  })
})

describe("MapSet Difference test 2", () => {
  test("It should return a new empty mapset since map_a equals map_b", () => {
    let map_a = new MapSet([..."abcd"])
    let map_b = new MapSet([..."abcd"])
    expect(MapSet.difference(map_a, map_b)).toEqual(new MapSet())
  })
})

describe("MapSet Difference test 3", () => {
  test("It should return a new empty mapset since map_a is a subset of map_b", () => {
    let map_a = new MapSet([..."abcd"])
    let map_b = new MapSet([..."abcdcdcdcde"])
    expect(MapSet.difference(map_a, map_b)).toEqual(new MapSet())
  })
})

describe("Mapset Subtract 1", () => {
  test("It should return a new empty mapset since map_a strict equals map_b", () => {
    let map_a = new MapSet([..."abcd"])
    let map_b = new MapSet([..."abcd"])
    expect(MapSet.subtract(map_a, map_b)).toEqual(new MapSet())
  })
})

describe("MapSet Subtract 2", () => {
  test("It should return a new mapset of map_a - map_b", () => {
    let map_a = new MapSet([..."abcdddd"])
    let map_b = new MapSet([..."abcd"])

    let expectedMap = new MapSet([..."ddd"])
    expect(MapSet.subtract(map_a, map_b)).toEqual(expectedMap)
  })
})

describe("MapSet Subtract 3", () => {
  test("It should return a new mapset equal to map_a", () => {
    let map_a = new MapSet([..."abcdddd"])
    let map_b = new MapSet([...""])

    expect(MapSet.subtract(map_a, map_b)).toEqual(map_a)
  })
})

describe("MapSet Union 1", () => {
  test("It should return a new mapset equal to map_a since map_b is empty", () => {
    let map_a = new MapSet([..."abcdddd"])
    let map_b = new MapSet([...""])

    expect(MapSet.union(map_a, map_b)).toEqual(map_a)
  })
})

describe("MapSet Union 2", () => {
  test("It should return a new mapset equal to map_b since map_a is empty", () => {
    let map_a = new MapSet([...""])
    let map_b = new MapSet([..."abcdddd"])

    expect(MapSet.union(map_a, map_b)).toEqual(map_b)
  })
})

describe("MapSet Union 3", () => {
  test("It should return a new mapset equal to the union of map_a and map_b", () => {
    let map_a = new MapSet([..."123456"])
    let map_b = new MapSet([..."abcdd"])

    let expectedMap = new MapSet([..."123456abcdd"])

    expect(MapSet.union(map_a, map_b)).toEqual(expectedMap)
  })
})

describe("MapSet Union 4", () => {
  test("It should return a new mapset equal to the union of map_a and map_b with summation", () => {
    let map_a = new MapSet([..."abcd"])
    let map_b = new MapSet([..."abcd"])

    let expectedMap = new MapSet([..."abcdabcd"])

    expect(MapSet.union(map_a, map_b, true)).toEqual(expectedMap)
  })
})

describe("MapSet Union 5", () => {
  test("It should return a new mapset equal to the union of map_a and map_b with summation", () => {
    let map_a = new MapSet([..."abcd"])
    let map_b = new MapSet([..."abcd"])

    let unexpectedMap = new MapSet([..."abcd"])

    expect(MapSet.union(map_a, map_b, true)).not.toEqual(unexpectedMap)
  })
})

describe("MapSet intersection  1", () => {
  test("It should return the intersection(everything that occurs in both) of map_a and map_b", () => {
    let map_a = new MapSet([..."abcd"])
    let map_b = new MapSet([..."abcd"])

    let expectedMap = new MapSet([..."abcd"])
    expect(MapSet.intersection(map_a, map_b)).toEqual(expectedMap)
  })
})

describe("MapSet intersection  2", () => {
  test("It should return the intersection(everything that occurs in both) of map_a and map_b", () => {
    let map_a = new MapSet([..."abcd"])
    let map_b = new MapSet([..."abcdefg"])

    let expectedMap = new MapSet([..."abcd"])
    expect(MapSet.intersection(map_a, map_b)).toEqual(expectedMap)
  })
})

describe("MapSet intersection  3", () => {
  test("It should return the intersection(everything that occurs in both) of map_a and map_b", () => {
    let map_a = new MapSet([..."abcd1234"])
    let map_b = new MapSet([..."abcdefg"])

    let expectedMap = new MapSet([..."abcd"])
    expect(MapSet.intersection(map_a, map_b)).toEqual(expectedMap)
  })
})


describe("MapSet intersection with summation 1", () => {
  test("It should return the intersection(everything that occurs in both) of map_a and map_b", () => {
    let map_a = new MapSet([..."abcd"])
    let map_b = new MapSet([..."abcd"])

    let expectedMap = new MapSet([..."abcd"],2)
    expect(MapSet.intersection(map_a, map_b, true)).toEqual(expectedMap)
  })
})

describe("MapSet intersection with summation 2", () => {
  test("It should return the intersection(everything that occurs in both) of map_a and map_b", () => {
    let map_a = new MapSet([..."abcd"])
    let map_b = new MapSet([..."abcdefg"])

    let expectedMap = new MapSet([..."abcd"], 2)
    expect(MapSet.intersection(map_a, map_b, true)).toEqual(expectedMap)
  })
})

describe("MapSet intersection with summation 3", () => {
  test("It should return the intersection(everything that occurs in both) of map_a and map_b", () => {
    let map_a = new MapSet([..."abcd1234"])
    let map_b = new MapSet([..."abcdefg"])

    let expectedMap = new MapSet([..."abcd"], 2)
    expect(MapSet.intersection(map_a, map_b, true)).toEqual(expectedMap)
  })
})



describe("MapSet Strict intersection 1", () => {
  test("It should return the intersection(everything that occurs in both) of map_a and map_b based on keys and values", () => {
    let map_a = new MapSet([..."abcd"])
    let map_b = new MapSet([..."abcd"])

    let expectedMap = new MapSet([..."abcd"])
    expect(MapSet.intersection_strict(map_a, map_b)).toEqual(expectedMap)
  })
})

describe("MapSet Strict intersection 2", () => {
  test("It should return the intersection(everything that occurs in both) of map_a and map_b based on keys and values", () => {
    let map_a = new MapSet([..."abcd"])
    let map_b = new MapSet([..."abcdefg"])

    let expectedMap = new MapSet([..."abcd"])
    expect(MapSet.intersection_strict(map_a, map_b)).toEqual(expectedMap)
  })
})

describe("MapSet Strict intersection 3", () => {
  test("It should return the intersection(everything that occurs in both) of map_a and map_b based on keys and values", () => {
    let map_a = new MapSet([..."abcd123a4"])
    let map_b = new MapSet([..."abcdefg"])

    let expectedMap = new MapSet([..."bcd"])
    expect(MapSet.intersection_strict(map_a, map_b)).toEqual(expectedMap)
  })
})


describe("MapSet Strict intersection with summation 1", () => {
  test("It should return the intersection(everything that occurs in both) of map_a and map_b based on keys and values", () => {
    let map_a = new MapSet([..."abcd"])
    let map_b = new MapSet([..."abcd"])

    let expectedMap = new MapSet([..."abcd"], 2)
    expect(MapSet.intersection_strict(map_a, map_b, true)).toEqual(expectedMap)
  })
})

describe("MapSet Strict intersection with summation 2", () => {
  test("It should return the intersection(everything that occurs in both) of map_a and map_b based on keys and values", () => {
    let map_a = new MapSet([..."abcd"])
    let map_b = new MapSet([..."abcdefg"])

    let expectedMap = new MapSet([..."abcd"], 2)
    expect(MapSet.intersection_strict(map_a, map_b, true)).toEqual(expectedMap)
  })
})

describe("MapSet Strict intersection with summation 3", () => {
  test("It should return the intersection(everything that occurs in both) of map_a and map_b based on keys and values", () => {
    let map_a = new MapSet([..."abcd123a4"])
    let map_b = new MapSet([..."abcdefg"])

    let expectedMap = new MapSet([..."bcd"], 2)
    expect(MapSet.intersection_strict(map_a, map_b, true)).toEqual(expectedMap)
  })
})
