									//Tasks

// 1.написать функцию init () в app.js, что бы рисовать прямоугольник в на canvas 
// 2.написать функцию get_data () в app.js, который вызываеть get_data.php каждый 5SEC через AJAX.
// 3. реализовать  очереди в app.js, C этими функциями pop,push,get_size,is_busy
// 4. добавить ajax responce в очередь. обрабатывать каждый delay sec.
// 5. Напишите функцию update_rectangle (); что наполняет ее value% (pic2)
// 6. показать размер очереди на странице
// 7. реализовать  очереди в app.js, C этими функциями pop,push,get_size,is_busy
// 8. добавить ajax responce в очередь. обрабатывать каждый delay sec.
// 9. Напишите функцию update_rectangle (); что наполняет ее value% (pic2)
// 10. показать размер очереди на странице


function Queue() {
    this._oldestIndex = 1;
    this._newestIndex = 1;
    this._storage = {};
}
 
Queue.prototype.size = function() {
    return this._newestIndex - this._oldestIndex;
};
 
Queue.prototype.enqueue = function(data) {
    this._storage[this._newestIndex] = data;
    this._newestIndex++;
};
 
Queue.prototype.dequeue = function() {
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


// function queue(){
// }



{let value, delay;
queueResponse = new Queue();


window.onload = get_data;
setInterval(get_data, 5000)
function get_data(){
	var url = "get_data.php";
	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.onload = ready_data;
	request.send(null);
	function ready_data(){
		if(request.status ==200){
			var response_json = request.responseText;

			queueResponse.enqueue(response_json);
			console.log(queueResponse.size());
			text_canvas(String(queueResponse.size() +"  : размер очереди "),150,140,14);

			var jsonObject = JSON.parse(response_json);
			var value = jsonObject.value;
			var delay = jsonObject.delay;
			var data = [value,delay];
			value = data[0];
			ready_data.value = value;
			delay = data[1];
			text_canvas(value +"%",320,300,14);




			
			


			}
			else{
				alert('При обращении к серверу возникли проблемы:' + xmlHttp.statusText);
			}
	

		return data;
	}

	return ready_data;
}


var X,Y,WIDTH,HEIGHT;
	X = 150;
	Y = 150;
	WIDTH = 150;
	HEIGHT = 300;

function init(x,y,width,height,stroke = "#5c2020",fill = "white"){
	// рисование прямоугольника
	canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d');
	c.fillStyle = fill;
	c.fillRect(x,y,width,height);
	c.strokeStyle = stroke;
	c.lineWidth=5;
	c.strokeRect(x,y,width,height);
	console.log("Stop" +String(x+" ")+String(y+" ")+String(width+" ")+String(height)+" "+ stroke + fill)
}



function update_rectangle (value=0){
	var x_update = X;
	var y_update = Y + HEIGHT;
	var width_update = WIDTH;
	var height_update = -(HEIGHT * value)/100;
	// console.log("Stop1")
	init(x_update,y_update,width_update,height_update,"#5c2020","red");
	
	var x_clear = X;
	var y_clear = Y;
	var width_clear = WIDTH;
	var height_clear = HEIGHT + height_update ;
	// console.log("Stop2")
	init(x_clear,y_clear,width_clear,height_clear);
}


// рисование текста Canvas
function text_canvas(text,x,y,seize_font){

	canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d');
	c.clearRect(x, y-15, 400, 20); // Очистка области указанного размера и положения
	c.fillStyle = "black";
	c.font = "italic "+seize_font+"pt Arial ";
	c.fillText(text, x,y);

}	

init(X,Y,WIDTH,HEIGHT);
// update_rectangle(100);



// setTimeout(queueDelay, delay);
// function queueDelay(){
// 	// отображение размера очереди
// 	text_canvas(value +"%",320,300,14);
// 	text_canvas(String(queueResponse.size() +"  : размер очереди "),150,140,14);

// 	update_rectangle(value);
// 	queueResponse.dequeue()}


text_canvas("<canvas>",20,70,66);
text_canvas("</canvas>",20,590,66);


}















// //Запомнить ссылку на объект XMLHttpRequest
// var xmlHttp = createXMLHttpObject();
// //Создать объект XMLHttpRequest
// function createXMLHttpObject()
// {
// try
// 	{
// 		xmlHttp = new XMLHttpRequest();
// 	}
// 	catch(e)
// 	{
// 		xmlHttp = false;
// 	}
// //Вернуть созданый объект или вынести сообщение об ошибке
// if (!xmlHttp) 
// 	alert('Ошибка создание объекта XMLHttpRequest.');
// else
// 	return xmlHttp;}


// //выполнить ассинхронный запрос HTTP с помощью объекта XMLHttpRequest
// function process()
// {
// 	//Работа возможна только если объект xmlHttp не занят
// 	if (xmlHttp.readyState == 4 | xmlHttp.readyState == 0)
// 	{
// 		//получить имя введенное пользователем в форму
// 		name = encodeURIComponent(document.getElementById('myName').value);
// 		//обратиться к сценарию quickstart.php на сервере
// 		xmlHttp.open("GET", "quickstart.php?name=" + name, false);
// 		//определить метод, который обрабатывает ответы сервера
// 		xmlHttp.onreadystatechange = handleServerResponse;
// 		//послать ассинхронный запрос серверу
// 		xmlHttp.send(null);
// 	}
// 	else
// 		//если соединение занято повторить попытку через секунду
// 	setTimeout('process()', 1000);
// }
// //вызывется автоматически по прибытии сообщения от сервера
// function handleServerResponse()
// {
// 	//продолжать можно только если транзакция с сервером завершена
// 	if (xmlHttp.readyState == 4) {
// 		//значение 200 говорит о том, что транзакция произошла успешно
// 		if (xmlHttp.status == 200) {
// 			//извлечь XML, полученный от сервера
// 			xmlResponse = xmlHttp.responseXML;
// 			//получить корневой элемент в структуре XML
// 			xmlDocumentElement = xmlResponse.documentElement;
// 			//извлечь текстовое сообщение, которое находиться в первом
// 			//дочернем элементе корневого узла
// 			helloMessage = xmlDocumentElement.firstChild.data;
// 			//обновить текст сообщения на экране
// 			document.getElementById("divMessage").innerHTML =
// 					'<i>' + helloMessage + '</i>';
// 			//повторить последовательность действий
// 			setTimeout('process()', 1000)
// 		}
// 		//код статуса HTTP, отличный от 200, говорит о наличии ошибки
// 		else
// 		{
// 			alert('При обращении к серверу возникли проблемы:' +
// 						xmlHttp.statusText);
// 		}
	
	




// alert(y_update + ',' + height_update)

	// canvas = document.getElementById('canvas');
	// var c = canvas.getContext('2d');

	// c.fillStyle = "red";
	// c.fillRect(x_update,y_update,width_update,height_update);
	// c.strokeStyle = "#5c2020";
	// c.lineWidth=5;
	// c.strokeRect(x_update,y_update,width_update,height_update);


	// c.fillStyle = "white";
	// c.fillRect(x_clear,y_clear,width_clear,height_clear);
	// c.strokeStyle = "#5c2020";
	// c.lineWidth=5;
	// c.strokeRect(x_clear,y_clear,width_clear,height_clear);