const { updateRole } = require("./queries.js");

async function updateEmpRole(conn, role_id, name, roleName) {
    const res = await conn.query(updateRole, [role_id, name]);
    console.log(`${name}'s role has been updated to ${roleName}!`);
    return res;
}

module.exports = { updateEmpRole }