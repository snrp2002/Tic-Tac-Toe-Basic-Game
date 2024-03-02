import { useState } from "react"

export default function Player({initialName, symbol, isActivePlayer, playerNameChangeHandler}){
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    const editButtonHandler = () => {
        setIsEditing(currentEdit => !currentEdit);
        if(isEditing){
            playerNameChangeHandler(symbol, playerName);
        }
    }
    const nameChangeHandler = (event)=>{
        setPlayerName(()=>event.target.value);
    }
    return <li className={isActivePlayer ? "active" : ""}>
        <span className="player">
        {!isEditing && <span className="player-name">{playerName}</span>}
        {isEditing && <input type="text" value={playerName} onChange={nameChangeHandler} required/>}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={editButtonHandler}>{isEditing? 'Save': 'Edit'}</button>
    </li>
}