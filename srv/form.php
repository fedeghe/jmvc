<?php

$ret = true;
$file = false;
if (count($_FILES)) {
	foreach ($_FILES as $k => $v) {
		$file = 'uploads/' . $_FILES[$k]['name'];
		$ret &= move_uploaded_file(
			$_FILES[$k]['tmp_name'],
			'uploads/' . $_FILES[$k]['name']
		);
	}
}
echo json_encode(array(
	'result' => $ret ? 'ok' : 'ko',
	'content' => file_get_contents($file)
));
die();