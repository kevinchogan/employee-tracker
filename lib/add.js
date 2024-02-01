const { addNewEmployee } = require("./queries.js");

async function addEmployee(conn, first_name, last_name, role_id, manager_id) {
  const res = await conn.query(addNewEmployee, [
    first_name,
    last_name,
    role_id,
    manager_id,
  ]);
  return res;
}

module.exports = { addEmployee };
