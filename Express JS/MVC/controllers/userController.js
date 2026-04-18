exports.registerUser=(req,res)=>{
    const {name,email,age}=req.body;
    if(age<18)
    {
        return res.send("Not Allowed");
    }
    else{
        res.send(`
        <h2>Your Server Details are:</h2>
        <h3>Username: ${name}</h3>
        <h3>E-Mail: ${email}</h3>
        <h3>Age: ${age}</h3>
    `);
    }
};