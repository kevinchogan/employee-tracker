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
const { addEmployee, addRole, addDepartment } = require("./lib/add.js");
const { updateEmpRole } = require("./lib/update.js");
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
  let managerId;
  let roleId;

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
        3,
        true
      );
      empData = await prompt(updatedAddEmpQuestions);
      roleId = await getRoleId(conn, empData.role);
      if (!empData.manager === "None") {
        managerId = await getEmployeeId(conn, empData.manager);
      } else {
        managerId = 0;
      }
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
        0,
        false
      );
      updatedUpRoleQuestions = await updateRoleArray(
        conn,
        updatedUpRoleQuestions,
        1
      );
      empData = await prompt(updateEmpRoleQuestions);
      roleId = await getRoleId(conn, empData.role);
      await updateEmpRole(conn, roleId, empData.name, empData.role);
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
      const departmentId = await getDeptId(conn, roleData.department);
      await addRole(conn, roleData.title, roleData.salary, departmentId);
      break;
    case "View All Departments":
      const departments = await conn.query(selectDept);
      makeTable(departments[0]);
      break;
    case "Add Department":
      deptData = await prompt(addDepartmentQuestions);
      await addDepartment(conn, deptData.name);
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
