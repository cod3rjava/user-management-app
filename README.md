# USER MANAGEMENT APPLICATION

Welcome to the React App! This README provides all the necessary information to get started with the project.

##  Live URL

Access the application directly at:
http://3.110.194.124:3000/

##  Installation

To install the project dependencies, run the following command:
```bash
npm install --force
```

The --force flag is used to ensure all dependencies are installed, even if there are conflicts.


##  Running Test Cases
To execute the test cases, use the following command:

```bash
npm test

OUTPUT: 
 PASS  src/services/api.test.tsx
 PASS  src/components/pagination/Pagination.test.tsx
 PASS  src/components/userTableUi/UserTable.test.tsx

Test Suites: 3 passed, 3 total
Tests:       18 passed, 18 total
Snapshots:   0 total
Time:        7.763 s
Ran all test suites related to changed files.
```

This will run all the available test cases in the project.

##  Running with Docker

To pull the Docker image and run the application locally, follow these steps:

-   Pull the Docker image:

>   docker pull cod3rjava/user-management-app

-   Run the Docker container:

>   docker run -p 3000:3000 cod3rjava/user-management-app

Access the application at http://localhost:3000/

