// const connection = require("./connection.js");
// const deptArray = getDeptArray()
// let conn;

// async function getDeptArray() {
//   conn = await connection;
//   const dept = await conn.query(selectDept);
//   deptArray = dept[0].map(obj => obj.Name);
// }

const mainMenuQuestions = [
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
      "Quit",
    ],
  },
];

const addDepartment = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "deptName",
  },
];

const addRole = [
  {
    type: "input",
    message: "What is the name of the role?",
    name: "roleName",
  },
  {
    type: "input",
    message: (answers) => `What is the salary for the ${answers.roleName}?`,
    name: "roleSalary",
    validate: function (input) {
      if (!/[0-9]/.test(input)) {
        return "Please enter a valid number.";
      }
      return true;
    },
  },
  {
    type: "list",
    message: (answers) =>
      `What department does the ${answers.roleName} belong to?`,
    name: "roleDept",
    // TODO: this needs to be replaced with a query
    choices: ["Engineering", "Legal", "Finance", "Sales"],
  },
];

const addEmployee = [
  {
    type: "input",
    message: "What is the employee's first name?",
    name: "empFirstName",
  },
  {
    type: "input",
    message: (answers) => `What is ${answers.empFirstName}'s last name?`,
    name: "empLastName",
  },
  {
    type: "list",
    message: (answers) => `What is ${answers.empFirstName}'s role?`,
    name: "empRole",
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
    message: (answers) => `Who is  ${answers.empFirstName}'s manager?`,
    name: "empManager",
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
];

const updateEmpRole = [
  {
    type: "list",
    message: "Which employee's role do you wish to update?",
    name: "updateRoleName",
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
    message: (answers) =>
      `Which role do you want to assign to ${answers.updateRoleName}?`,
    name: "updateRole",
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
];

module.exports = {
  mainMenuQuestions,
  addRole,
  addDepartment,
  addEmployee,
  updateEmpRole,
};
