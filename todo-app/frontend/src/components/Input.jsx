import React from 'react'

function Input(prop) {
  return (
    <div>
        <input type={prop.type} placeholder="Type something..." value={prop.value} onChange={prop.onChange} />
        <button onClick={prop.onClick}>ADD</button>
    </div>
  )
}

export default Input