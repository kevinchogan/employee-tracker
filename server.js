const connection = require("./lib/connection.js");
const {
  mainMenuQuestions,
  addRole,
  addDepartment,
  addEmployee,
  updateEmpRole,
} = require("./lib/input.js");
const intro = require("./lib/intro.js");
const {
  selectEmployees,
  selectRoles,
  selectDept,
} = require("./lib/queries.js");
const { prompt } = require("inquirer");
const { employeeTable, roleTable, deptTable } = require("./lib/tables.js");
let conn;

async function start() {
  console.log(intro);
  conn = await connection;
  mainMenu();
}

async function mainMenu() {
  const userChoice = await prompt(mainMenuQuestions);
  let quit = false;
  let deptData;
  let empData;
  let roleData;
  switch (userChoice.topMenu) {
    case "View All Employees":
      const employees = await conn.query(selectEmployees);
      employeeTable(employees[0]);
      break;
    case "Add Employee":
      empData = await prompt(addEmployee);
      console.log(empData);
      break;
    case "Update Employee Role":
      empData = await prompt(updateEmpRole);
      console.log(empData);
      break;
    case "View All Roles":
      const roles = await conn.query(selectRoles);
      roleTable(roles[0]);
      break;
    case "Add Role":
      roleData = await prompt(addRole);
      console.log(roleData);
      break;
    case "View All Departments":
      const departments = await conn.query(selectDept);
      deptTable(departments[0]);
      break;
    case "Add Department":
      deptData = await prompt(addDepartment);
      console.log(deptData);
      break;
    default:
      quit = true;
      break;
  }

  if (quit) {
    process.exit();
  } else {
    mainMenu();
  }
}

start();
