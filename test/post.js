import { expect } from 'chai'
import { createRandomUserwithFaker } from '../helper/user_helper.js'
import request from '../config/common.js'
import { faker } from '@faker-js/faker';
import 'dotenv/config';


const user_token = process.env.TOKEN

describe('User Posts', () => {
    let post_id,created_id,createdUserName
    
    before('Created a new User for the test function',async ()=>{
       const createdUserData =await createRandomUserwithFaker()
       created_id = createdUserData.id
       createdUserName= createdUserData.name
       console.log( created_id,createdUserName)
    })

    it('/posts', async () => {

        const data = {
            "user": createdUserName,
            "user_id": created_id,
            "title": faker.lorem.sentence(),
            "body": faker.lorem.paragraph()
        }

        const res = await request.post('posts')
            .set('Authorization', `Bearer ${user_token}`)
            .send(data);

            console.log("Response in /posts :=====",res)

        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('user_id');
        //expect(res.body.user_id).to.have.property(data.user_id);



        expect(res.body.title).to.eq(data.title);
        expect(res.body.user_id).to.eq(data.user_id);

        post_id = res.body.id
        console.log("Created POST ID is : -===>", post_id, res.body.user_id)

    })

it('GET /posts/:id',async()=>{

         const res = await request.get(`posts/${post_id}`)
            .set('Authorization', `Bearer ${user_token}`)
            .expect(200);       

})



describe('Negative Tests', ()=>{

    it('401 Authentication Failed',async()=>{
   
         const data = {
            "user": createdUserName,
            "user_id": created_id,
            "title": `This title is created by ${createdUserName}`,
            "body": `This body belongs to ${createdUserName} having ID ${created_id}`
        }

        const res = await request.post('posts')
            //.set('Authorization', `Bearer ${user_token}}`)
            .send(data)
            .expect(401)
        expect(res.body.message).to.eq('Authentication failed')
        

    })


    
it('422 Validation Failed',async()=>{
   
         const data = {
            "user": createdUserName,
            "user_id": created_id,
         }

        const res = await request.post('posts')
            .set('Authorization', `Bearer ${user_token}`)
            .send(data)
            .expect(422)
        console.log(res.body)
        expect(res.body[0].message).to.eq("can't be blank")
        expect(res.body[1].message).to.eq("can't be blank")
        expect(res.body[0].field).to.eq("title")
        expect(res.body[1].field).to.eq("body")
        expect(res.body).to.not.eq({})
        

    })
})



})
