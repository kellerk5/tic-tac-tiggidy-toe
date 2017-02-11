import React from 'react';

import Square from '../square/square.jsx';

export default class Board extends React.Component {
    constructor() {
        super();
        //bind functions to context
        this.updateTurnCounterAndTileOccupancy = this.updateTurnCounterAndTileOccupancy.bind( this );

        //try to parse local storage
        //if null, use default state
        let isTherePriorData;

        if (localStorage.getItem('appState') !== null) {
            isTherePriorData = JSON.parse(localStorage.getItem('appState'));
        } else {
            isTherePriorData = ({ 
                turnCounter: 1, 
                player1tiles: [], 
                player2tiles: [],
                occupiedTiles: [],
                rowTally: {
                    1: 0, 
                    2: 0, 
                    3: 0
                },
                columnTally: {
                    1: 0, 
                    2: 0, 
                    3: 0
                },
                diagonalTally: [
                    [{ leftToRight: 0 }],
                    [{ rightToLeft: 0 }]
                ]
            });
        }

        this.state = isTherePriorData;
    }

    updateTurnCounterAndTileOccupancy(gridPosition, initiatedOnLoad) {
        let rowTally = this.state.rowTally;
        let columnTally = this.state.columnTally;
        let rowTallyCopy = Object.assign({}, rowTally);
        let colTallyCopy = Object.assign({}, columnTally);

        //do NOT increment counter if drawing was initiated on load
        if (initiatedOnLoad === false) {
            this.setState({
                turnCounter: this.state.turnCounter + 1,
                occupiedTiles: this.state.occupiedTiles.concat([gridPosition])
            });
        } else {
            this.setState({
                occupiedTiles: this.state.occupiedTiles.concat([gridPosition])
            });
        }

        //increment row and column tallies
        //so we can determine win states
        for (let prop in rowTally) {
            if (gridPosition.y === Number(prop)) {
                if (gridPosition.player === 'X') {
                    //check for win state before incrementing
                    if (rowTallyCopy[Number(prop)] === 2) {
                        return console.log('Ding ding, player 1 is the winner!')
                    } 
                    //increment property in state copy
                    rowTallyCopy[Number(prop)]++;

                    //set object copy to state
                    this.setState({
                        rowTally: rowTallyCopy
                    });
                }
                if (gridPosition.player === 'O') {
                    if (rowTallyCopy[Number(prop)] === -2) {
                        return console.log('Ding ding, player 2 is the winner!')
                    } 

                    rowTallyCopy[Number(prop)]--;

                    this.setState({
                        rowTally: rowTallyCopy
                    });
                }
            }
        }

        for (let prop in columnTally) {
            if (gridPosition.x === Number(prop)) {
                if (gridPosition.player === 'X') {
                    if (colTallyCopy[Number(prop)] === 2) {
                        return console.log('Ding ding, player 1 is the winner!')
                    }
                    
                    colTallyCopy[Number(prop)]++;

                    this.setState({
                        columnTally: colTallyCopy
                    });
                }
                if (gridPosition.player === 'O') {
                    if (colTallyCopy[Number(prop)] === -2) {
                        return console.log('Ding ding, player 2 is the winner!')
                    } 

                    colTallyCopy[Number(prop)]--;

                    this.setState({
                        columnTally: colTallyCopy
                    });
                }
            }
        }
    }

    componentDidUpdate() {
        //some state was updated
        //alter the appState in localStorage
        localStorage.setItem('appState', JSON.stringify(this.state));
    }

    // for debugging
    // componentWillMount() {
    //     console.log(this.state);
    // }

    render() {
        return (
            <div className="board-container container-fluid">
                <div className="board-container__game-status">
                    <p>Current turn: {this.state.turnCounter % 2 !== 0 ? 'Player 1' : 'Player 2'}!</p>
                </div>
                <div>
                    <div className="board-container__row-container">
                        <Square 
                            gridPosition={{x: 1, y: 1, player: null}}
                            turnCounter={this.state.turnCounter}
                            updateTurnCounterAndTiles={this.updateTurnCounterAndTileOccupancy}/>
                        <Square 
                            gridPosition={{x: 2, y: 1, player: null}}
                            turnCounter={this.state.turnCounter}
                            updateTurnCounterAndTiles={this.updateTurnCounterAndTileOccupancy}/>
                        <Square 
                            gridPosition={{x: 3, y: 1, player: null}}
                            turnCounter={this.state.turnCounter}
                            updateTurnCounterAndTiles={this.updateTurnCounterAndTileOccupancy}/>
                    </div>
                    <div className="row-container">
                        <Square 
                            gridPosition={{x: 1, y: 2, player: null}}
                            turnCounter={this.state.turnCounter}
                            updateTurnCounterAndTiles={this.updateTurnCounterAndTileOccupancy}/>
                        <Square 
                            gridPosition={{x: 2, y: 2, player: null}}
                            turnCounter={this.state.turnCounter}
                            updateTurnCounterAndTiles={this.updateTurnCounterAndTileOccupancy}/>
                        <Square 
                            gridPosition={{x: 3, y: 2, player: null}}
                            turnCounter={this.state.turnCounter}
                            updateTurnCounterAndTiles={this.updateTurnCounterAndTileOccupancy}/>
                    </div>
                    <div className="row-container">
                        <Square 
                            gridPosition={{x: 1, y: 3, player: null}}
                            turnCounter={this.state.turnCounter}
                            updateTurnCounterAndTiles={this.updateTurnCounterAndTileOccupancy}/>
                        <Square 
                            gridPosition={{x: 2, y: 3, player: null}}
                            turnCounter={this.state.turnCounter}
                            updateTurnCounterAndTiles={this.updateTurnCounterAndTileOccupancy}/>
                        <Square 
                            gridPosition={{x: 3, y: 3, player: null}}
                            turnCounter={this.state.turnCounter}
                            updateTurnCounterAndTiles={this.updateTurnCounterAndTileOccupancy}/>
                    </div>
                </div>
            </div>
        );
    }
};