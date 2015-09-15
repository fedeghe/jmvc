<?php

$ret = true;
$file = false;
$ext = false;
$isImage = false;
if (count($_FILES)) {
	foreach ($_FILES as $k => $v) {
		$file = 'uploads/' . $_FILES[$k]['name'];
		if(file_exists($file)) unlink($file);
		$ret &= move_uploaded_file(
			$_FILES[$k]['tmp_name'],
			'uploads/' . $_FILES[$k]['name']
		);
		$parts = explode('.', $file);
		$ext =  array_pop($parts);
		if (preg_match('/png|jpg|jpeg/', $ext)) {
			$isImage = true;
		}
	}
}
echo json_encode(array(
	'result' => $ret ? 'ok' : 'ko',
	'isImage' => $isImage,
	'content' => $file ? ($isImage ? $file : file_get_contents($file)) : ""
));
die();