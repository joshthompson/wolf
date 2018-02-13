<?php

function getRest() {
	// Request type
	$request = array(
		'type' => $_SERVER['REQUEST_METHOD'],
		'data' => null
	);
	// Get payload
	switch ($request['type']) {
		case 'POST':
		case 'PUT':
			$payload = fopen('php://input', 'r');
			$request['data'] = '';
			while ($data = fread($payload, 1024)) $request['data'] .= $data;
			$request['data'] = json_decode($request['data'], true);
			break;
		case 'GET':
			$request['data'] = $_GET;
			break;
	}
	// Return data
	return $request;
}