//Blood Donation Navigation
const http=require('http');
const server=http.createServer((req,res)=>{
    console.log(req.method,req.url);

    if(req.url==='/')
    {
        res.setHeader('content-type','text/html');
        res.write(`
      <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Myntra Navbar Clone</title>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, sans-serif;
    }

    nav {
        position: sticky;
        top: 0;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
    }

    .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 40px;
    }

    /* Logo */
    .logo {
        font-size: 22px;
        font-weight: bold;
        color: #ff3f6c;
    }

    /* Links */
    .nav-links {
        display: flex;
        list-style: none;
        gap: 25px;
    }

    .nav-links li a {
        text-decoration: none;
        color: black;
        font-weight: 600;
        font-size: 14px;
        position: relative;
    }

    .nav-links li a:hover {
        color: #ff3f6c;
    }

    /* Search */
    .search-box input {
        padding: 8px 12px;
        width: 250px;
        border: 1px solid #ddd;
        border-radius: 4px;
        outline: none;
    }

    /* Icons */
    .nav-icons {
        display: flex;
        gap: 20px;
        align-items: center;
    }

    .icon {
        text-align: center;
        font-size: 12px;
        cursor: pointer;
    }

    .icon span {
        font-size: 18px;
        display: block;
    }

    .icon:hover {
        color: #ff3f6c;
    }

</style>
</head>

<body>

<nav>
    <div class="navbar">

        <!-- Logo -->
        <div class="logo">Myntra</div>

        <!-- Links -->
        <ul class="nav-links">
            <li><a href="/men">MEN</a></li>
            <li><a href="/women">WOMEN</a></li>
            <li><a href="/kids">KIDS</a></li>
            <li><a href="/livings">HOME & LIVING</a></li>
            <li><a href="/beauty">BEAUTY</a></li>
            <li><a href="/STUDIO">STUDIO</a></li>
        </ul>

        <!-- Search -->
        <div class="search-box">
            <input type="text" placeholder="Search for products, brands and more">
        </div>

        <!-- Icons -->
        <div class="nav-icons">
            <div class="icon">
                <span>👤</span>
                Profile
            </div>

            <div class="icon">
                <span>❤️</span>
                Wishlist
            </div>

            <div class="icon">
                <span>🛒</span>
                Bag
            </div>
        </div>

    </div>
</nav>

</body>
</html>
            `);
            return res.end();
    }
 if(req.url==='/men')
    {
        res.setHeader('Content-Type','text/html');
        res.write(`<h1>Welcome to Men Navigation</h1>`);
        res.end();
    }
    else if(req.url==='/women')
    {
        res.setHeader('Content-Type','text/html');
        res.write(`<h1>Welcome to Women Navigation</h1>`);
        res.end();
    }
    else if(req.url==='/kids')
    {
        res.setHeader('Content-Type','text/html');
        res.write(`<h1>Welcome to kids Navigation</h1>`);
        res.end();
    }
    else if(req.url==='/livings')
    {
        res.setHeader('Content-Type','text/html');
        res.write(`<h1>Welcome to Living Navigation</h1>`);
        res.end();
    }
    else if(req.url==='/beauty')
    {
        res.setHeader('Content-Type','text/html');
        res.write(`<h1>Welcome to Beauty Navigation</h1>`);
        res.end();
    }
    else if(req.url.toLowerCase()==='/studio')
    {
        res.setHeader('Content-Type','text/html');
        res.write(`<h1>Welcome to Studio Navigation</h1>`);
        res.end();
    }
    

});

const PORT=3000;
server.listen(PORT,()=>{
    console.log(`The Server is Live at http://localhost:${PORT}`)

});