/* === selectEmployees ===
SQL query that returns the full list of employees with role and manager names
=== selectEmployees ===*/
const selectEmployees = `
SELECT
  e.id As Id,
  e.first_name AS First,
  e.last_name AS Last,
  r.salary As Salary,
  r.title AS Role,
  d.name AS Dept,
  CONCAT(m.first_name, ' ', m.last_name) AS Manager
FROM
  employee e
JOIN
  role r ON e.role_id = r.id
LEFT JOIN
  employee m ON e.manager_id = m.id
JOIN
  department d ON r.department_id = d.id
ORDER BY e.id`;

/* === selectEmployeesByMgr ===
SQL query that returns the list of employees by manager name
=== selectEmployeesByMgr ===*/
const selectEmployeesByMgr = `
SELECT
  e.id As Id,
  e.first_name AS First,
  e.last_name AS Last,
  r.salary As Salary,
  r.title AS Role,
  d.name AS Dept
FROM
  employee e
JOIN
  role r ON e.role_id = r.id
LEFT JOIN
  employee m ON e.manager_id = m.id
JOIN
  department d ON r.department_id = d.id
WHERE CONCAT(m.first_name, ' ', m.last_name) = ?
ORDER BY e.id`;

/* === selectManagers ===
SQL query that returns the list of alphabetical manager names
=== selectManagers ===*/
const selectManagers = `
SELECT DISTINCT CONCAT(m.first_name, ' ', m.last_name) As manager_name
FROM employee e
LEFT JOIN
  employee m ON e.manager_id = m.id
WHERE e.manager_id IS NOT NULL
ORDER BY manager_name`;

/* === selectEmployeesByDept ===
SQL query that returns the list of employees by department name
=== selectEmployeesByDept ===*/
const selectEmployeesByDept = `
SELECT
  e.id As Id,
  e.first_name AS First,
  e.last_name AS Last,
  r.salary As Salary,
  r.title AS Role,
  CONCAT(m.first_name, ' ', m.last_name) As Manager
FROM
  employee e
JOIN
  role r ON e.role_id = r.id
LEFT JOIN
  employee m ON e.manager_id = m.id
JOIN
  department d ON r.department_id = d.id
WHERE d.name = ?
ORDER BY e.id`;

/* === selectRoles ===
SQL query that returns the full list of roles with department names
=== selectRoles ===*/
const selectRoles = `
SELECT
  r.id as Id,
  r.title As Title,
  r.salary As Salary,
  d.name As Dept
FROM
  role r
JOIN
  department d ON r.department_id = d.id
  ORDER BY r.id`;

/* === selectDept ===
SQL query that returns the full list of departments
=== selectDept ===*/
const selectDept = `
SELECT
  id As Id,
  name As Name
FROM
  department`;

/* === const selectIdByEmpName ===
SQL query that returns the an employee id when passed in their full name
=== const selectIdByEmpName ===*/
const selectIdByEmpName = `
SELECT id
FROM employee
WHERE CONCAT(first_name, ' ', last_name) = ?;`;

/* === selectIdByRole ===
SQL query that returns the role id when passed in the role title
=== selectIdByRole ===*/
const selectIdByRole = `
SELECT id
FROM role
WHERE title = ?;`;

/* === selectIdByDept ===
SQL query that returns the department id when passed in the department name
=== selectIdByDept ===*/
const selectIdByDept = `
SELECT id
FROM department
WHERE name = ?;`;

/* === addNewEmployee ===
SQL query that adds a new employee
=== addNewEmployee ===*/
const addNewEmployee = `
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?);`;

/* === addNewRole ===
SQL query that adds a new role
=== addNewRole ===*/
const addNewRole = `
INSERT INTO role (title, salary, department_id)
VALUES (?, ?, ?);`;

/* === addNewDepartment ===
SQL query that adds a new department
=== addNewDepartment ===*/
const addNewDepartment = `
INSERT INTO department (name)
VALUES (?);`;

/* === updateRole ===
SQL query that updates the role id of an employee when passed in their full name
=== updateRole ===*/
const updateRole = `
UPDATE employee
SET role_id = ?
WHERE CONCAT(first_name, ' ', last_name) = ?;`;

/* === updateManager ===
SQL query that updates the manager id of an employee when passed in their full name
=== updateManager ===*/
const updateManager = `
UPDATE employee
SET manager_id = ?
WHERE CONCAT(first_name, ' ', last_name) = ?;`;

module.exports = {
  selectEmployees,
  selectEmployeesByMgr,
  selectManagers,
  selectEmployeesByDept,
  selectRoles,
  selectDept,
  selectIdByEmpName,
  selectIdByRole,
  selectIdByDept,
  addNewEmployee,
  addNewRole,
  addNewDepartment,
  updateRole,
  updateManager,
};
