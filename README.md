# Batch Editing Service

The service has a single endpoint (POST “/batch”). It is implemented with a simple Express (NodeJS) app. (The `express-generator` generator was used to generate simple app).

This endpoint (POST “/batch”) receives an action to perform, as well as an array of payloads, describing the payload to be sent in each invocation of the action.

Request example:

```json
{
   "endpoint": {
      "verb": "PUT",
      "url": "https://guesty-user-service.herokuapp.com/user/{userId}"
   },
   "payloads": [
      {
         "parameters": {
            "userId": ja2S-hs81-ksn3-iQI9
         },
         "requestBody": {
            "age": 30
         }
      },
      {
         "parameters": {
            "userId": 2
         },
         "requestBody": {
            "age": 45
         }
      }
   ]
}
```

Response example:

```json
[
    {
        "url": "https://guesty-user-service.herokuapp.com/user/1",
        "verb": "PUT",
        "status": 200,
        "responseBody": {
            "id": "ja2S-hs81-ksn3-iQI9",
            "name": "Jon Snow",
            "email": "jon@wall.com",
            "age": 30
        }
    },
    {
        "url": "https://guesty-user-service.herokuapp.com/user/2",
        "verb": "PUT",
        "status": 503,
        "requestBody": {
            "age": 45
        }
    }
]
```

Also the `requestBody` could be defined in the request object and consists common fields. It will be merged with each `requestBody` within payloads.

Some of the calls may fail. In such cases, the Batch Editing service retries calling the function again (only perform 1 retry). If the service failed twice, the response indicates this invocation has failed.

All existing services have Rate Limits. The new Batch Editing service takes it into consideration when invoking multiple calls to the same service. Rate Limit is set to 5 calls per 10 seconds. It could be changed in `config`.

**Setup**

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start server on port 3000.
4. Make a POST request to `http://localhost:3000/batch` with a payload similar to the foregoing example.