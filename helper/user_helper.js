import supertest from 'supertest'
import { faker } from '@faker-js/faker';

const request = supertest('https://gorest.co.in/public/v2/')
const TOKEN = 'c8e4bcfc7d8b7559c74e6addd51a7a0945ff6b13acf96ac28674016ba4a50333'
let created_id, createdUserName
export const createRandomUserwithFaker = async() => {

        const data = 
       {
        "email": faker.internet.email(),
        "name" : faker.person.fullName(),
         "gender": faker.person.sex().toLowerCase(),
        "status":"active"
        }
        const res = await  request.post('users')
                      .set('Authorization',`Bearer ${TOKEN}`)
                      .send(data)
       created_id = res.body.id
       createdUserName= res.body.name  
      console.log('=====================================bResponse in CreateRandomUser  ',res.body)
       return {
        id: created_id,
        name: createdUserName
        
       }    
    }