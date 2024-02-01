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

const selectDept = `
SELECT
  id As Id,
  name As Name
FROM
  department`;

const selectIdByEmpName = `
SELECT id
FROM employee
WHERE CONCAT(first_name, ' ', last_name) = ?;`;

const selectIdByRole = `
SELECT id
FROM role
WHERE title = ?;`;

const selectIdByDept = `
SELECT id
FROM department
WHERE name = ?;`;

const addNewEmployee = `
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?);`;

const addNewRole = `
INSERT INTO role (title, salary, department_id)
VALUES (?, ?, ?);`;

const addNewDepartment = `
INSERT INTO department (name)
VALUES (?);`;

const updateRole = `
UPDATE employee
SET role_id = ?
WHERE CONCAT(first_name, ' ', last_name) = ?;`

module.exports = {
  selectEmployees,
  selectRoles,
  selectDept,
  selectIdByEmpName,
  selectIdByRole,
  selectIdByDept,
  addNewEmployee,
  addNewRole,
  addNewDepartment,
  updateRole
};
