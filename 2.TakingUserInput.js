const http=require('http');
const fs=require('fs');
const querystring=require('querystring');

const server=http.createServer((req,res)=>{
    console.log(req.url,req.method);

    //User Interation via Server
   

        if(req.url==="/")
        {
            res.setHeader('Content-Type','text/html');
    res.write(`
        <!DOCTYPE html>
<html>
<head>
    <title>Simple Form</title>
</head>
<body>

<center>
    <h2>User Form</h2>

    <form action="/submit-tab" method="POST">
        <label>Name:</label><br>
        <input type="text" placeholder="Enter your name" name="Username"><br><br>

        <label>Password:</label><br>
        <input type="password" placeholder="Enter your password" name="Password"><br><br>

        <label>Gender:</label><br>
        
        <input type="radio" name="gender" value="Male" id="male">
        <label for="male">Male</label><br>

        <input type="radio" name="gender" value="Female" id="female">
        <label for="female">Female</label><br>
<br><br>

        <input type="submit" value="Submit">
    </form>
</center>

</body>
</html>`);

        res.write('<br/><br/><h1>Kindly Fill out the above form : </h1>')
            return res.end();
        }
        else if(req.url==="/submit-tab")
        {
            if(req.method==="POST")
            {
                const items=[];
                req.on("data",(chunk)=>{
                    items.push(chunk);
                })

                req.on("end",()=>{
                    const finaldata=Buffer.concat(items).toString();
                    const result=querystring.parse(finaldata);
                    console.log(result);
                     fs.writeFileSync("data.txt",result);
                //Re-Directing to Homepage
                res.statusCode=302; 
                res.setHeader('Location','/');
                return res.end();
                })

                
            }
            else
            {
                res.write('Kindly Fill out Form first.....!');
                return res.end();
            }
        }
});

//Server Port Connection
const PORT=301;
server.listen(PORT,()=>{
    console.log(`Server is Live at http://localhost:${PORT}`);
});