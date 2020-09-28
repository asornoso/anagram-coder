
import React, {useState} from 'react';
import CustomInput from './components/input.js'
import RadioButtons from './components/radioButtons.js'
import Results from './components/results.js'
import AnagramEncoder from './js/AnagramEncoder.js'

const App = () => {


  const [state, setState] = useState({
    type: 'single',
    input: '',
    results: []
  })

  return (
    <div id='react-container'>
      <div id='title'>
        <h1> Anagram Encoder</h1>
      </div>
      <div id='type-selector'>
        <RadioButtons values={['single', 'phrase', 'name']} name='anagram_type' onChange={ (val)=>{ setState({...state, type:val}) } } />
      </div>
      <div id='input-container'>

        <CustomInput type={state.type} onChange={ (val) => { setState({...state, input:val}) } } />
        <button onClick={async ()=>{
          const anagrams = await generateResults(state)
          console.log(anagrams)
        }}>Generate</button>

      </div>
      <div id='results-container'>
        <Results type={state.type} input={state.input}/>
      </div>

    </div>

  )

}

const generateResults =  (state) => {
  let encoder = new AnagramEncoder()

  if(state.type === 'single'){
    return  encoder.findSingleWordAnagram(state.input)
  }
  else if (state.type === 'phrase'){
    return  encoder.findPhraseAnagram(state.input)
  }
  else if (state.type === 'name'){
    return  encoder.findAnagramName(state.input)
  }
}

export default App
