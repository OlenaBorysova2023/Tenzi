import React from "react"
import Confetti from "react-confetti"

export default function PlayGround() {
    const size = 10
    const maxValue = 6

    const [gameData, setGameData] = React.useState(initTiles)


    const tilesElements = gameData.tiles.map(tile =>  (
        <span 
            key={tile.key} 
            onClick={() => toggleTile(tile.key)}
            className={tile.isSelected ? 'tile selected' : 'tile'}>
                {tile.value}
        </span>
    ))

    function initTiles() {
        const tilesInitValue = []

        for (let i = 0; i < size; i++) {
            tilesInitValue[i] = {
                value: Math.round(Math.random() * maxValue),
                key: i,
                isSelected: false
            }
        }
        return {
            isGameOver: false,
            tiles: tilesInitValue
        }
    }


    function updateTiles() {
        if (gameData.isGameOver) {
            setGameData(initTiles)
        } else {
            const newTiles = gameData.tiles.map(tile => 
                tile.isSelected ? 
                    tile : 
                    {
                        ...tile,
                        value: Math.round(Math.random() * maxValue)
                    }
            )

            setGameData({
                isGameOver: false,
                tiles: newTiles
            })
        }
    }

    function getIsGameOver(newTiles) {
        return newTiles.every(tile => tile.value === newTiles[0].value)    
    }

    function toggleTile(key) {
        const newTiles = gameData.tiles.map(
            tile => (tile.key === key) ? 
                {...tile, isSelected: !tile.isSelected} :
                tile
        );

        setGameData({
            isGameOver: getIsGameOver(newTiles),
            tiles: newTiles
        }) 

    }    

    return (
        <div className="playground">  
            {gameData.isGameOver && <Confetti/>}      
            <div className="playground--tiles">
                {tilesElements}
            </div>
            <button 
                className="playground--btn" 
                onClick={updateTiles}>
                    {gameData.isGameOver ? 'Reset Game' : 'Roll'}
            </button>
        </div>
    )
}
