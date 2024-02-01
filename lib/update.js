const { updateRoleQuery, updateManagerQuery } = require("./queries.js");

/* === updateEmpRole ===
Handles the query for updating an employee role
Takes in the db connection, the new role id, the full name of the employee,
and the role name (used only for console logging)
=== updateEmpRole ===*/
async function updateEmpRole(conn, role_id, name, roleName) {
  const res = await conn.query(updateRoleQuery, [role_id, name]);
  console.log(`
      ${name}'s role has been updated to ${roleName}!
      `);
  return res;
}

/* === updateEmpManager ===
Handles the query for updating an employee manager
Takes in the db connection, the new manager id, the full name of the employee,
and the manager name (used only for console logging)
=== updateEmpManager ===*/
async function updateEmpManager(conn, manager_id, name, managerName) {
  let res;
  if (manager_id === 0) {
    res = await conn.query(updateManagerQuery, [null, name]);
  } else{
    res = await conn.query(updateManagerQuery, [manager_id, name]);
  }
  console.log(`
      ${name}'s manager has been updated to ${managerName}!
      `);
  return res;
}

module.exports = { updateEmpRole, updateEmpManager };
