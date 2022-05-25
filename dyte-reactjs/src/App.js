import './App.css';
import {Routes, Route} from 'react-router-dom'
import Welcome from './Pages/Welcome';
import Meeting from './Pages/Meeting';
import Lobby from './Pages/Lobby';
function App() {
  return (
  <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/meeting" element={<Meeting />} />
      <Route path="/meeting/:roomName/:meetingId" element={<Meeting />} />
      <Route path="/lobby" element={<Lobby/>}/>
  </Routes>
  );
}

export default App;