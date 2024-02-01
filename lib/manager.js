const { selectEmployeesByMgr } = require("./queries.js");
const { makeTable } = require("./tables.js");

/* === makeManagerTables ===
Pass in a manager name and outputs a table of their employees
=== makeManagerTables ===*/
async function makeManagerTables(conn, manager) {
  employees = await conn.query(selectEmployeesByMgr, manager);
  console.log(`
==== ${manager} ====`);
  makeTable(employees[0]);
}

module.exports = { makeManagerTables };
