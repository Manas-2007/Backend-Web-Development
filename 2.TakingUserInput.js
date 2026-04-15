//Program of feedback system

const http=require('http');
const server=http.createServer((req,res)=>{
    console.log(req.url,req.method);

    //Main Feedback System
    if(req.url==='/')
    {
        res.setHeader('Content-Type','text/html');
        res.write(`

                <!DOCTYPE html>
<html>
<head>
    <title>Feedback Form</title>
</head>
<body>

<center>
    <h2>User Feedback Form</h2>

    <form action="/submit-feedback" method="POST">

        <!-- Name -->
        <label>Name:</label><br>
        <input type="text" name="name" placeholder="Enter your name"><br><br>

        <!-- Message -->
        <label>Message:</label><br>
        <textarea name="message" placeholder="Enter your feedback"></textarea><br><br>

        <!-- Rating -->
        <label>Rating:</label><br>

        <input type="radio" name="rating" value="1" id="r1">
        <label for="r1">1 ⭐</label><br>

        <input type="radio" name="rating" value="2" id="r2">
        <label for="r2">2 ⭐</label><br>

        <input type="radio" name="rating" value="3" id="r3">
        <label for="r3">3 ⭐</label><br>

        <input type="radio" name="rating" value="4" id="r4">
        <label for="r4">4 ⭐</label><br>

        <input type="radio" name="rating" value="5" id="r5">
        <label for="r5">5 ⭐</label><br><br>

        <!-- Submit -->
        <input type="submit" value="Submit Feedback">

    </form>
</center>

</body>
</html>`);
            res.write('<br/><br/><h1>Fill out the above soon...........</h1>');
            return res.end();
    }

    else if(req.url==='/submit-feedback' && req.method==='POST')
    {
        const list=[];

        //Chunk data sets
        req.on('data',(chunk)=>{
            list.push(chunk);
            console.log(chunk);
        });

        //Stream data sets
        req.on('end',()=>{
             const datalist=Buffer.concat(list).toString();
        console.log(datalist);

        //Final Processed data
        const result=new URLSearchParams(datalist);
        const finalresult={};
        for(let [key,value] of result.entries())
        {
            finalresult[key]=value;
        }
        console.log(finalresult);

        //Redirecting to homepage
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();

        })
       


        
    }
});

//Server PORT
const PORT=420;
server.listen(PORT,()=>{
    console.log(`Server is Live at http://localhost:${PORT}`);
})