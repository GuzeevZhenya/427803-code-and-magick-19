'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_MAX_HEIGHT = 150;
var FONT_GAP = 15;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 20;
var NAME_GAP = 15;
var SCORE_GAP = 10;


var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var timesRound = [];
  for(var i = 0; i < times.length;i++){
    timesRound[i] = Math.round(times[i]);
  }

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили',220,30);
  ctx.fillText('Список результатов',220,50);

  var maxTime = getMaxElement(timesRound);

  for (var j = 0; j < timesRound.length; j++) {
    // координаты и высота полосок гистограммы
    var barX = CLOUD_X + (BAR_GAP * (j + 1)) + (BAR_WIDTH * j);
    var barHeight = BAR_MAX_HEIGHT * timesRound[j] / maxTime;
    var barY = CLOUD_HEIGHT - barHeight - NAME_GAP;

     // координаты игровых очков
    var scoreX = barX;
    var scoreY = barY - SCORE_GAP;

    // координаты имен игроков
    var nameX = barX;
    var nameY = CLOUD_HEIGHT;

    // вывод очков в гистограмму
    ctx.fillText(timesRound[j], scoreX, scoreY);

    // заливка полосок синим цветом со случайной насыщенностью
    var ligthness = Math.round(Math.random() * 100);
    var barColor = 'hsl(228, 100%, ' + ligthness + '%)';
    ctx.fillStyle = barColor;

    // заливка полоски игрока «Вы» красным цветом
    if (names[j] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    // вывод полосок и имен игроков
    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(names[j], nameX, nameY);
  }
};
