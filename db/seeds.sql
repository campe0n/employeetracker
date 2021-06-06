INSERT INTO department (name)
VALUES ("Legal & Finance"), ("Development");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 120000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 200000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 300000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sofware Developer", 150000, 2);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Kanye","West", 1, null);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Peter","Griffin", 2, null);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Andrew","Garfield", 3, null);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Toby","Maguire", 4, null);