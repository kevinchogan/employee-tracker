const { selectEmployees, selectRoles, selectDept } = require("./queries.js");

/* === updateRoleArray ===
Queries the db for the latest list of roles and updates the index inquirer question
=== updateRoleArray ===*/
async function updateRoleArray(conn, questions, index) {
  const roleData = await conn.query(selectRoles);
  roleArray = roleData[0].map((role) => role.Title);
  questions[index].choices = roleArray;
  return questions;
}

/* === updateEmployeeArray ===
Queries the db for the latest list of employees and updates the index inquirer question
Pass in isManager if the list should include 'None' as the first option
=== updateEmployeeArray ===*/
async function updateEmployeeArray(conn, questions, index, isManager) {
  const empData = await conn.query(selectEmployees);
  empArray = empData[0].map((emp) => `${emp.First} ${emp.Last}`);
  if (isManager) {
    empArray.unshift("None");
  }
  questions[index].choices = empArray;
  return questions;
}

/* === updateDeptArray ===
Queries the db for the latest list of departments and updates the index inquirer question
=== updateDeptArray ===*/
async function updateDeptArray(conn, questions, index) {
  const deptData = await conn.query(selectDept);
  deptArray = deptData[0].map((dept) => dept.Name);
  questions[index].choices = deptArray;
  return questions;
}

module.exports = { updateRoleArray, updateEmployeeArray, updateDeptArray };
