import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import SixCoinPuzzle from "./pages/SixCoinPuzzle";
import FiveCoinPuzzle from "./pages/FiveCoinPuzzle";

function App() {
  // debugger;
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sixcoin" element={<SixCoinPuzzle />} />
        <Route path="/fivecoin" element={<FiveCoinPuzzle />} />
      </Routes>
    </div>
  );
}

export default App;
