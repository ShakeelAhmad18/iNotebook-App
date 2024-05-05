import NoteState from './context/notes/NoteState'
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <NoteState>
      <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route exact path='/' element={<Home />}> </Route>
          <Route exact path='/about' element={ <About />}> </Route>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
