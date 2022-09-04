import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const request = require("supertest")
const LOCALHOST = "http://localhost:4000"

describe('Login tests',() => {
  it('Check login fails user', async() => {
    const wrongUser = { user: "test3", pass:"123" }
    const res = await request(LOCALHOST)
    .get('/login').query(wrongUser).expect(201)
    expect(res.body.data).toBe("No username found")
  });
  it('Check login fails password', async() => {
    const wrongPass = { user: "admin", pass:"123345" }
    const res = await request(LOCALHOST)
    .get('/login').query(wrongPass).expect(201)
    expect(res.body.data).toBe("Password does not match")
  });
  it('Check login success', async() => {
    const expectedUser = {
      id: "2",
      user: "admin",
      pass:"admin",
      name:"Admin"
    }
    const successUser = { user: "admin", pass:"admin" }
    const res = await request(LOCALHOST)
    .get('/login').query(successUser).expect(200)
    expect(res.body.data).toEqual(expectedUser)
  });
})

describe('Test get one by isbn',() => {
  it('get one single book', async() => {
    const isbn = "1933988673"
    const res = await request(LOCALHOST)
    .get('/get_one_by_isbn').query({isbn}).expect(200)
    expect(res.body.data.title).toBe("Unlocking Android")
  });
  it('wrong isbn test', async() => {
    const isbn = "2"
    const res = await request(LOCALHOST)
    .get('/get_one_by_isbn').query({isbn}).expect(201)
    expect(res.body.data).toBe("Nothing is found!")
  });
})

describe('Test search',() => {
  it('existing title', async() => {
    const title = "Unlocking Android"
    const res = await request(LOCALHOST)
    .get('/search').query({search: title, filter: {}, skip: 0})
    console.log(res.body)
    expect(res.body.data[0].title).toBe("Unlocking Android")
  });
  it('wrong title', async() => {
    const wrongTitle = "aaaa"
    const res = await request(LOCALHOST)
    .get('/search').query({search: wrongTitle, filter: {}, skip: 0})
    console.log(res.body)
    expect(res.body.data?.length).toBe(0)
  });
})