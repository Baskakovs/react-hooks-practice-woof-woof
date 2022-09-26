import React from "react";

function Dog({dog, handleGood}){
    const {id, name, isGoodDog, image} = dog
    console.log(isGoodDog)
    return(
        <>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <button onClick={handleGood} id={id} value={isGoodDog}>{isGoodDog ? "Bad Dog!" : "Good Dog!"}</button>
        </>
    )
}

export default Dog