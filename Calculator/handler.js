const add = require('./add');

const requestHandler = (req, res) => {
    console.log(req.url, req.method);

    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <center>
                <h1>Welcome to Calculator Home Page</h1>
                <a href="/calculator">Go to Calculator</a>
            </center>
        `);
        return res.end();
    }

    else if (req.url === '/calculator') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <center>
                <h2>Calculator</h2>
                <form action="/calculate-result" method="POST">
                    <input type="number" name="num1" placeholder="Enter first number"><br><br>
                    <input type="number" name="num2" placeholder="Enter second number"><br><br>
                    <input type="submit" value="Sum">
                </form>
            </center>
        `);
        return res.end();
    }

    else if (req.url === '/calculate-result' && req.method === 'POST') {
        const list = [];

        req.on('data', (chunk) => {
            list.push(chunk);
        });

        req.on('end', () => {
            const parseddata = Buffer.concat(list).toString();
            const params = new URLSearchParams(parseddata);

            const num1 = Number(params.get('num1'));
            const num2 = Number(params.get('num2'));

            const sum = add(num1, num2); // 🔥 using module

            res.setHeader('Content-Type', 'text/html');
            res.write(`
                <center>
                    <h1>Result: ${sum}</h1>
                    <a href="/">Go Back</a>
                </center>
            `);
            return res.end();
        });
    }
};

module.exports = requestHandler;