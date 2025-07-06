// echo.js
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

export default function createEcho(token) {
    return new Echo({
        broadcaster: 'pusher',
        key: "306c6f59ed824a6e038a",
        cluster: "eu",
        forceTLS: true,
        encrypted: true,
        authEndpoint: 'http://localhost:8000/broadcasting/auth',
        auth: {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept:'application/json'
            },
        },
    });
}
