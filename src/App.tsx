import React, {useState} from 'react';
import './App.css';
import Board from "./Board";
import {log} from "util";

export type CellsType = null | 'x' | 'o'
type PlayerType = 'x' | 'o'

export type AppStateType = {
    cell: Array<CellsType>
    currentPlayer: PlayerType
}

function App() {

    const [appState, setAppState] = useState<AppStateType>({
        cell: Array(9).fill(null),
        currentPlayer: 'x'
    });
    console.log(appState)
    const resultsPlayer = () => {
        let resultLogic = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        function getValue(index:number, position: number) {
            return appState.cell[resultLogic[index][position]];
        }

        for (let i = 0; i < resultLogic.length; i++) {
            const getValueByIndex = getValue.bind(null, i);
            const zeroValue = getValueByIndex(0);
            if (zeroValue != null && zeroValue === getValueByIndex(1) && zeroValue === getValueByIndex(2)) {
                return true
            }
        }

        return false
    }

    const status = () => {
        let nextMove = appState.currentPlayer == 'x' ? 'Ход первого игрока' : 'Ход второго игрока'
        let cellNull = appState.cell.every(el=>el != null)
        return resultsPlayer()
            ? 'Вы выиграли'
            : cellNull ? 'Ничья' : nextMove;
    }

    const cellValue = (index: number) => {
        let currentCell = [...appState.cell];
        if (currentCell[index] === null) {
            currentCell[index] = appState.currentPlayer;
            setAppState({
                cell: currentCell,
                currentPlayer: appState.currentPlayer == 'x' ? 'o' : 'x'
            })
        }
    }

    return (
        <div className="App">
            <Board appState={appState}
                   cellValue={cellValue}/>
            <p className='status'>{status()}</p>
        </div>
    );
}

export default App;
