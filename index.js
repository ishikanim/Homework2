/*
* Custom Codehooks Example
* Install: npm install codehooks-js codehooks-crudlify
*/
import { appInstance } from 'codehooks-js';
import { crudify } from 'codehooks-crudlify';
import { object, number, string, boolean } from 'yup';

const taskSchema = object({
  taskId: number().positive().integer(),
  taskDescription: string().required(),
  userId: string().required(),
  completed: boolean().required()
});

// Test route for https://<PROJECTID>.api.codehooks.io/dev/
appInstance.get('/', (request, response) => {
  response.send('Custom CRUD server is up and running');
});

// Use Crudify to create a REST API for any collection
crudify(appInstance, { tasks: taskSchema });

// Bind to serverless runtime
export default appInstance.initialize();

