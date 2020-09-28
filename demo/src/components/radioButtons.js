import React from 'react';

const RadioButtons = (props) => {

  let buttons = props.values.map((val, i) => {
      return (
        <div key={i} className='radio-item'>
          {i===0 ?
             <input type='radio' id={val}  defaultChecked name={props.name} value={val} onChange={ () => props.onChange(val)}/>
            :
             <input type='radio' id={val}  name={props.name} value={val} onChange={ () => props.onChange(val)}/>
           }
          <label htmlFor={val}>{val}</label>
        </div>
      )
    })

  return (
    <div id='radio-buttons'>


      <form id='radio-form'>
        {buttons}
      </form>

    </div>

  )

}

export default RadioButtons
