//Using router
const http = require('http');
const server=http.createServer((req,res)=>{
    console.log(req.headers,req.url);

    //Routing Response
    if(req.url==='/')
    {
        res.setHeader("Content-Type","text/html");
        res.write('<html>');
        res.write('<head><title>Server Designing</title></head>')
        res.write('<body><h1><center>Enter your details:</center></h1><br/>')
        res.write(`
            
            <form action="/submit" method="POST">
                <center>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Enter Username" 
                    required
                />
                <br/><br/>

                <label>
                    <input type="radio" name="gender" value="male" required/>
                    Male
                </label>

                <label>
                    <input type="radio" name="gender" value="female"/>
                    Female
                </label>

                <br/><br/>

                <button type="submit">Submit</button></center>

            </form>`)
        res.write('</body></html>');
        return res.end();
    }

    //Re-directing logic implementation
    else if(req.url==="/submit" && req.method==='POST')
    {
        res.setHeader('Location','/');
        res.statusCode=302;
        return res.end();
    }
    
    else
    {
        res.setHeader("Content-Type","text/html");
        res.write('<html>');
        res.write('<head><title>Server Designing</title></head>')
        res.write('<body><h1>This is the End of the Webpage...</h1></body>')
        res.write('</html>');
        return res.end();
    }
});

const PORT=1000;
server.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
});