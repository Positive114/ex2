let days = 1;
let mentalState = 50;
let thirst = 0;
let actionPoints = 5;
let inventory = { watermelon: 0, potatoes: 0};


function updateStats() {
    $('#day').text(days);
    $('#mentalState').text(mentalState);
    $('#th').text(thirst);
    $('#actionPoints').text(actionPoints);
    
    if (thirst >= 10) {
        $('#thirst').css('color', 'red');
    } else {
        $('#thirst').css('color', 'greenyellow');
    }
}

function message(text) {
    // document.getElementById('message').innerText = text;
	alert(text);
}

const itemImages = {
    watermelon: 'url("img/watermelon.png")',
    potatoes: 'url("img/potato.png")',
};

function wuzi(){
	if (actionPoints > 0) {
	    let foundWater = Math.random() < 0.5;  // 50% 概率找到西瓜
	    let foundPotatoes = Math.random() < 0.3; // 30% 概率找到马铃薯

	    if (foundWater) {
	        inventory.water += 1;
	        thirst += 1;
	        message("成功找到了西瓜！");
	        addToInventory('watermelon');
	    }
	        
	    if (foundPotatoes) {
	        inventory.potatoes += 1;
	        message(`成功找到了马铃薯！`);
	        addToInventory('potatoes');
		}
		actionPoints -= 1;
		if (!foundWater && !foundPotatoes) {
		            message(`没有找到任何物资。`);
		}
		updateStats();
	}
	else {
	    message(`没有足够的行动点数！`);
		}
}

function addToInventory(item) {
    const inventoryDiv = document.getElementById('inventory');
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    
    // 设置对应物品图标
    itemDiv.style.backgroundImage = itemImages[item];
    itemDiv.onclick = function(){
		eat(itemDiv);
		playSound();
	};
	itemDiv.id = item;
    // 添加物品到库存
    inventoryDiv.appendChild(itemDiv);
}

function eat(div){
	var obj = document.getElementById("inventory");
	obj.removeChild(div);
	if (div.id=="potatoes"){
		if(thirst>=1){
			thirst-=1;
			mentalState-=1;
		}
		else{
			mentalState-=1;
		}
	}
	if (div.id=="watermelon"){
		if(thirst>=2){
			thirst-=2;
			mentalState-=2;
		}
		else{
			thirst=0;
			mentalState-=2;
		}
	}
	updateStats();
}

// function bedover(){
// 	document.getElementById("bed").src="img/床2.png";
// }

// function bedout(){
// 	document.getElementById("bed").src="img/床.png";
// }

function playSound() {
    var sound = new Audio('img/吃东西.mp3'); // 假设你的音效文件名为click.mp3，放在与HTML文件同一目录下
    // 播放音效
    sound.play();
}

function nosleep(){
	alert("现在是白天，你还不能睡觉");
}

function sleep(){
	if (thirst>=10){
		alert("游戏结束，是否重新开始？");
		location.reload();
	}
	else{
		alert("即将度过一个安稳的夜晚");
		$('#background').attr('src', 'img/白天1.mp4');
		actionPoints = 5;
		days+=1;
		thirst+=3;
		updateStats();
        $('#bed').off('click').on('click', nosleep);
        $('#rest').off('click').on('click', rest);
        $('#hour').css('transform', 'translate(-50%,-100%) rotatez(180deg)');
	}
}

function rest(){
	alert("即将进入夜晚");
	$('#background').attr('src', 'img/黑夜2.mp4');
	actionPoints = 5;
	thirst+=1;
	updateStats();
    $('#bed').off('click').on('click', sleep);
    $('#rest').off('click').on('click', norest);
    $('#hour').css('transform', 'translate(-50%,-100%) rotatez(240deg)');
}

function norest(){
	alert("你已经休息过了，去床上好好睡一觉吧！");
}


