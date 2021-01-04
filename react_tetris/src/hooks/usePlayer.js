import { useState, useCallback } from 'react';
import { checkCollision, STAGE_WIDTH } from '../gameHelpers';
import { TETROMINOS, randomTetromino } from '../tetrominos';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        //設定起始點
        pos: { x: 0, y: 0 },
        tetromino: randomTetromino().shape,
        collided: false,
    });

    //設立旋轉
    const rotate = (matrix, dir) => {
        // 讓 rows 變成 cols (transpose)
        const rotatedTetro = matrix.map((_, index) =>
            matrix.map(col => col[index]),
        );
        // 當接到 rotated matrix 後反轉每個 row
        if (dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse()
    }

    const playerRotate = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while(checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            //解決旋轉方塊時造成的bug
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            } 
        }

        setPlayer(clonedPlayer);
    }

    //畫面連續邏輯
    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
            collided,
        }))
    }

    //restart
    const resetPlayer = useCallback(
        () => {
            setPlayer({
                pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
                tetromino: randomTetromino().shape,
                collided: false,
            })
        },
        []
    )

    return [player, updatePlayerPos, resetPlayer, playerRotate];
}