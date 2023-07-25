import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import SixCoinPuzzle from "./pages/SixCoinPuzzle";
import FiveCoinPuzzle from "./pages/FiveCoinPuzzle";
import { PATHS } from "./paths";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={PATHS.HOME} element={<HomePage />} />
        <Route path={PATHS.SIX_COIN} element={<SixCoinPuzzle />} />
        <Route path={PATHS.FIVE_COIN} element={<FiveCoinPuzzle />} />
      </Routes>
    </div>
  );
}

export default App;
