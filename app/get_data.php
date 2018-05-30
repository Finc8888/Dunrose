 <?php
$get_value = rand(1, 100);
$get_delay = rand(500, 2000);

$arr = array('value' => $get_value, 'delay' => $get_delay);

echo json_encode($arr);

?>