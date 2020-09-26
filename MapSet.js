// Expanding the Map data structure to include intersection, union, difference

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
    if(map_a.size() != map_b.size())
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
    if(map_a.size != map_b.size)
      return false
    else {
      for(let entry of map_b){
        if(map_a.has(entry[0])){
          if(map_a.get(entry[0]) != entry[1])
            return false
        }
        else
          return false
      }
    }
    return true
  }


}

module.exports =  MapSet
