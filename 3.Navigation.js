//Academic Website Navigation Bar

const http=require('http');
const server=http.createServer((req,res)=>{
    console.log(req.url,req.method);

    res.setHeader('Content-Type','text/html');

    //Main Navigation bar
    res.write(`<!DOCTYPE html>
<html>
<head>
    <title>Premium Navbar</title>

    <style>
        body {
            margin: 0;
            font-family: 'Segoe UI', sans-serif;
            background-color: #0f172a;
            color: white;
        }

        /* Navbar */
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 40px;
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        /* Logo */
        .logo {
            font-size: 22px;
            font-weight: bold;
            color: #38bdf8;
        }

        /* Links */
        ul {
            list-style: none;
            display: flex;
            gap: 25px;
            margin: 0;
            padding: 0;
        }

        ul li a {
            text-decoration: none;
            color: #cbd5f5;
            font-size: 16px;
            transition: 0.3s;
        }

        ul li a:hover {
            color: #38bdf8;
        }

        /* Button */
        .btn {
            padding: 8px 18px;
            border-radius: 6px;
            background: #38bdf8;
            color: black;
            font-weight: 500;
            text-decoration: none;
            transition: 0.3s;
        }

        .btn:hover {
            background: #0ea5e9;
        }
    </style>
</head>

<body>

    <nav>
        <div class="logo">ShopX</div>

        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/men">Men</a></li>
            <li><a href="/women">Women</a></li>
            <li><a href="/kids">Kids</a></li>
            <li><a href="/cart">Cart</a></li>
        </ul>

        <a href="/login" class="btn">Login</a>
    </nav>

</body>
</html>`)

//Routing Conditions
if(req.url==='/')
{
    res.write("<h1>Welcome to Home Page</h1>");
    return res.end();
}
else if(req.url==='/men')
{
    res.write("<h1>Welcome to Men Page</h1>");
    return res.end();
}
else if(req.url==='/women')
{
    res.write("<h1>Welcome to Women Page</h1>");
    return res.end();
}
else if(req.url==='/kids')
{
    res.write("<h1>Welcome to Kids Page</h1>");
    return res.end();
}
else if(req.url==='/cart')
{
    res.write("<h1>Welcome to Cart Page</h1>");
    return res.end();
}
else{
    res.statusCode=404;
    res.write('<h1>404 - Page Not Found!');
    return res.end();
}
});

const PORT=3000;
server.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
});
