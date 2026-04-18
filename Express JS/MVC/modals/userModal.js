class User{
    constructor(name,email,age)
    {
        this.name=name;
        this.age=age;
        this.email=email;
    }
}

//fake database
const users=[];
exports.User = User;
exports.users = users;