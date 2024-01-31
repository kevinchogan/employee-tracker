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

const {
  updateRoleArray, 
  updateEmployeeArray, 
  updateDeptArray 
} = require("./lib/updates.js");

const { prompt } = require("inquirer");
const { makeTable } = require("./lib/tables.js");
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
      makeTable(employees[0]);
      break;
    case "Add Employee":
      let updatedAddEmp = await updateRoleArray(conn, addEmployee, 2);
      updatedAddEmp = await updateEmployeeArray(conn, updatedAddEmp, 3);
      empData = await prompt(updatedAddEmp);
      console.log(empData);
      break;
    case "Update Employee Role":
      let updatedUpRole = await updateEmployeeArray(conn, updateEmpRole, 0);
      updatedUpRole = await updateRoleArray(conn, updatedUpRole, 1);
      empData = await prompt(updatedUpRole);
      console.log(empData);
      break;
    case "View All Roles":
      const roles = await conn.query(selectRoles);
      makeTable(roles[0]);
      break;
    case "Add Role":
      const updatedAddRole = await updateDeptArray(conn, addRole, 2);
      roleData = await prompt(updatedAddRole);
      console.log(roleData);
      break;
    case "View All Departments":
      const departments = await conn.query(selectDept);
      makeTable(departments[0]);
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
