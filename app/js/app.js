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


function queue(){
}






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
			var jsonObject = JSON.parse(response_json);
			var value = jsonObject.value;
			var delay = jsonObject.delay;
			var data = [value,delay];
			var value = data[0];
			ready_data.value = value;
			var delay = data[1];




			queueResponse = new Queue();
			queueResponse.enqueue(value);

			setTimeout(queueDelay, delay);
			function queueDelay(){
				
				// рисование текста
				canvas = document.getElementById('canvas');
				var c = canvas.getContext('2d');
				c.fillStyle = "black";
				c.font = "italic "+14+"pt Arial ";
				c.fillText(value +"%", 320,300);
				// рисование текста
				c.fillStyle = "black";
				c.font = "italic "+14+"pt Arial ";
				c.fillText(String(queueResponse.size() +": размер очереди "), 150,140);
				update_rectangle(value);
				queueResponse.dequeue()}
			


			}
			else{
				alert('При обращении к серверу возникли проблемы:' + xmlHttp.statusText);
			}
	

		return data;
	}

	return ready_data;
}

// 

function init(){
	// рисование прямоугольника
	var X,Y,WIDTH,HEIGHT;
	init.x = X = 150;
	init.y = Y = 150;
	init.width = WIDTH = 150;
	init.height = HEIGHT = 300;

	canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d');

	c.strokeStyle = "#5c2020";
	c.lineWidth=5;
	c.strokeRect(X,Y,WIDTH,HEIGHT);

	
	

	// рисование текста
	c.fillStyle = "black";
	c.font = "italic "+66+"pt Arial ";
	c.fillText("<canvas>", 20,70);	



	// рисование текста
	c.fillStyle = "black";
	c.font = "italic "+66+"pt Arial ";
	c.fillText("</canvas>", 20,590);}





init();

function update_rectangle (value=0){
	var x_update = init.x;
	var y_update = init.y + init.height;
	var width_update = init.width;
	var height_update = -(init.height * value)/100;
	// alert(y_update + ',' + height_update)

	canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d');

	c.fillStyle = "red";
	c.fillRect(x_update,y_update,width_update,height_update);
	c.strokeStyle = "#5c2020";
	c.lineWidth=5;
	c.strokeRect(x_update,y_update,width_update,height_update);
	var x_clear = init.x;
	var y_clear = init.y;
	var width_clear = init.width;
	var height_clear = init.height + height_update ;
	c.fillStyle = "white";
	c.fillRect(x_clear,y_clear,width_clear,height_clear);
	c.strokeStyle = "#5c2020";
	c.lineWidth=5;
	c.strokeRect(x_clear,y_clear,width_clear,height_clear);


}
// update_rectangle(value);




















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
	
	







