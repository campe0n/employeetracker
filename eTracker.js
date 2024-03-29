const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3001,
  user: "root",
  password: "password",
  database: "employeeDB",
});

const promptUser = () => {
  inquirer
    .prompt({
      type: "list",
      message: `What would you like to do?`,
      name: "list",
      choices: [
        "Add a department",
        "Add a role",
        "Add an employee",
        "View departments",
        "View roles",
        "View employee's",
        "Update employee roles",
        "Exit",
      ],
    })
    .then((answer) => {
      // based on their answer, either call the bid or the post functions
      if (answer.list === "Add a department") {
        addDepartment();
      } else if (answer.list === "Add a role") {
        addRole();
      } else if (answer.list === "Add an employee") {
        addEmployee();
      } else if (answer.list === "View departments") {
        viewDepartments();
      } else if (answer.list === "View roles") {
        viewRoles();
      } else if (answer.list === "View employee's") {
        viewEmployees();
      } else if (answer.list === "Update employee roles") {
        updateRoles();
      } else {
        connection.end();
      }
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department you want to add?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.department,
        },
        (err) => {
          if (err) throw err;
          console.log("Department was added succesfully!");
          promptUser();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        name: "role",
        type: "input",
        message: "What is the name of the role you want to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of this role?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.role,
          salary: answer.salary,
        },
        (err) => {
          if (err) throw err;
          console.log("Role was added succesfully!");
          promptUser();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "fName",
        type: "input",
        message: "What is the fist name of the employee?",
      },
      {
        name: "lName",
        type: "input",
        message: "What is the last name of the employee?",
      },
      {
        name: "roleid",
        type: "input",
        message: "What is the role id of the employee?",
      },
      {
        name: "managerid",
        type: "input",
        message: "What is the id of the employee's manager?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.fName,
          last_name: answer.lName,
          role_id: answer.roleid,
          manager_id: answer.managerid,
        },
        (err) => {
          if (err) throw err;
          console.log("Employee was added succesfully!");
          promptUser();
        }
      );
    });
};

const viewDepartments = () => {
  console.log("Showing all departments...\n");
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    promptUser();
  });
};

const viewRoles = () => {
  console.log("Showing all roles...\n");
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    promptUser();
  });
};

const viewEmployees = () => {
  console.log("Showing all employee's...\n");
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    promptUser();
  });
};

const updateRoles = () => {
  connection.query(
    "select r.id,r.title,e.id,e.first_name,e.last_name, e.role_id from role as r Inner JOIN  employee as e on r.id = e.role_id order by r.id",
    (err, results) => {
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            message:
              "Which employee would you like to have their role updated?",
            choices() {
              var choiceArray = [];
              results.forEach(({ first_name }) => {
                choiceArray.push(first_name);
              });
              return choiceArray;
            },
          },
          {
            name: "newRole",
            type: "rawlist",
            message: "What job would you like to change to?",
            choices() {
              var numberArray = [];
              results.forEach(({ id }) => {
                numberArray.push(id);
              });
              console.log(numberArray);
              return numberArray;
            },
          },
        ])
        .then((answer) => {
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                role_id: answer.newRole,
              },
              {
                id: answer.choice,
              },
            ],
            (error) => {
              if (error) throw err;
              console.log("Employee role updated successfully!");
              promptUser();
            }
          );
        });
    }
  );
};

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  promptUser();
});
