const inquirer = require("inquirer");

const askQuestions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "topMenu",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
        ],
      },
      // ADD DEPARTMENT
      {
        type: "input",
        message: "What is the name of the department?",
        name: "deptName",
        when: (answers) => answers.topMenu === "Add Department",
      },
      // ADD ROLE
      {
        type: "input",
        message: "What is the name of the role?",
        name: "roleName",
        when: (answers) => answers.topMenu === "Add Role",
      },
      {
        type: "input",
        message: "What is the salary of the role?",
        name: "roleSalary",
        when: (answers) => answers.topMenu === "Add Role",
        validate: function (input) {
            if (!/[0-9]/.test(input)) {
              return "Please enter a valid number.";
            } 
            return true;  
        },
      },
      {
        type: "list",
        message: "What department does the role belong to?",
        name: "roleDept",
        when: (answers) => answers.topMenu === "Add Role",
        // TODO: this needs to be replaced with a query
        choices: [
            "Engineering",
            "Finance",
            "Legal",
            "Service",
        ],
      },
      // ADD EMPLOYEE
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "empFirstName",
        when: (answers) => answers.topMenu === "Add Employee",
      },      
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "empLastName",
        when: (answers) => answers.topMenu === "Add Employee",
      },      
      {
        type: "list",
        message: "What is the employee's role?",
        name: "empRole",
        when: (answers) => answers.topMenu === "Add Employee",
        // TODO: this needs to be replaced with a query
        choices: [
            "Sales Lead",
            "Salesperson",
            "Lead Engineer",
            "Software Engineer",
            "Account Manager",
            "Accountant",
            "Legal Team Lead",
            "Lawyer",
        ],
      },
      {
        type: "list",
        message: "Who is the employee's manager?",
        name: "empManager",
        when: (answers) => answers.topMenu === "Add Employee",
        // TODO: this needs to be replaced with a query
        choices: [
            "John Doe",
            "Mike Chan",
            "Ashley Rodriguez",
            "Kevin Hogan",
            "Kunal Singh",
            "Malia Brown",
            "Sarah Lourde",
            "Tom Allen",
        ],
      },
      // UPDATE EMPLOYEE ROLE
      {
        type: "list",
        message: "Which employee's role do you wish to update?",
        name: "updateRoleName",
        when: (answers) => answers.topMenu === "Update Employee Role",
        // TODO: this needs to be replaced with a query
        choices: [
            "John Doe",
            "Mike Chan",
            "Ashley Rodriguez",
            "Kevin Hogan",
            "Kunal Singh",
            "Malia Brown",
            "Sarah Lourde",
            "Tom Allen",
        ],
      },
      {
        type: "list",
        message: `Which role do you want to assign to the selected employee?`,
        name: "updateRole",
        when: (answers) => answers.topMenu === "Update Employee Role",
        // TODO: this needs to be replaced with a query
        choices: [
            "Sales Lead",
            "Salesperson",
            "Lead Engineer",
            "Software Engineer",
            "Account Manager",
            "Accountant",
            "Legal Team Lead",
            "Lawyer",
        ],
      },

    ])
    .then((answers) => {
        console.log(answers);
        askQuestions();
    });
};

module.exports = { askQuestions };
