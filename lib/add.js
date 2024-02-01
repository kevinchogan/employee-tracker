const {
  addNewEmployee,
  addNewRole,
  addNewDepartment,
} = require("./queries.js");

async function addEmployee(conn, first_name, last_name, role_id, manager_id) {
  let res;
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
  console.log(`${first_name} ${last_name} added!`)
  return res;
}

async function addRole(conn, title, salary, department_id) {
  const res = await conn.query(addNewRole, [title, salary, department_id]);
  console.log(`${title} added!`)
  return res;
}

async function addDepartment(conn, name) {
    const res = await conn.query(addNewDepartment, name);
    console.log(res);
    console.log(`${name} added!`)
    return res;
  }

module.exports = { addEmployee, addRole, addDepartment };
