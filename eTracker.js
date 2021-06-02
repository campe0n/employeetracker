const mysql = require('mysql');
const inquirer = require('inquirer')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employeeDB',
});

const promptUser = () => {
    inquirer.prompt({
        type: 'list',
        message: `What would you like to do?`,
        name: 'list',
        choices: [
            'Add a department',
            'Add a role',
            'Add an employee' ,
            'View departments',
            'View roles', 
            'View employees',
            'Update employee roles',
        ]})
        .then((answer) => {
          // based on their answer, either call the bid or the post functions
          if (answer.list === 'Add a department') {
            addDepartment();
          } else if (answer.list === 'BID') {
            bidAuction();
          } else {
            connection.end();
          }
        });
    };

    const addDepartment = () => {
        inquirer
          .prompt([
            {
              name: 'department',
              type: 'input',
              message: 'What is the name of the department you want to add?',
            }
          ])
          .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
              'INSERT INTO department SET ?',
              // QUESTION: What does the || 0 do?
              {
                name: answer.department,
              },
              (err) => {
                if (err) throw err;
                console.log('Your auction was created successfully!');
                promptUser();
              }
            );
          });
      };

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  promptUser();
});
