import React, {useEffect, useState} from 'react';
import anime from 'animejs/lib/anime.es.js';

const Results = (props) => {

  const [items, setItems] = useState([])

   useEffect( () => {
    const temp = props.results.map( (result, i) => {
      return(
        <div className='result-words' key={result+'_'+i}>

            { [...result].map( (letter, j) => {
              return (
              <div className='result-letters' key={result+'_'+i+'_'+j} style={ letter === ' ' ? {width:'3px'} : {}}>
                  {letter}
              </div>)
            })}
        </div>)
    })

    setItems(temp)
  }, [props])


  useEffect( () => {
    anime({
      targets: '.result-letters',
      delay: anime.stagger(65),
      opacity: [0, 1],
      duration: 100,
    })
  })

  return (
    <div className='results'>
      {items}
    </div>
  )
}

export default Results
