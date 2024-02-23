import { useState } from "react";


export default function Player({ name, symbol, isActive, onChangeName }) {
    const [isEditing, setEditing] = useState(false);
    const [pName, setName] = useState(name);


    function manageName() {



        setEditing((editing) => !editing);

        if (isEditing)
            onChangeName(symbol, pName);

    }

    function changeName(event) {
        setName(event.target.value);
    }
    let playerName = <span className="player-name" > {pName} </span>;

    let btnName = "Edit";
    if (isEditing) {
        playerName = <input type="text" value={pName} onChange={changeName} />;
        btnName = "Save"
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            {playerName}
            <span className='player'>

                <span className='player-symbol'>{symbol}</span>

            </span>
            <button onClick={manageName}>{btnName}</button>
        </li>
    );
}