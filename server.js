const connection = require("./lib/connection.js");
// Import inquirer questions
const {
  mainMenuQuestions,
  addRoleQuestions,
  addDepartmentQuestions,
  addEmployeeQuestions,
  updateEmpRoleQuestions,
  updateEmpMgrQuestions,
  viewByManagerQuestions,
  viewByDepartmentQuestions,
  deleteEmployeeQuestions,
  deleteRoleQuestions,
  deleteDepartmentQuestions,
} = require("./lib/input.js");
// Import the intro text
const intro = require("./lib/intro.js");
// Import select queries
const {
  selectEmployeesQuery,
  selectRolesQuery,
  selectDeptQuery,
  selectManagersQuery,
  deleteEmployeeQuery,
  deleteRoleQuery,
  deleteDepartmentQuery,
} = require("./lib/queries.js");
// Import functions for updating questions with latest data
const {
  updateRoleArray,
  updateEmployeeArray,
  updateDeptArray,
  updateManagerArray,
} = require("./lib/refresh.js");

const { prompt } = require("inquirer"); //inquirer
const { makeTable } = require("./lib/tables.js"); //displays tables
const { getEmployeeId, getRoleId, getDeptId } = require("./lib/search.js"); //retrieves ids from db
const { addEmployee, addRole, addDepartment } = require("./lib/add.js"); //adds to db
const { updateEmpRole, updateEmpManager } = require("./lib/update.js"); //updates db
const { makeManagerTable } = require("./lib/manager.js");
const { makeDepartmentTable } = require("./lib/department.js");
let conn;

/* === start ===
Displays the app introduction and starts the Main Menu
=== start ===*/
async function start() {
  console.log(intro);
  conn = await connection;
  mainMenu();
}

/* === mainMenu ===
Prompts the user with the Main Menu and handles the response
=== mainMenu ===*/
async function mainMenu() {
  const userChoice = await prompt(mainMenuQuestions);
  let quit = false;
  let deptData;
  let empData;
  let roleData;
  let managerId;
  let roleId;
  let employees;
  let managers;
  let departments;

  switch (userChoice.topMenu) {
    // View table of employees
    case "View All Employees":
      employees = await conn.query(selectEmployeesQuery);
      console.log("");
      makeTable(employees[0]);
      break;

    // View employees by manager
    case "View Employees By Manager":
      const updatedViewByManagerQuestions = await updateManagerArray(
        conn,
        viewByManagerQuestions,
        0
      );
      empData = await prompt(updatedViewByManagerQuestions);
      await makeManagerTable(conn, empData.name);
      break;

    // View employees by all managers
    case "View Employees By All Managers":
      managers = await conn.query(selectManagersQuery);
      for (let i = 0; i < managers[0].length; i++) {
        await makeManagerTable(conn, managers[0][i].manager_name);
      }
      break;

    // View employees by department
    case "View Employees By Department":
      const updatedViewByDepartmentQuestions = await updateDeptArray(
        conn,
        viewByDepartmentQuestions,
        0
      );
      empData = await prompt(updatedViewByDepartmentQuestions);
      await makeDepartmentTable(conn, empData.name);
      break;

    // View employees by all departments
    case "View Employees By All Departments":
      departments = await conn.query(selectDeptQuery);
      for (let i = 0; i < departments[0].length; i++) {
        await makeDepartmentTable(conn, departments[0][i].Name);
      }
      break;

    // Add a new employee
    case "Add Employee":
      // Update questions with latest roles and employees
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
      // Ask questions
      empData = await prompt(updatedAddEmpQuestions);
      // Get the ids for role and manager
      roleId = await getRoleId(conn, empData.role);
      if (empData.manager === "None") {
        managerId = 0;
      } else {
        managerId = await getEmployeeId(conn, empData.manager);
      }
      // Add the employee
      await addEmployee(
        conn,
        empData.first_name,
        empData.last_name,
        roleId,
        managerId
      );
      break;

    // Update the role of an existing employee
    case "Update Employee Role":
      // Update questions with latest employees and roles
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
      // Ask questions
      empData = await prompt(updateEmpRoleQuestions);
      // Get the role id
      roleId = await getRoleId(conn, empData.role);
      // Update the role of the employee
      await updateEmpRole(conn, roleId, empData.name, empData.role);
      break;

    // View table of all roles
    case "Update Employee Manager":
      // Update questions with latest employees and roles
      let updatedUpMgrQuestions = await updateEmployeeArray(
        conn,
        updateEmpMgrQuestions,
        0,
        false
      );
      updatedUpMgrQuestions = await updateEmployeeArray(
        conn,
        updatedUpMgrQuestions,
        1,
        true
      );
      // Ask questions
      empData = await prompt(updatedUpMgrQuestions);
      // Get the manager id
      if (empData.manager === "None") {
        console.log("Setting manager id to zero");
        managerId = 0;
      } else {
        managerId = await getEmployeeId(conn, empData.manager);
      }
      // Update the role of the employee
      await updateEmpManager(conn, managerId, empData.name, empData.manager);
      break;

    // Remove selected employee
    case "Remove Employee":
      const updatedDeleteEmployeeQuestions = await updateEmployeeArray(
        conn,
        deleteEmployeeQuestions,
        0,
        false
      );
      empData = await prompt(updatedDeleteEmployeeQuestions);
      await conn.query(deleteEmployeeQuery, empData.name);
      console.log(`
      ${empData.name} has been removed!
`);
      break;

    // View table of all roles
    case "View All Roles":
      const roles = await conn.query(selectRolesQuery);
      console.log("");
      makeTable(roles[0]);
      break;

    // Add a new role
    case "Add Role":
      // Update questions with latest departments
      const updatedAddRoleQuestions = await updateDeptArray(
        conn,
        addRoleQuestions,
        2
      );
      // Ask the questions
      roleData = await prompt(updatedAddRoleQuestions);
      // Get the department id
      const departmentId = await getDeptId(conn, roleData.department);
      // Add the role
      await addRole(conn, roleData.title, roleData.salary, departmentId);
      break;

      // Remove selected role
    case "Remove Role":
      const updatedDeleteRoleQuestions = await updateRoleArray(
        conn,
        deleteRoleQuestions,
        0
      );
      roleData = await prompt(updatedDeleteRoleQuestions);
      await conn.query(deleteRoleQuery, roleData.name);
      console.log(`
      ${roleData.name} has been removed!
`);
      break;

    // View table of all departments
    case "View All Departments":
      departments = await conn.query(selectDeptQuery);
      console.log("");
      makeTable(departments[0]);
      break;

    // Add a new department
    case "Add Department":
      deptData = await prompt(addDepartmentQuestions);
      await addDepartment(conn, deptData.name);
      break;


    // Remove selected department
    case "Remove Department":
      const updatedDeleteDepartmentQuestions = await updateDeptArray(
        conn,
        deleteDepartmentQuestions,
        0
      );
      deptData = await prompt(updatedDeleteDepartmentQuestions);
      await conn.query(deleteDepartmentQuery, deptData.name);
      console.log(`
      ${deptData.name} has been removed!
`);
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
