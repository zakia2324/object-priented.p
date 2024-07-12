#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    name;
    constructor(n) {
        this.name = n;
    }
}
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
const programStart = async (persons) => {
    do {
        console.log("welcome");
        const ans = await inquirer.prompt([
            {
                type: "list",
                name: "select",
                message: (chalk.bold.bgMagenta('to whom would you like to interect with?')),
                choices: ["student", "staff", "exit"]
            }
        ]);
        if (ans.select == "staff") {
            console.log(chalk.bold.green("you approach the staff room , please feel free to ask any Qs:"));
        }
        else if (ans.select == "student") {
            const ans = await inquirer.prompt({
                name: "student",
                type: "input",
                message: (chalk.bold.red("Enter the student's name you wish to engage with:"))
            });
            const student = persons.students.find(val => val.name == ans.student);
            if (!student) {
                const name = new Student(ans.student);
                persons.addStudent(name);
                console.log(`Hello i am ${name.name}.Nice to meet you!`);
                console.log("New student added.");
                console.log("Current student list:");
                console.log(persons.students);
            }
            else {
                console.log(`Hello  i am ${student.name}. Nice to see you again!`);
                console.log("Existing new student list:");
                console.log(persons.students);
            }
        }
        else if (ans.select == "exit") {
            console.log("Exiting the program");
            process.exit();
        }
    } while (true);
};
programStart(persons);
