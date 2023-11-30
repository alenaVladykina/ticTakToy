import React from 'react';
import {AppStateType} from "./App";

type BoardPropsType = {
    appState: AppStateType
    cellValue:(index:number)=>void
}

const Board = (props: BoardPropsType) => {
    return (
        <div className='board'>
            {props.appState.cell.map((cell,index) =>
                <button className='cell' onClick={()=>props.cellValue(index)} >{cell}</button>
            )}
        </div>
    );
};

export default Board;