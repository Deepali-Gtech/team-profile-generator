const fs = require("fs");
const inquirer = require("inquirer");
const engineer = require("./lib/engineer");
const intern = require("./lib/intern");
const manager = require("./lib/manager");

const employees = [];

function init() {
    inquirer.prompt([{
        message: "What is manager's name?",
        name: "name"
    },
    {
        message: "What is manager's id",
        name: "id"
    },
    {
        message: "What is manager's email address",
        name: "email"
    },
    {
        message: "What is manager's office phone number",
        name: "officeNumber"
    }
    ])
        .then(function ({ name, id, email, officeNumber }) {
            const newManager = new manager(name, id, email, officeNumber);
            employees.push(newManager);
            addEmployees();
        });
}

function addEmployees() {
    inquirer.prompt([
        {
            type: "list",
            message: "Do you like to add more employees?",
            choices: [
                "Intern",
                "Engineer",
                "None"
            ],
            name: "employeeRole"
        }
    ])
        .then(function ({ employeeRole }) {
            if (employeeRole === "None") {
                generateHTML();
            }
            else {
                addEmployee(employeeRole, function () {
                    addEmployees();
                });
            }
        });
}

function addEmployee(employeeRole, callback) {
    inquirer.prompt([{
        message: "What is employee's name?",
        name: "name"
    },
    {
        message: "What is employee's id",
        name: "id"
    },
    {
        message: "What is employee's email address",
        name: "email"
    }])
        .then(function ({ name, id, email }) {
            let employeesQuestion = "";
            if (employeeRole === "Engineer") {
                employeesQuestion = "GitHub username";
            } else {
                employeesQuestion = "school name";
            }

            inquirer.prompt([{
                message: `What is employee's ${employeesQuestion}`,
                name: "employeesAnswer"
            }
            ])
                .then(function ({ employeesAnswer }) {
                    let newEmployee;
                    if (employeeRole === "Engineer") {
                        newEmployee = new engineer(name, id, email, employeesAnswer);
                    } else if (employeeRole === "Intern") {
                        newEmployee = new intern(name, id, email, employeesAnswer);
                    }
                    employees.push(newEmployee);
                    callback();
                });
        });

}
function generateHTML() {
    let html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-light bg-light mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;

    employees.forEach(employee => {
        if (employee.getRole() === "Engineer") {
            html += `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${employee.getName()}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${employee.getId()}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
                <li class="list-group-item">GitHub: <a href="https://github.com/${employee.getGithub()}">https://github.com/${employee.getGithub()}</a></li>
            </ul>
            </div>
        </div>`;
        } else if (employee.getRole() === "Intern") {
            html += `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${employee.getName()}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${employee.getId()}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
                <li class="list-group-item">School: ${employee.getSchool()}</li>
            </ul>
            </div>
        </div>`;
        } else {
            html += `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${employee.getName()}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${employee.getId()}</li>
                <li class="list-group-item">Email Address: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
                <li class="list-group-item">Office Phone: ${employee.getOfficeNumber()}</li>
            </ul>
            </div>
        </div>`
        }
    })
    html += ` </div>
    </div>   
</body>
</html>`;
    fs.writeFile("team.html", html, (err) => {
        if (err) { console.log(err); }
    });
}

init();