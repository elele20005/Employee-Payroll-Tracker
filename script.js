// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function() {
  let employees = [];
  let continueAdding = true;

  while (continueAdding) {
    // Get first name
    let firstName = prompt("Enter first name:");
    if (!firstName) break;

    // Get last name
    let lastName = prompt("Enter last name:");
    if (!lastName) break;

    // Get salary
    let salary = parseFloat(prompt("Enter salary (numeric):"));
    if (isNaN(salary)) {
      salary = 0; // Default to $0 if salary is not a valid number
    }

    // Create employee object and add to array
    employees.push({
      firstName: firstName,
      lastName: lastName,
      salary: salary
    });

    // Ask if the user wants to add another employee
    continueAdding = confirm("Would you like to add another employee?");
  }

  return employees;
};

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  if (employeesArray.length === 0) return; // Avoid division by zero

  // Calculate the total salary
  let totalSalary = employeesArray.reduce((total, employee) => total + employee.salary, 0);
  
  // Calculate the average salary
  let averageSalary = totalSalary / employeesArray.length;

  // Log the average salary with two decimal places
  console.log(`The average employee salary between our ${employeesArray.length} employee(s) is $${averageSalary.toFixed(2)}`);
};

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  if (employeesArray.length === 0) return; // Avoid random selection from empty array

  // Generate a random index between 0 and employeesArray.length - 1
  const randomIndex = Math.floor(Math.random() * employeesArray.length);

  // Get the random employee
  const randomEmployee = employeesArray[randomIndex];

  // Log the random employee's name
  console.log(`Congratulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winner!`);
};

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
