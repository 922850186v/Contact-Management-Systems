<?php

class Connection
{
    private $server = 'localhost';
    private $dbname = 'react-php';
    private $user = 'root';
    private $password = '';

    public function connect()
    {
        try {
            $con = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname . ';user=' . $this->user . ';password' . $this->password);
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $con;
        } catch (\Exception $e) {
            echo "Database Error - " . $e->getMessage();
        }
    }
}
