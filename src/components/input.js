
import React from 'react';


const CustomInput = (props) => {
  let prompts = {
    'single': <div><p id='prompt'>Enter a single word</p><p>Generates a single word anagram for a single input</p></div>,
    'phrase': <div><p id='prompt'>Enter a whole phrase</p><p>Phrases longer than 3 words take many minutes to complete</p></div>,
    'name': <div><p id='prompt'>Enter a first and last name</p><p> Generates anagrams for the whole name</p></div>
  }
  return (
    <div id='input'>
      <div id='input_prompt'>
        {prompts[props.type]}
      </div>
      <input id='user_input' type='text' onChange={ (e) => {props.onChange(e.target.value)}} placeholder="Your input here..."/>

    </div>

  )

}

export default CustomInput
