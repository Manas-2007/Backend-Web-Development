const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.method, req.url); 

    // ✅ Handle POST first
    if (req.url === '/' && req.method === 'POST') {

        const body = [];

        req.on("data", (chunk) => {
            console.log("Chunk:", chunk);       
            body.push(chunk);
        });

        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log("Full Data:", parsedBody); // 🔥 final data

            //Main parsing request
            const params=new URLSearchParams(parsedBody);
            const jsonObject={};
            for (const [key,value] of params.entries())
            {
                jsonObject[key]=value;
            }
            console.log(jsonObject);

            // Redirect to home
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
        });

    }

    // ✅ Handle GET (show form)
    else if (req.url === '/' && req.method === 'GET') {

        res.setHeader("Content-Type", "text/html");

        res.write(`<!DOCTYPE html>
<html>
<head>
    <title>Simple Form</title>
</head>

<body>

    <h2>Enter Your Details</h2>

    <form action="/" method="POST">
        
        <label>Username:</label><br/>
        <input type="text" name="username" required />
        <br/><br/>

        <label>Gender:</label><br/>
        <input type="radio" name="gender" value="male" required /> Male
        <input type="radio" name="gender" value="female" /> Female
        <br/><br/>

        <button type="submit">Submit</button>

    </form>

</body>
</html>`);

        return res.end();
    }

    // ✅ 404 fallback
    else {
        res.statusCode = 404;
        res.end("Page Not Found");
    }

});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});