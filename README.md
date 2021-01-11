# Tetris_game
Use react to build this game

### 遊戲主架構
#### 主環境
##### game start
* 1.設定邊界---tetris.js
    - a.寬高
    - b.game over的判定
* 2.下降的循環---tetris.js//useInterval.js
    - a.速度遞增
* 3.輸入控制---tetris.js(keycode)
    - a.左右方向鍵
    - b.rotate鍵
* 4.方塊堆疊判定---tetris.js//gameHelpers.js
    - a.不能重疊
* 5.row滿得分，消條---useStage.js//tetris.js//display.js
    - a.去除欄位
    - b.增加計分
    - c.增加level
* 6.分數板---tetris.js//display.js
    - a.歸零
###### game components
* 1.方塊模組
* 2.輸入控制欄位模組
* 3.計分板


