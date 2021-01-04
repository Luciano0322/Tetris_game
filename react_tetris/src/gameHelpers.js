//設定GAME範圍
export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
 Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear'])
 )

//判定邊界
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x = 0; x < player.tetromino[y].length; x += 1) {
            //1. 檢查是否在確切的tetromino cell
            if (player.tetromino[y][x] !== 0) {
                if(
                //2. 檢核 move 指令是在 game area 裡面 height (y)
                //並且不要讓它超過 bottom 區域
                !stage[y + player.pos.y + moveY] ||
                //3. 檢核 move 是在 game area 裡面 width (x)
                !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                //4. 檢核 moving 中的 cell 不會被 clear
                stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ){
                    return true;
                }
            }
        }
    }
}