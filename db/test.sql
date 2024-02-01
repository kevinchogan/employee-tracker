UPDATE employee
SET role_id = 6
WHERE CONCAT(first_name, ' ', last_name) = "John Matuszak";