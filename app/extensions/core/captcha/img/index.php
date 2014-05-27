<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="">
</head>
<body>
    <ul>
        <li>
            <h2>c1</h2>
            <p><?php echo base64_encode(file_get_contents('c1.png')); ?></p>
        </li>
        <li>
            <h2>c2</h2>
            <p><?php echo base64_encode(file_get_contents('c2.png')); ?></p>
        </li>
        <li>
            <h2>c3</h2>
            <p><?php echo base64_encode(file_get_contents('c3.png')); ?></p>
        </li>
        <li>
            <h2>c4</h2>
            <p><?php echo base64_encode(file_get_contents('c4.png')); ?></p>
        </li>
    </ul>
</body>
</html>
