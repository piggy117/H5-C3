<?php
// 接收用户提交的密码和用户名
if(empty($_POST['username']) || empty($_POST['password'])) {
    exit('请提交密码和用户名');
}
// 校验
$username = $_POST['username'];
$password = $_POST['password'];
if($username === 'admin' && $password === '123'){
    exit('恭喜你');
}
exit('用户名或者密码错误');
// 响应