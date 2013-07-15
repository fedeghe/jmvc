<?php
$trg = in_array('HTTP_REFERER', $_SERVER) ? $_SERVER['HTTP_REFERER'] : $_SERVER['HTTP_HOST'];
header('Location: ' . $trg);