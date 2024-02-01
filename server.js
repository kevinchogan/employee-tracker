const connection = require("./lib/connection.js");

const {
  mainMenuQuestions,
  addRoleQuestions,
  addDepartmentQuestions,
  addEmployeeQuestions,
  updateEmpRoleQuestions,
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
  updateDeptArray,
} = require("./lib/refresh.js");

const { prompt } = require("inquirer");
const { makeTable } = require("./lib/tables.js");
const { getEmployeeId, getRoleId, getDeptId } = require("./lib/search.js");
const { addEmployee } = require("./lib/add.js");
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
      let updatedAddEmpQuestions = await updateRoleArray(
        conn,
        addEmployeeQuestions,
        2
      );
      updatedAddEmpQuestions = await updateEmployeeArray(
        conn,
        updatedAddEmpQuestions,
        3
      );
      empData = await prompt(updatedAddEmpQuestions);
      const managerId = await getEmployeeId(conn, empData.manager);
      const roleId = await getRoleId(conn, empData.role);
      await addEmployee(
        conn,
        empData.first_name,
        empData.last_name,
        roleId,
        managerId
      );
      break;
    case "Update Employee Role":
      let updatedUpRoleQuestions = await updateEmployeeArray(
        conn,
        updateEmpRoleQuestions,
        0
      );
      updatedUpRoleQuestions = await updateRoleArray(
        conn,
        updatedUpRoleQuestions,
        1
      );
      empData = await prompt(updatedUpRole);
      console.log(empData);
      break;
    case "View All Roles":
      const roles = await conn.query(selectRoles);
      makeTable(roles[0]);
      break;
    case "Add Role":
      const updatedAddRoleQuestions = await updateDeptArray(
        conn,
        addRoleQuestions,
        2
      );
      roleData = await prompt(updatedAddRoleQuestions);
      console.log(roleData);
      break;
    case "View All Departments":
      const departments = await conn.query(selectDept);
      makeTable(departments[0]);
      break;
    case "Add Department":
      deptData = await prompt(addDepartmentQuestions);
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
