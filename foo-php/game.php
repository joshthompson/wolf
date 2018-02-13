<?php

// DB Access
require_once 'db.class.php';
require_once 'rest.class.php';

// Helper functions - REFACTOR
function generateAccessToken() {
	return hash('sha512', time() . rand(0, 999999) . 'wolf-face-codes');
}

$request = getRest();
$action = isset($_GET['action']) ? $_GET['action'] : null;

// Return some dummy API; before proper backend exists
header('Content-type: application/json');

switch ($request['type']) {
	case 'GET':
		$game = DB('SELECT `game` FROM `wolf` WHERE `id` = :id OR `code` = :id', array(
			'id' => $_GET['id']
		))->fetch(PDO::FETCH_ASSOC);
		echo $game['game'];
		break;
	case 'POST':
		if ($action === 'join') {
			$game = DB('SELECT `game` FROM `wolf` WHERE `id` = :id OR `code` = :id', array(
				'id' => $_GET['id']
			))->fetch(PDO::FETCH_ASSOC);
			$game = json_decode($game['game'], true);
			$game['players'][] = $request['data']['player'];
			DB('UPDATE `wolf` SET `game` = :game WHERE `id` = :id OR `code` = :id', array(
				'id' => $game['id'],
				'game' => json_encode($game)
			));
			echo json_encode($game);
		} else {
			$game = $request['data']['game'];
			$game['token'] = generateAccessToken();
			DB('INSERT INTO `wolf` (`game`, `code`) VALUES (:game, :code)', array(
				'game' => json_encode($game),
				'code' => $game['code']
			))->fetch(PDO::FETCH_ASSOC);
			$game['id'] = DB('SELECT `id` FROM `wolf` ORDER BY `id` DESC LIMIT 1')->fetch(PDO::FETCH_ASSOC)['id'];
			// Annoying update to set ID - TODO: Remove
			DB('UPDATE `wolf` SET `game` = :game WHERE `id` = :id OR `code` = :id', array(
				'id' => $game['id'],
				'game' => json_encode($game)
			));
			echo json_encode($game);
		}
		break;
	case 'PUT':
		DB('UPDATE `wolf` SET `game` = :game WHERE `id` = :id OR `code` = :id', array(
			'id' => $_GET['id'],
			'game' => json_encode($request['data']['game'])
		));
		break;
	case 'DELETE':
		DB('DELETE FROM `wolf` WHERE `id` = :id OR `code` = :id', array(
			'id' => $_GET['id']
		));
		break;
}
