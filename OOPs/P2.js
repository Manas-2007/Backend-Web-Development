//Write a program using OOPs concepts for Employee Management System

const prompt=require('prompt-sync')();
const Employee=require('./module');


let choice;
let data=[];
do{
    console.log(`       WELCOME TO EMPLOYEE MANAGEMENT SYSTEM`);
    console.log(`1.Add Employee`);
    console.log(`2.Remove Employee`);
    console.log(`3.Search Employee by ID`);
    console.log(`4.View All Employees`);
    console.log(`5.Update Salary`);
    console.log(`6.Total Employees`);
    console.log(`7.Exit`)
  choice=Number(prompt("Select Your Service (1-7) : "));
    switch(choice)
    {
        case 1:
            let e1=new Employee();
            e1.Input();

            //Json Conversion
            let jsonData={
                Id : e1.id,
                Name : e1.name,
                Department : e1.dept,
                Salary : e1.salary,
                Designation : e1.designation,
            };
            data.push(jsonData);
            console.log("Employee Added Successfully......");
            break;


        case 2:
            let idx=Number(prompt("Enter Idx of Employee : "));
            data.splice(idx,1);
            console.log("Employee Deleted Successfully....");
            break;


        case 3:
            let find=Number(prompt("Enter Employee ID : "));
            let isFound=false;
            for(let i =0;i<data.length;i++)
            {
                if(find==data[i].Id)
                {
                    isFound=true;
                    console.log(JSON.stringify(data[i],null,2));
                    break;
                }
            }
            if(isFound==false)
            {
                console.log("Employee NOT found!");
            }
            break;
        
        case 4:
            console.log(JSON.stringify(data,null,2));
            break;

        case 5:
            let findID=Number(prompt("Enter Employee ID : "));
            let Found=false;
            for(let i =0;i<data.length;i++)
            {
                if(findID==data[i].Id)
                {
                    Found=true;
                    let newSalary=Number(prompt("Enter NEW Salary : "));
                     data[i].Salary=newSalary;
                     console.log("Salary Updated....");
                     console.log(JSON.stringify(data[i],null,2));                    
                    break;
                }
            }
            if(Found==false)
            {
                console.log("Employee NOT found!");
            }
            break;

        case 6:
            console.log(`TOTAL EMPLOYEES : ${data.length}`);
            break;

        case 7:
            console.log("EXITING.......");
            break;
        default:
            console.log("Enter appropriate Service in Range (1-7");
            break;          
    }
}while(choice!=7);

