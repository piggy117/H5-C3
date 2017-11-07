<?php

if(empty($_POST['user']) || empty($_POST['pass'])){
    exit('请输入用户名和密码');
}

//获取输入到文本框的内容
$user = $_POST['user'];
$pass = $_POST['pass'];

if($user === 'admin' && $pass === '123'){
    exit('恭喜');
}

exit('用户名或者密码错误');