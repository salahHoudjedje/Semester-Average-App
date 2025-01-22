import StartPage from './components/StartPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalcultPage from './components/CalcultPage';
import './App.css';

function App() {
  return (
    <Router basename="/Semester-Average-App"> {/* Set the basename */}
      <Routes>
        {/* Route for StartPage */}
        <Route path="/" element={<StartPage />} />

        {/* Route for CalculatePage */}
        <Route path="/calcult" element={<CalcultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
