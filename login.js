document.querySelector("#img").addEventListener("click", function(){
    window.location.href = "index.html"
})

class user{

   constructor(){
    // this.name = n;
   }
//    checkUserName(username){
//        //we dont want username to include 
//     return username.includes("#") ? false : true
    
//    }
//    checkPassword(password){
//     let passValue = password.length > 8 ? true : false
//     return passValue
//    }
   async signup(n,e,u,p,m,d){
    
    // let isvalidated = this.checkUserName(u) && this.checkPassword(p)
        this.name = n;
        this.email = e;
        this.username =u;
        this.password = p;
        this.mobile = m;
        this.description = d;

        let actual_data = JSON.stringify(this)

        try{
            let res = await fetch(`https://masai-api-mocker.herokuapp.com/auth/register`,{
                method: 'POST',
                body : actual_data,
                headers:{
                    'content-Type': 'application/json'
                }
            });

            let data = await res.json()
            console.log(data)
            alert("Account created successfully")
        } catch(error){
            console.log("error")
        
    }
   }
   async login(u,p){
        this.username = u;
        this.password = p;
        let data = JSON.stringify(this)

        try{
            let res = await fetch(`https://masai-api-mocker.herokuapp.com/auth/login`,{
                method: 'POST',
                body : data,
                headers:{
                    'content-Type' : 'application/json'
                }
            })
            let loginData =  res.json()
            console.log(loginData)
            alert("login successfull")
        } catch (err){
            console.log(err)
        }
   }
}
let u1 = new user();


function getInputValue(id){
    let value = document.getElementById(id).value
    return value
}

function register(){
    const name = getInputValue("name").value;
    const email = getInputValue("email").value;
    const username = getInputValue("username").value;
    const password = getInputValue("password").value;
    const mobile = getInputValue("mobile").value;
    const description = getInputValue("description").value;

     u1.signup(name,email,username,password,mobile,description)
}

function loginnow(){
    const username = getInputValue("login_username").value;
    const password = getInputValue("login_password").value;

    u1.login(username,password)
}