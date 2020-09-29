import * as Comlink from 'comlink'
import AnagramEncoder from './AnagramEncoder.js'

const worker_obj = {
  results: [],
  generateResults(state){
    let encoder = new AnagramEncoder()

    if(state.type === 'single'){
      encoder.findSingleWordAnagram(state.input).then( results => {
        this.results = results
      })
    }
    else if (state.type === 'phrase'){
      encoder.findPhraseAnagram(state.input).then( results => {
        this.results = results
      })
    }
    else if (state.type === 'name'){
      encoder.findAnagramName(state.input).then( results => {
        this.results = results
      })
    }
  }
}

Comlink.expose(worker_obj)
