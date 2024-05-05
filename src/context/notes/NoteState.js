import React from 'react'
import noteContext from './noteContext'
function ContextState(props) {

  return (
    <div>
        <noteContext.Provider value={{}}>
            {props.children}
        </noteContext.Provider>
    </div>
  )
}

export default ContextState
