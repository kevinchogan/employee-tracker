const {
  selectIdByEmpName,
  selectIdByRole,
  selectIdByDept,
} = require("./queries.js");

/* === getEmployeeId ===
Handles the db query for retrieving an employee id based on their full name
=== getEmployeeId ===*/
async function getEmployeeId(conn, name) {
  const res = await conn.query(selectIdByEmpName, name);
  const managerId = res[0][0].id;
  return managerId;
}

/* === getRoleId ===
Handles the db query for retrieving a role id based on the role title
=== getRoleId ===*/
async function getRoleId(conn, title) {
  const res = await conn.query(selectIdByRole, title);
  const roleId = res[0][0].id;
  return roleId;
}

/* === getDeptId ===
Handles the db query for retrieving a department id based on the department name
=== getDeptId ===*/
async function getDeptId(conn, name) {
  const res = await conn.query(selectIdByDept, name);
  const deptId = res[0][0].id;
  return deptId;
}

module.exports = { getEmployeeId, getRoleId, getDeptId };
