import React from 'react';

export default class Square extends React.Component {
    constructor() {
        super();
        //bind functions to context
        this.tileDraw    = this.tileDraw.bind( this );
        this.drawCircle  = this.drawCircle.bind( this );
        this.drawX       = this.drawX.bind( this );

        this.state = {
            isCurrentlyOccupied: false
        };
    }

    componentDidMount() {
        let initiatedOnLoad = true;
        //see if prior state object exists with occupied tiles
        if (JSON.parse(localStorage.getItem('appState')) && (JSON.parse(localStorage.getItem('appState')).occupiedTiles) !== null) {
            
            let doesPlayerHaveTiles = JSON.parse(localStorage.getItem('appState')).occupiedTiles;
            
            //loop to determine whether we are drawing X's or O's for players
            doesPlayerHaveTiles.forEach((item, index) => {
                if (item.x === this.props.gridPosition.x && item.y === this.props.gridPosition.y && item.player === 'O') {
                    this.drawCircle(this.refs.square.getContext('2d'), initiatedOnLoad);
                } else if (item.x === this.props.gridPosition.x && item.y === this.props.gridPosition.y && item.player === 'X') {
                    this.drawX(this.refs.square.getContext('2d'), initiatedOnLoad);
                }
            });
        }
    }

    tileDraw(ev) {
        let initiatedOnLoad = false;
        if (this.state.isCurrentlyOccupied === false) {
            if (this.props.turnCounter % 2 !== 0) {
                this.drawX(ev.target.getContext("2d"), initiatedOnLoad);
            } else {
                this.drawCircle(ev.target.getContext("2d"), initiatedOnLoad);
            }
        } else {
            //throw error
            console.log('Sorry, this space is already occupied.');
        }
    }

    drawX(ctx, initiatedOnLoad) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle="cyan";
        //top left to bottom right line
        ctx.moveTo(0,0);
        ctx.lineTo(200,200);
        //top right to bottom left line
        ctx.moveTo(200,0);
        ctx.lineTo(0,200);
        ctx.stroke();

        this.setState({
            isCurrentlyOccupied: true
        });

        //set this property for click-driven tile drawings
        if (initiatedOnLoad === false) {
            this.props.gridPosition.player = 'X';
        }

        this.props.updateTurnCounterAndTiles(this.props.gridPosition, initiatedOnLoad);
    }

    drawCircle(ctx, initiatedOnLoad) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle="blue";
        ctx.arc(100,100,100,0,2*Math.PI, true);
        ctx.stroke();

        this.setState({
            isCurrentlyOccupied: true
        });
        
        //set this property for click-driven tile drawings
        if (initiatedOnLoad === false) {
            this.props.gridPosition.player = 'O';
        }

        this.props.updateTurnCounterAndTiles(this.props.gridPosition, initiatedOnLoad);
    }

    render() {
        return (
            <canvas width="200" height="200" className="square-container"
                onClick={this.tileDraw}
                ref={'square'}>
            </canvas>
        );
    }
};

Square.propTypes = {
    gridPosition:               React.PropTypes.object,
    turnCounter :               React.PropTypes.number,
    updateTurnCounterAndTiles : React.PropTypes.func
};