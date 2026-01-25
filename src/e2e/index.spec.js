import request from "supertest";
import express from "express";

const app = express();

app.get("/hello", (req, res) => res.sendStatus(200));

describe('hello endpoint', () => {
    it ("get /hello end expect 200", () => {
        request(app).get("/hello").expect(200);
        expect(response)
    })
})