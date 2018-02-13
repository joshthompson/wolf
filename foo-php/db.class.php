<?php

class DBMC {

	private $connection;

	public function __construct() {
		try {
			$this->connection = new PDO('mysql:host=localhost;dbname=wolf', 'root', 'root');
		} catch (Exception $e) {
			$this->connection = new DBMC_Empty_Connection();
		}
	}

	public function query($sql, $data = false) {
		return $data ? $this->prepare($sql, $data) : $this->connection->query($sql);
	}

	public function prepare($sql, $data) {
		$stmt = $this->connection->prepare($sql);
		foreach ($data as $key => $value) {
			$stmt->bindValue($key, $value);
		}
		$stmt->execute();
		return $stmt;
	}

}

class DBMC_Empty_Connection {
	function query() {}
	function prepare() {
		return new DBMC_Empty_Connection_Statement();
	}
}

class DBMC_Empty_Connection_Statement {
	function fetch() {}
	function fetchAll() {}
	function bindValue() {}
	function execute() {}
}

$dbmc_singleton = new DBMC();
function DB($query = false, $data = false) {
	global $dbmc_singleton;
	return $query ? $dbmc_singleton->query($query, $data) : $dbmc_singleton;
}
