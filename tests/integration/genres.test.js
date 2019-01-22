const {Genre}=require('../../models/genre');
const request=require('supertest');
let server;

describe('/api/genres',()=>{
    
    beforeEach(() =>{server=require('../../index'); });
    afterEach(() =>{server.close();});
   // server=require('../../index');
    describe('GET /', ()=>{
        test('should return all genres', async ()=>{
            await Genre.collection.insertMany([
                {name:'genre1'},
                {name:'genre2'},
            ])
            const res=await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g=>g.name==='genre1')).toBeTruthy();
            expect(res.body.some(g=>g.name==='genre2')).toBeTruthy();
        });
    });

    describe('GET /:id', ()=>{
        test('should return genre with the id', async ()=>{
            const genre=new Genre({name:'genre1'});
            await genre.save();
            const res=await request(server).get('/api/genres'+genre._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name',genre.name);
           
        });

        test('should return 404 if invalid ID is passed', async ()=>{
           
            const res=await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);
            
           
        });
    });

});