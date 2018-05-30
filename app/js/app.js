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

	canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d');

	c.fillStyle = "red";
	c.fillRect(x_update,y_update,width_update,height_update);
	c.strokeStyle = "#5c2020";
	c.lineWidth=5;
	c.strokeRect(x_update,y_update,width_update,height_update);

}
update_rectangle();




