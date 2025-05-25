import { BrowserRouter, Route, Routes } from "react-router"
import VideoPage from "./pages/VideoPage"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/video/:id" element={<VideoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
