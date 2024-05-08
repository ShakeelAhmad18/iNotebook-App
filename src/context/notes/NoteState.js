import React, { useState } from 'react'
import noteContext from './noteContext'
function ContextState(props) {
 const intialNotes=[
  {
    "_id": "6626aacd8cd44b07ef2c1300",
    "user": "661eb1b189ce0aff45f88ad7",
    "title": "IT notes",
    "description": "This is my notes of IT",
    "tag": "It",
    "Date": "2024-04-22T18:22:05.340Z",
    "__v": 0
  },
  {
    "_id": "6626aacd8cd44b07ef2c1300",
    "user": "661eb1b189ce0aff45f88ad7",
    "title": "IT notes",
    "description": "This is my notes of IT",
    "tag": "It",
    "Date": "2024-04-22T18:22:05.340Z",
    "__v": 0
  },
  {
    "_id": "6626aacd8cd44b07ef2c1300",
    "user": "661eb1b189ce0aff45f88ad7",
    "title": "IT notes",
    "description": "This is my notes of IT",
    "tag": "It",
    "Date": "2024-04-22T18:22:05.340Z",
    "__v": 0
  },
  {
    "_id": "6626aacd8cd44b07ef2c1300",
    "user": "661eb1b189ce0aff45f88ad7",
    "title": "IT notes",
    "description": "This is my notes of IT",
    "tag": "It",
    "Date": "2024-04-22T18:22:05.340Z",
    "__v": 0
  },
  {
    "_id": "6626aacd8cd44b07ef2c1300",
    "user": "661eb1b189ce0aff45f88ad7",
    "title": "IT notes",
    "description": "This is my notes of IT",
    "tag": "It",
    "Date": "2024-04-22T18:22:05.340Z",
    "__v": 0
  },
  {
    "_id": "6626aacd8cd44b07ef2c1300",
    "user": "661eb1b189ce0aff45f88ad7",
    "title": "IT notes",
    "description": "This is my notes of IT",
    "tag": "It",
    "Date": "2024-04-22T18:22:05.340Z",
    "__v": 0
  }
]
 const [notes,setnotes]=useState(intialNotes)
  return (
    <div>
        <noteContext.Provider value={{notes,setnotes}}>
            {props.children}
        </noteContext.Provider>
    </div>
  )
}

export default ContextState
