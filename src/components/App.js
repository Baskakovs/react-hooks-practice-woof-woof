import React, {useEffect, useState} from "react";
import Dog from "./Dog"

function App() {  
  const [original, setOriginal] = useState({})
  const [dogs, setDogs] = useState({})
  const [id, setId] = useState()
  const [dog, setDog] = useState()
  const [filter, setFilter] = useState(false)

  useEffect(()=>{
    fetch(`http://localhost:3001/pups`)
    .then((res)=>res.json())
    .then((obj)=>setOriginal(obj))
  },[])

  useEffect(()=>{
    setDogs(original)
  },[original])

  function handleClick(e){
    setId(e.target.id)
    let display = dogs.filter((dog)=>{
      if (dog.id == id){
        return dog
      }
    })
    setDog(display[0])
  }


  function handleGood(e){
    const id = e.target.id
    const value = e.target.value
    let newValue

    if(value == "true"){
      newValue = false
    }else{
      newValue = true
    }

    fetch(`http://localhost:3001/pups/${id}`,{
      method: "PATCH",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        isGoodDog: newValue
      })
    })
    .then((res)=>res.json())
    .then((obj)=>{setDog(obj)
  
    })
  }

  function onFilter(event){
    setFilter(()=>!filter)
  }

  useEffect(()=>{
    if(filter == true){
      let newList = dogs.filter((element)=>{
        if(element.isGoodDog == true){
          return element
        }
      })
      setDogs(newList)
    }else{
      setDogs(original)
    }
  },[filter])

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={onFilter}>Filter good dogs: OFF</button>
      </div>
      <div id="dog-bar">
        {Array.isArray(dogs) ? 
          dogs.map((element)=>{
            return <span id={element.id} onClick={handleClick}>{element.name}</span>
          }) :
          null
        }
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
         {dog == null ? null : <Dog key={dog.id} dog={dog} handleGood={handleGood}/>}
        </div>
      </div>
    </div>
  );
}

export default App;
