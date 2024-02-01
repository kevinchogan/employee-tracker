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

const addDepartmentQuestions = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "name",
  },
];

const addRoleQuestions = [
  {
    type: "input",
    message: "What is the name of the role?",
    name: "title",
  },
  {
    type: "input",
    message: (answers) => `What is the salary for the ${answers.title}?`,
    name: "salary",
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
      `What department does the ${answers.title} belong to?`,
    name: "department",
    choices: [],
  },
];

const addEmployeeQuestions = [
  {
    type: "input",
    message: "What is the employee's first name?",
    name: "first_name",
  },
  {
    type: "input",
    message: (answers) => `What is ${answers.first_name}'s last name?`,
    name: "last_name",
  },
  {
    type: "list",
    message: (answers) => `What is ${answers.first_name}'s role?`,
    name: "role",
    choices: [],
  },
  {
    type: "list",
    message: (answers) => `Who is  ${answers.first_name}'s manager?`,
    name: "manager",
    choices: [],
  },
];

const updateEmpRoleQuestions = [
  {
    type: "list",
    message: "Which employee's role do you wish to update?",
    name: "name",
    choices: [],
  },
  {
    type: "list",
    message: (answers) =>
      `Which role do you want to assign to ${answers.name}?`,
    name: "title",
    choices: [],
  },
];

module.exports = {
  mainMenuQuestions,
  addRoleQuestions,
  addDepartmentQuestions,
  addEmployeeQuestions,
  updateEmpRoleQuestions,
};
