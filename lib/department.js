const { selectEmployeesByDept } = require("./queries.js");
const { makeTable } = require("./tables.js");

/* === makeDepartmentTable ===
Pass in a department name and outputs a table of its employees
=== makeDepartmentTable ===*/
async function makeDepartmentTable(conn, department) {
  employees = await conn.query(selectEmployeesByDept, department);
  console.log(`
==== ${department} ====`);
  makeTable(employees[0]);
}

module.exports = { makeDepartmentTable };
