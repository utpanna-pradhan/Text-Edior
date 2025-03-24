
import './App.css';
import Home from './components/Home';
// import Textarea from './components/Textarea';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App bg-light ">
   <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} exact />
          
          </Routes>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
