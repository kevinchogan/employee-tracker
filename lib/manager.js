const { selectEmployeesByMgr } = require("./queries.js");
const { makeTable } = require("./tables.js");

/* === makeManagerTable ===
Pass in a manager name and outputs a table of their employees
=== makeManagerTable ===*/
async function makeManagerTable(conn, manager) {
  employees = await conn.query(selectEmployeesByMgr, manager);
  console.log(`
==== ${manager} ====`);
  makeTable(employees[0]);
}

module.exports = { makeManagerTable };
