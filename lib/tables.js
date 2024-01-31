const employeeTable = (employees) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  console.log(
    "Id  First Name  Last Name    Title                Department     Salary     Manager"
  );
  console.log(
    "--  ----------  -----------  -------------------  -------------  ---------  -----------------"
  );
  employees.map((emp) => {
    let manager;
    if (emp.Manager) {
      manager = emp.Manager;
    } else {
      manager = "";
    }

    const salary = formatter.format(emp.Salary);

    let empString = emp.Id.toString().padEnd(4, " ");
    empString += emp.First.padEnd(12, " ");
    empString += emp.Last.padEnd(13, " ");
    empString += emp.Role.padEnd(21, " ");
    empString += emp.Dept.padEnd(15, " ");
    empString += salary.toString().padEnd(11, " ");
    empString += manager;
    console.log(empString);
  });
};

const roleTable = (roles) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  console.log("Id  Title              Salary       Department");
  console.log("--  -----------------  -----------  ------------- ");
  roles.map((role) => {
    const salary = formatter.format(role.Salary);

    let roleString = role.Id.toString().padEnd(4, " ");
    roleString += role.Title.padEnd(19, " ");
    roleString += salary.toString().padEnd(13, " ");
    roleString += role.Dept;
    console.log(roleString);
  });
};

const deptTable = (departments) => {

  
    console.log("Id  Department");
    console.log("--  -----------------");
    departments.map((dept) => {
      let deptString = dept.Id.toString().padEnd(4, " ");
      deptString += dept.Name;
      console.log(deptString);
    });
  };

module.exports = { employeeTable, roleTable, deptTable };
