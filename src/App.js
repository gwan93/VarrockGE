import { useEffect } from "react";
import './App.css';
import axios from "axios";


function App() {

  useEffect(() => {

    Promise.all([
      axios.get("/widget"),
    ])

    .then(all => {
      console.log(all)
    })
    .catch(err => {
      console.log('@@@@@@@@@@@@@@@@', err)
    })


  }, []);


  return (
    <div className="App">
      Hello
    </div>
  );
}

export default App;
