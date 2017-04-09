var board = new Array();
var score = 0;
var top = 240;
$(document).ready(function(e){
    newgame();
});

function newgame(){
 
	document.getElementById("score").innerHTML=0;
    init();
   
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for(var i = 0;i<4;i++){
        for(var j = 0;j<4;j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));
        }
    }
    
    for(var i = 0; i<4;i++){
        board[i] = new Array();
        for(var j = 0;j<4;j++){
            board[i][j] = 0;
        }
    }
    
    updateBoardView();
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0;i<4;i++){
        for ( var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);
            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
            }else{
                theNumberCell.css('width','100px');
                theNumberCell.css('hegiht','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.text(board[i][j]);
            }
        }
    }
}

function generateOneNumber(){
    if (nospace(board)) 
        return false;
    
  
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));
    while(true){
        if (board[randx][randy] == 0) 
            break;
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
    }
 
    var randNumber = Math.random()<0.5 ?2 : 4;
  
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
    return true;
}


$(document).keydown(function(event){
    switch (event.keyCode) {
    case 37:
        if(moveLeft()){
         
            generateOneNumber();
            isgameover();
        }
        break;
    case 38:
        if(moveUp()){
            generateOneNumber();
            isgameover();
        }
        break;
    case 39:
        if(moveRight()){
            generateOneNumber();
            isgameover();
        }
        break;
    case 40:
        if(moveDown()){
            generateOneNumber();
            isgameover();
        }
        break;

    }
});

function isgameover(){
    if(nospace(board)&&nomove(board))
        gameover();
}

function gameover(){
    alert("gameover");
}

function moveLeft(){
   
    if( !canMoveLeft(board))
        return false;
    for(var i = 0;i<4;i++)
        for(var j = 1;j<4;j++){
            if(board[i][j] !=0){
          
                for(var k = 0;k<j;k++){
                   
                    if(board[i][k] == 0 && noBlockHorizontal(i , k, j, board)){
                        //move
                        showMoveAnimation(i, j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
             
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i , k, j, board)){
                        //move
                        showMoveAnimation(i, j,i,k);
                        //add
                        board[i][k] += board[i][j];score+=board[i][k];document.getElementById("score").innerHTML=score;

						board[i][j] = 0;
                        
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
   
    if( !canMoveRight(board))
        return false;
    for(var i = 0;i<4;i++)
        for(var j = 2;j>=0;j--){
            if(board[i][j] !=0){
              
                for(var k = 3;k>j;k--){
                   
                    if(board[i][k] == 0 && noBlockHorizontal(i , j, k, board)){
                        //move
                        showMoveAnimation(i, j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i , j, k, board)){
                        //move
                        showMoveAnimation(i, j,i,k);
                        //add
                        board[i][k] += board[i][j];score+=board[i][k];document.getElementById("score").innerHTML=score;
                        board[i][j] = 0;
                        
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}
          
function moveUp(){
    if( !canMoveUp(board))
        return false;   
    for(var j = 0;j<4;j++)
        for(var i = 1;i<4;i++){
            if(board[i][j] !=0){
                for(var k = 0;k<i;k++){
                    
                    if(board[k][j] == 0 && noBlockHorizontaL(j , k, i, board)){
                        //move
                        showMoveAnimation(i, j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                   
                    else if(board[k][j] == board[i][j]&& noBlockHorizontaL(j , k, i, board) ){
                        //move
                        showMoveAnimation(i, j,k,j);
                        //add
                        board[k][j] += board[i][j];score+=board[k][j];document.getElementById("score").innerHTML=score;
                        board[i][j] = 0;
                        
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    
    if( !canMoveDown(board))
        return false;
    for(var j = 0;j<4;j++)
        for(var i = 2;i>=0;i--){
            if(board[i][j] !=0){
               
                for(var k = 3;k>i;k--){
                   
                    if(board[k][j] == 0 && noBlockHorizontaL(j , i, k, board)){
                        //move
                        showMoveAnimation(i, j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    
                    else if(board[k][j] == board[i][j]&& noBlockHorizontaL(j , i, k, board) ){
                        //move
                        showMoveAnimation(i, j,k,j);
                        //add
                        board[k][j] += board[i][j];score+=board[k][j];document.getElementById("score").innerHTML=score;
                        board[i][j] = 0;
                        
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

function showNumberWithAnimation(i, j, randNumber) {

    var numberCell = $('#number-cell-' + i + '-' + j);
	numberCell.text(randNumber);
    numberCell.animate({
        width : "100px",
        height : "100px",
        top : getPosTop(i, j),
        left : getPosLeft(i, j)
    }, 50);
}

function showMoveAnimation(fromx, fromy, tox, toy){
    
    var numberCell = $('#number-cell-'+fromx +'-'+fromy);
    numberCell.animate({top:getPosTop(tox,toy),
    left:getPosLeft(tox,toy)},200);
}

$(document).keydown(function (event) {
   event.preventDefault();
});
