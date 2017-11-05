<?php

// header('Content-Type: application/json');

// 返回的响应就是一个  JSON 内容，（返回的就是数据）
// 对于返回数据的地址，一般我们称之为接口，（形式上 是：WEb形式）

// users.php?id=1   =>>id 为1 的用户信息

$data = array(
    array(
      'id' => 1,
      'name' => '张三',
      'age' => 18
    ),
    array(
      'id' => 2,
      'name' => '李四',
      'age' => 20
    ),
    array(
      'id' => 3,
      'name' => '二傻子',
      'age' => 18
    ),
    array(
      'id' => 4,
      'name' => '三愣子',
      'age' => 19
    )
  );


//   if(empty($_GET['id'])){
//     //   没有ID  获取全部
//     // 因为  HTTP  中约定的 报文内容就是字符串，而我们需要传递给客户端的信息是一个有结构的数据
//     // 这种情况下，我们一般采用JSON 作为数据格式
//     $json = json_encode($data);
//     // =>[{"id":1,"name":"li"},{...}]
//     echo $json;

//   }else{
//     //   传递了  ID  只获取一条

//     foreach($data as $item){
//         if($item['id'] != $_GET['id']) continue;
//         $json = json_encode($item);
//         // =>[{"id":1,"name":"li"},{...}]
//         echo $json;
//     }
//   }

if(empty($_GET['id'])){
    // 没有获取到ID，那么就直接将所有的都打印出来
    $json = json_encode($data);
    // 因为在报文中，约定的都是字符串，而我们需要传递给客户端的信息是一个有结构的数据，
    // 而这个情况下，我们一般都是使用，json格式作为数据格式
    echo $json;
}else{
    // 如果走else的话，那么就证明，输入了id  ，那么我们就需要判断是哪一个id
    foreach($data as $item){
        if($item['id'] !== $_GET['id']) continue;
        $json = json_encode($item);
        echo $json;
    }
}



// $json='{"id":1,"age":18,"id1":2,"age1":20}';

// var_dump(json_decode($json));
// echo "<br>";
// var_dump(json_decode($json,true));
// // array(4) { ["id"]=> int(1) ["age"]=> int(18) ["id1"]=> int(2) ["age1"]=> int(20) } 
// //  将json格式的字符串，转换成数组
// echo "<br>";

// $arr = array ( "id"=>1, "age"=>18, "id1"=> 2, "age1"=> 20 );
// echo json_encode($arr);
// // {"id":1,"age":18,"id1":2,"age1":20}
// // 将 关联数组 转换成 json格式

?>