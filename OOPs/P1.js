//Write a program in JS using OOPs concept for Management of Student Management System

const prompt = require('prompt-sync')();

class Student {

    constructor(id, name, branch, cgpa)
    {
        this.id = id;
        this.name = name;
        this.branch = branch;
        this.cgpa = cgpa;
    }

    Input()
    {
        this.id = Number(prompt("Enter ID : "));
        this.name = prompt("Enter Your Name : ");
        this.branch = prompt("Enter Your Branch : ");
        this.cgpa = Number(prompt("Enter Your CGPA : "));
    }
}

let Students = [];

let choice;

do {

    console.log("\n===== STUDENT MANAGEMENT SYSTEM =====");

    console.log("1. Add Student");
    console.log("2. Remove Student");
    console.log("3. Total Students");
    console.log("4. View Student");
    console.log("5. View All Students");
    console.log("6. Exit");

    choice = Number(prompt("Enter Choice : "));

    switch(choice)
    {
        case 1:

            let s = new Student();

            s.Input();

            // Convert into JSON Object
            let jsondata = {

                Id: s.id,
                Name: s.name,
                Branch: s.branch,
                CGPA: s.cgpa
            };

            // Store JSON Object
            Students.push(jsondata);

            console.log("\nStudent Added Successfully");
            break;

        case 2:

            let index = Number(prompt("Enter Student Index Position : "));

            if(index >= 0 && index < Students.length)
            {
                Students.splice(index, 1);

                console.log("\nStudent Removed Successfully");
            }

            else
            {
                console.log("Invalid Index");
            }

            break;

        case 3:

            console.log(`\nTotal Students : ${Students.length}`);

            break;

        case 4:

            let roll = Number(prompt("Enter Roll Number : "));

            let isFound = false;

            for(let i = 0; i < Students.length; i++)
            {
                if(roll === Students[i].Id)
                {
                    console.log("\nStudent Found :\n");

                    console.log(JSON.stringify(Students[i], null, 2));

                    isFound = true;

                    break;
                }
            }

            if(isFound == false)
            {
                console.log("\nStudent Not Found");
            }

            break;

        case 5:

            console.log("\nALL STUDENTS DATABASE :\n");

            console.log(JSON.stringify(Students, null, 2));

            break;

        case 6:

            console.log("\nEXITING PROGRAM...");

            break;

        default:

            console.log("\nInvalid Choice");
    }

} while(choice != 6);