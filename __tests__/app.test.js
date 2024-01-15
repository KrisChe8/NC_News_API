const request = require('supertest');
const app = require('../app');

const db = require('../db/connection');
const seed = require('../db/seeds/seed');

const {articleData, commentData, topicData, userData } = require('../db/data/test-data/index')

beforeEach(()=>{
    return seed({topicData, userData, articleData, commentData })
})
afterAll(() => {db.end()});

describe('app', ()=>{
    describe('api', ()=>{
        describe('GET /api/topics', ()=>{
            test('statuscode 200', ()=>{
                return request(app).get('/api/topics').expect(200);
            })
            test('should return an array of topic objects', ()=>{
                return request(app).get('/api/topics')
                .then(({body})=>{
                    const {topics} = body;
                    expect(Array.isArray(topics)).toBe(true);
                    topics.forEach((topic)=>{
                        expect(typeof topic.slug).toBe('string');
                        expect(typeof topic.description).toBe('string');
                    }) 
                })
            })
        })
    })
})