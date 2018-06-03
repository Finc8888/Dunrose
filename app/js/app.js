//Создание класса с методами для организации очереди запросов
function Queue() {
    this._oldestIndex = 1;
    this._newestIndex = 1;
    this._storage = {};
}
//Возвращает размер для очереди
Queue.prototype.get_size = function() {
    return this._newestIndex - this._oldestIndex;
};
//Возращает true если размер очереди превышает limit
Queue.prototype.is_busy = function(limit) {
    if (this._newestIndex - this._oldestIndex == limit){
    	return true;
    }
    else{
    return false;
	}
};
//Заносит элемент в очередь 
Queue.prototype.push = function(data) {
    this._storage[this._newestIndex] = data;
    this._newestIndex++;
};
//Извлекает элемент из очереди 
Queue.prototype.pop = function() {
    var oldestIndex = this._oldestIndex,
        newestIndex = this._newestIndex,
        deletedData;
    if (oldestIndex !== newestIndex) {
        deletedData = this._storage[oldestIndex];
        delete this._storage[oldestIndex];
        this._oldestIndex++;
 
        return deletedData;
    }
};


//Определение числовых констант
var X,Y,WIDTH,HEIGHT,REPEAT_REQUEST;
X = 150;//координата x начальной точки прямоугольник
Y = 150;//координата y начальной точки прямоугольник
WIDTH = 150;//ширина прямоугольника
HEIGHT = 300;//высота прямоугольника
REPEAT_REQUEST = 500;//переодичность отправки запроса на сервер

var value, delay;
var queueResponse = new Queue();

window.onload = function(){
	get_data;
	init(X,Y,WIDTH,HEIGHT);
	text_canvas("<canvas>",20,70,66);
	text_canvas("</canvas>",20,590,66);
	setInterval(get_data, REPEAT_REQUEST)
}
function get_data(){
	var url = "get_data.php";
	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.onload = ready_data;
	request.send(null);
	function ready_data(){
		if(request.status ==200){
			var responseJSON = request.responseText;
			//ставим ajax responce  в очередь
			queueResponse.push(responseJSON);
			//обработка запроса через время равное delay
			setTimeout(queueDelay, delay);
			function queueDelay(){
				text_canvas(String(queueResponse.get_size() +"  : размер очереди "),150,140,14);
				var item = queueResponse.pop();
				// console.log(item);
				var jsonObject = JSON.parse(item);
				value = jsonObject.value;
				delay = jsonObject.delay;
				
				update_rectangle(value);
				text_canvas(value +"%",320,300,14);
				
				if(queueResponse.is_busy(100)){
					console.log('Очередь переполнена');
					alert('Очередь переполнена\n Рекомендуется увеличить константу REPEAT_REQUEST ');
				}
			}	
		}
			else{
				alert('При обращении к серверу возникли проблемы:' + request.statusText);
			}
	}
}
//метод вывода прямоугольника на экран
function init(x,y,width,height,stroke = "#5c2020",fill = "white"){
	var canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d');
	c.fillStyle = fill;
	c.fillRect(x,y,width,height);
	c.strokeStyle = stroke;
	c.lineWidth=5;
	c.strokeRect(x,y,width,height);
	// console.log("Stop" +String(x+" ")+String(y+" ")+String(width+" ")+String(height)+" "+ stroke + fill)
}
//метод перерисовки прямоугольника в зависимости от величины %
function update_rectangle (value=0){
	var xUpdate = X;
	var yUpdate = Y + HEIGHT;
	var widthUpdate = WIDTH;
	var heightUpdate = -(HEIGHT * value)/100;
	init(xUpdate,yUpdate,widthUpdate,heightUpdate,"#5c2020","red");
	var xClear = X;
	var yClear = Y;
	var widthClear = WIDTH;
	var heightClear = HEIGHT + heightUpdate ;
	init(xClear,yClear,widthClear,heightClear);
}
// метод рисование текста на Canvas
function text_canvas(text,x,y,seizeFont){
	var canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d');
	c.clearRect(x, y-15, 400, 20); // Очистка области указанного размера и положения
	c.fillStyle = "black";
	c.font = "italic "+seizeFont+"pt Arial ";
	c.fillText(text, x,y);
}	


















