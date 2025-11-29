import {expect} from 'chai'
import request from '../config/common.js'
import 'dotenv/config';

describe('Users',()=>{
   const user_token = process.env.TOKEN
   let created_id
    it('GET /users',()=>{

        return request
                 .get(`users?access-token=${user_token}`)
                 .then((res)=>{

                   // console.log(err)
                   // console.log(res.body)
                    expect(res.body).to.not.be.empty
                    //expect(res.body.length).to.be(9)
                    expect(res.statusCode).to.eql(200)
                    
                 })

       
    });

   


        it('Get /users with query params',()=>{
            let i=1
       const url = `users?access-token=${user_token}&page=5&gender=female&status=active`
        return request
                 .get(url).then((res)=>{

                    console.log(res.body)
                    res.body.forEach((data)=> {
                        console.log(i++)
                        console.log("Status is :", data.status)
                        expect(data.gender).to.eq('female')
                        expect(data.status).to.eq('active')
                        
                    })
                 })
                 

    })


 it('Get /users with query params _Chat GPT', async () => {
  const url = `users?access-token=${user_token}&page=5&gender=female&status=inactive`;

  const res = await request.get(url);

  let i = 1;

  res.body.forEach((data) => {
    console.log(i++);
    console.log("Status is:", data.status);

    expect(data.gender).to.eq('female');
    expect(data.status).to.eq('inactive');
  });
});




it('POST /users',()=>{
  const data = 
  {
    "email": `test-${Math.floor(Math.random()*9999)}@test.com`,
    "name" : "Deepti Srivastava",
     "gender":"female",
    "status":"active"
  }
    return request.post('users')
                  .set('Authorization',`Bearer ${user_token}`)
                  .send(data)
                  .then((res)=>{
                                   expect(res.body).to.deep.include(data)
                                   expect(res.body).to.have.property('id');
                                   created_id = res.body.id
                                   console.log("Created ID is : -===>", created_id)
                  })
})

 it('Get /users/id',()=>{
       
       return request
                 .get(`users/${created_id}?access-token=${user_token}`)
                 .then((res)=>{

                    //console.log(err)
                    //console.log(res.body)
                    expect(res.body).to.not.be.empty
                    //expect(res.body.length).to.be(9)
                    expect(res.statusCode).to.eql(200)
                    expect(res.body.id).to.be.eq(created_id)
                 })

    })


it('PUT /users/id',()=>{
 const data_updated = 
  {
  
  "name": `Bharat${Math.floor(Math.random()*9999)}`,
  "email": "bhramar_singh@predovic.example-updated-2",
  "gender": "female",
  "status": "inactive"
}
      return request.put(`users/${created_id}`)
                  .set('Authorization',`Bearer ${user_token}`)
                  .send(data_updated)
                  .then((res)=>{
                                   expect(res.body).to.deep.include(data_updated)
                                   expect(res.body).to.have.property('id');
                                   
    })

    
})


   it('DELETE /users',()=>{
          const expected_body ={}
         return request.delete(`users/${created_id}`)
                  .set('Authorization',`Bearer ${user_token}`)
                  .then((res)=>{   console.log(res.body)
                                   expect(res.status).to.be.eq(204)
                                   expect(res.body).to.deep.include(expected_body)
                                        
    });
})
})