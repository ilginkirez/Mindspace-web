const http = require('http');

const data = JSON.stringify({
    email: 'testuser2@mindspace.com',
    password: 'securePassword123'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/auth/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
