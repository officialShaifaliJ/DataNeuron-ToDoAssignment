import GridLayout from "react-grid-layout";
import "./App.css";
import axios from  'axios';
import Resizable,{ useResizable } from "react-resizable-layout";
import {
  getPanelElement,
  getPanelGroupElement,
  getResizeHandleElement,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { useRef, useEffect ,useState} from "react";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/todo');
      // console.log('Data:', response.data);
      setTodos(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
   fetchData();
  return (
    <>
      <div className="App" style={{width:'100%',height:"100%"}}>
        <div style={{display:"grid",gridArea:"auto",gridTemplateColumns:"2"}}>
              {
                todos.map((e)=>{
                  return <li key={e._id}>{e.title} <button onClick={handleUpdate}>update</button></li>
                })
              }
        </div>
      </div>
    </>
  );
}

export default App;
