<?php

if(empty($_POST['usertxt']) || empty($_POST['passwordtxt'])){
    exit('请输入用户名和密码');
}

// 获取usertxt 和password 
$usertxt = $_POST['usertxt'];
$passwordtxt = $_POST['passwordtxt'];

// 比较获取到的密码和用户名是否和我们规定的相同，如果相同的话，则显示恭喜，如果不相同，用户名或者密码错误
if($usertxt === 'admin' && $passwordtxt === '123'){
    exit('恭喜');
}
exit('用户名或者密码错误');