import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const request = require("supertest")
const LOCALHOST = "http://localhost:4000"

describe('Login tests',() => {
  it('Check login fails user', async() => {
    const wrongUser = { user: "test3", pass:"123" }
    const wrongPass = { user: "test", pass:"123345" }
    const res = await request(LOCALHOST)
    .get('/login').query(wrongUser).expect(201)
    expect(res.body.data).toBe("No username found")
  });
  it('Check login success', async() => {
    const expectedUser = {
      id: "1",
      user: "test",
      pass:"12345678",
      name:"Erel Biran"
    }
    const successUser = { user: "test", pass:"12345678" }
    const res = await request(LOCALHOST)
    .get('/login').query(successUser).expect(200)
    expect(res.body.data).toEqual(expectedUser)
  });
})

describe('Test get one by isbn',() => {
  it('get one single book', async() => {
    const wrongUser = { user: "test3", pass:"123" }
    const wrongPass = { user: "test", pass:"123345" }
    const res = await request(LOCALHOST)
    .get('/login').query(wrongUser).expect(201)
    expect(res.body.data).toBe("No username found")
  });
})
