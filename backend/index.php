<?php
$link = mysqli_connect('localhost', 'root','root','sqltest');
if (mysqli_connect_errno()) {
    echo 'Ошибка подключения к базе данных';
    echo mysqli_connect_errno();
    echo mysqli_connect_error();
    exit();
}
$sql = "SELECT * FROM `test`";
$result = mysqli_query($link, $sql);
$categories = mysqli_fetch_all($result);

echo json_encode($categories);
