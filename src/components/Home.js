import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes';
export default function Home() {
  const context=useContext(noteContext)
  const {notes,setNotes}=context;
  return (
    <div>
      <div className="container">
      <h2>Add Note</h2>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      </div>
      <div className="container">
      <h2>You Note</h2>
      <Notes/>
      </div>
    </div>
  )
}
