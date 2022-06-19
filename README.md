# big-friendship-api-expressjs
test backend dev benua integrasi global a/n septian

# API ENDPOINT TESTER================================================

Note : heroku free mode (kadang delay time dan time out saat coba endpoint), harap bisa dicoba lagi saat timeout, terima kasih

| Method        | Endpoint                                                         | Description                | Authorization | Body (JSON                                                                                                   |
| ------------- |:----------------------------------------------------------------:| --------------------------:| -------------:|-------------------------------------------------------------------------------------------------------------:|
| POST          | https://big-friendship-api-expressjs.herokuapp.com/users         | User register              |               |{"username" : "","fullname" : "","gender" : "","email" : "","phone" : "","password" : "","confPassword" : ""} |
| POST          | https://big-friendship-api-expressjs.herokuapp.com/login         | User login (get token JWT) |               |{"username" : "", password" : ""}                                                                             |
| GET           | https://big-friendship-api-expressjs.herokuapp.com/users         | User read all user         | Bearer Token  |                                                                                                              |
| GET           | https://big-friendship-api-expressjs.herokuapp.com/users/:id     | User read by param id user | Bearer Token  |                                                                                                              |
| GET           | https://big-friendship-api-expressjs.herokuapp.com/token         | User refresh token JWT     | Bearer Token  |                                                                                                              |
| PUT           | https://big-friendship-api-expressjs.herokuapp.com/users/:id     | User update by param id    | Bearer Token  |{"username" : "","fullname" : "","gender" : "","email" : "","phone" : ""}                                     |
| DELETE        | https://big-friendship-api-expressjs.herokuapp.com/users         | User delete by body id     | Bearer Token  |{"id" : }                                                                                                     |
| DELETE        | https://big-friendship-api-expressjs.herokuapp.com/logout        | User logout                | Bearer Token  |                                                                                                              |
| POST          | https://big-friendship-api-expressjs.herokuapp.com/requests      | Request create             | Bearer Token  |{"idUserReqFromId" : , "idUserReqToId" : , "status" : ""}                                                     |
| GET           | https://big-friendship-api-expressjs.herokuapp.com/requests      | Request read all request   | Bearer Token  |                                                                                                              |
| GET           | https://big-friendship-api-expressjs.herokuapp.com/requests/:id  | Request read by param id   | Bearer Token  |                                                                                                              |
| PUT           | https://big-friendship-api-expressjs.herokuapp.com/requests/:id  | Request update by param id | Bearer Token  |{"status" : ""}                                                                                               |
| DELETE        | https://big-friendship-api-expressjs.herokuapp.com/requests      | Request delete by body id  | Bearer Token  |{"id" : }                                                                                                     |
| POST          | https://big-friendship-api-expressjs.herokuapp.com/statuss       | Status accept/reject create| Bearer Token  |{"idRequestId" : , "status" : ""}                                                                             |
| GET           | https://big-friendship-api-expressjs.herokuapp.com/statuss       | Status read all status     | Bearer Token  |                                                                                                              |
| GET           | https://big-friendship-api-expressjs.herokuapp.com/statuss/:id   | Status read by param id    | Bearer Token  |                                                                                                              |
| PUT           | https://big-friendship-api-expressjs.herokuapp.com/statuss/:id   | Status update by param id  | Bearer Token  |{"status" : ""}                                                                                               |
| DELETE        | https://big-friendship-api-expressjs.herokuapp.com/statuss       | Status delete by body id   | Bearer Token  |{"id" : }                                                                                                     |
