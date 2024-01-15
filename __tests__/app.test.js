const request = require('supertest');
const app = require('../app');

const db = require('../db/connection');
const seed = require('../db/seeds/seed');

const {articleData, commentData, topicData, userData } = require('../db/data/test-data/index')

beforeEach(()=>{
    return seed({topicData, userData, articleData, commentData })
})
afterAll(() => {db.end()});


describe('api', ()=>{
    describe('GET /api/topics', ()=>{
        test('should return statuscode 200 and  an array of topic objects', ()=>{
            return request(app).get('/api/topics')
            .expect(200)
            .then(({body})=>{
                const {topics} = body;
                expect(topics).not.toHaveLength(0);
                topics.forEach((topic)=>{
                    expect(typeof topic.slug).toBe('string');
                    expect(typeof topic.description).toBe('string');
                }) 
            })
        })
    })
    describe('GET /api', ()=>{
        test('should return statusCode 200 and  object describing all the available endpoints on API', ()=>{
            return request(app).get('/api')
            . expect(200)
            .then(({body})=>{
                const {instructions} = body;
                for(let key in instructions){
                        expect(instructions[key].hasOwnProperty("description")).toBe(true);
                        expect(instructions[key].hasOwnProperty("queries")).toBe(true);
                        expect(instructions[key].hasOwnProperty("exampleResponse")).toBe(true);
                } 
            })
        })
    })
})
