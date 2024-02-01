const {
  addNewEmployee,
  addNewRole,
  addNewDepartment,
} = require("./queries.js");

/* === addEmployee ===
Handles the query for adding a new employee
Takes in the db connection, first and last names as well as the role id
and the manager id (set to zero if no manager)
=== addEmployee ===*/
async function addEmployee(conn, first_name, last_name, role_id, manager_id) {
  let res;
  // sends null as manager if id is 0
  if (manager_id === 0) {
    res = await conn.query(addNewEmployee, [
      first_name,
      last_name,
      role_id,
      null,
    ]);
  } else {
    res = await conn.query(addNewEmployee, [
      first_name,
      last_name,
      role_id,
      manager_id,
    ]);
  }
  console.log(`
      ${first_name} ${last_name} added!
      `);
  return res;
}

/* === addRole ===
Handles the query for adding a new role
Takes in the db connection, the role title, salary, and department id
=== addRole ===*/
async function addRole(conn, title, salary, department_id) {
  const res = await conn.query(addNewRole, [title, salary, department_id]);
  console.log(`
      ${title} added!
      `);
  return res;
}
/* === addDepartment ===
Handles the query for adding a new department
Takes in the db connection, the department name
=== addDepartment ===*/
async function addDepartment(conn, name) {
  const res = await conn.query(addNewDepartment, name);
  console.log(`
      ${name} added!
      `);
  return res;
}

module.exports = { addEmployee, addRole, addDepartment };
