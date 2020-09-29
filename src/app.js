import React, {useState, useEffect} from 'react';
import CustomInput from './components/input.js'
import RadioButtons from './components/radioButtons.js'
import Results from './components/results.js'
import * as Comlink from 'comlink'
import anime from 'animejs/lib/anime.es.js';

/* eslint-disable import/no-webpack-loader-syntax */
import Worker from 'worker-loader!./js/web_worker.js'

const App = () => {

  const [results, setResults] = useState([])
  const [loader, setLoader] = useState(false)

  return (
    <div id='react-container'>
      <div id='title'>
        <h1> Anagram Encoder</h1>
      </div>
      <InputWrapper submit={(array) => {  setResults(array); setLoader(false) }} loader={() => setLoader(true)}/>
      <div id='results-container'>
      {
        loader ?
          <LoadingAnimation/>
        :
          results.length !== 0 ? <Results results={results}/>  :  <Results results={['no results found...']}/>
      }

      </div>

    </div>

  )

}


const InputWrapper = (props) => {

  const [state, setState] = useState({
    type: 'single',
    input: '',
  })

  return (
    <div id='input-wrapper'>
      <div id='type-selector'>

        <RadioButtons values={['single', 'phrase', 'name']} name='anagram_type' onChange={ (val)=>{ setState({...state, type:val}) } } />

      </div>
      <div id='input-container'>



        <CustomInput type={state.type} onChange={ (val) => { setState({...state, input:val}) } } />

        <button onClick={ async ()=>{
          props.loader()
          const worker = new Worker()
          const proxy = Comlink.wrap(worker)
          await proxy.generateResults(state)
          const temp = await proxy.results
          proxy[Comlink.releaseProxy]()
          props.submit(temp)

        }}>Generate</button>

      </div>
    </div>)
}

const LoadingAnimation = () => {
  const prompt = 'anagrams_loading ....'

  useEffect( () => {
    const delay = 50
    anime({
      targets: '.loader-letter',
      delay: anime.stagger(delay),
      opacity: [1, 0.8, 1],
      duration: delay * prompt.length,
      rotateY: [360],
      loop:true,

    })
  })

  const divs = [...prompt].map((letter, i) => {
    return  <div className='loader-letter' key={letter+'_'+i}>{letter}</div>

  })

  return (
    <div id='loader-container'>
      {divs}
    </div>
  )
}

export default App
