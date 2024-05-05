import React from 'react'
import noteContext from '../context/notes/noteContext'
import { useContext } from 'react'


export default function About() {
  const a=useContext(noteContext)
  return (
    <div>
      <h1>This is About page</h1>
    </div>
  )
}
