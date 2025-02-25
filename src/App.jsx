import { useEffect, useState } from 'react'
import './App.css'
import ActionPanel from './components/ActionPanel'
import OpenLayersMap from './components/OpenLayersMap'

function App() {
  const [drawing, setDrawing] = useState({});

  const setDrawType = (type) => {
    setDrawing({
      type,
      coords: []
    });
  }

  const addCoords = (coords) => {
    setDrawing({
      ...drawing,
      coords: [...drawing.coords, coords]
    });

  };

  useEffect(() => {
    console.log("drawing", drawing.coords);

  }, [drawing, drawing.coords]);



  return (
    <>
      <OpenLayersMap drawing={drawing} setDrawType={setDrawType} addCoords={addCoords} />
      <ActionPanel drawing={drawing} setDrawType={setDrawType} addCoords={addCoords} />
    </>
  )
}

export default App
