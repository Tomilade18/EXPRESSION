import express, { response } from "express"

const app = express();

const PORT = process.env.PORT || 3000;

const mockUser = [
        {id: 1,  userName: "anson", displayname:"Anson" },
        {id: 2,  userName: "jack", displayname:"Jack" },
        {id: 3,  userName: "adam", displayname:"Adam" },
    ];

app.get("/",(request, response) => {
    response.status(201).send({msg: "Hello world"});
});

app.get("/api/users", (request, response) => {
    response.send(mockUser)
    const parseId = parseInt(request.params.id);
    if (isNaN(parseId)) return response.status(400).send({msg: "Bad Request. Invalid ID."});

    const findUser = mockUser.find((user) => user.id === parseId);
    if(!findUser) return response.sendStatus(404);

});
app.get("/api/products", (request, response) => {
    response.send([{id: 123, name: "chicken breast", price: 12.99}])
})

app.get('/api/users/:id', (request, response) => {
    console.log(request.params)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});