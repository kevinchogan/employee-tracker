const {
    selectEmployees,
    selectRoles,
    selectDept,
  } = require("./queries.js");

async function updateRoleArray(conn, questions, index) {
    const roleData = await conn.query(selectRoles);
    roleArray = roleData[0].map(role => role.Title);
    questions[index].choices = roleArray;
    return questions;
}

async function updateEmployeeArray(conn, questions, index, isManager) {
    const empData = await conn.query(selectEmployees);
    empArray = empData[0].map(emp => `${emp.First} ${emp.Last}`);
    if (isManager) {
        empArray.unshift("None");
    }
    questions[index].choices = empArray;
    return questions;
}

async function updateDeptArray(conn, questions, index) {
    const deptData = await conn.query(selectDept);
    deptArray = deptData[0].map(dept => dept.Name);
    questions[index].choices = deptArray;
    return questions;
}


module.exports = { updateRoleArray, updateEmployeeArray, updateDeptArray };