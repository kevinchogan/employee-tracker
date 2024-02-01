const { updateRole } = require("./queries.js");

/* === updateEmpRole ===
Handles the query for updating an employee role
Takes in the db connection, the new role id, the full name of the employee,
and the role name (used only for console logging)
=== updateEmpRole ===*/
async function updateEmpRole(conn, role_id, name, roleName) {
  const res = await conn.query(updateRole, [role_id, name]);
  console.log(`
      ${name}'s role has been updated to ${roleName}!
      `);
  return res;
}

module.exports = { updateEmpRole };
