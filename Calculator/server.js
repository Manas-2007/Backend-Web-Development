const http=require('http');
const { parse } = require('path');
const server=http.createServer((req,res)=>{
    console.log(req.url,req.method);
   
    
    if(req.url==='/')
    {
         res.setHeader('Content-Type','text/html');
        res.write(`
            <center>
                <h1>Welcome to Calculator Home Page</h1>
                <p>Click below to start calculation</p>
                <a href="/calculator">Go to Calculator</a>
            </center>
            `);
        return res.end();
    }

    else if(req.url==='/calculator')
    {
        res.setHeader('Content-Type','text/html');
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
    else if(req.url==='/calculate-result' && req.method==='POST')
    {
        const list=[];
        req.on('data',(chunk)=>{
            list.push(chunk);
        })

        req.on('end',()=>{
            const parseddata=Buffer.concat(list).toString();
            const result=new URLSearchParams(parseddata);
            const dataset={};
            for(let [key,value] of result.entries())
            {
                dataset[key]=value;            
            }
            console.log(dataset);
            const num1=Number(dataset.num1);
            const num2=Number(dataset.num2);
            const sum=num1+num2;
            console.log(`The sum of ${num1} and ${num2} is ${sum}`);

            res.setHeader('Content-Type','text/html');
             res.write(`
                <center>
                    <h1>Result: ${sum}</h1>
                    <a href="/">Go Back</a>
                </center>
            `);
            return res.end();

         })
    }
});




const port=500;
server.listen(port,()=>{
    console.log(`Server is Live at http://localhost:${port}`);
})