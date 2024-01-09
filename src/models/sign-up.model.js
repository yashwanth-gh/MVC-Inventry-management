export default class SignUpModel{
    constructor(id,fullname,email,password){
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.password = password;
    }

    static add(fullname,email,password){
        const newUser = new SignUpModel(users.length+1,fullname,email,password);
        // console.log(newUser);
        users.push(newUser);
        // console.log(users)
    }
    static checkUserExists(email,password){
        const userAccount = users.find((user)=>user.email == email && user.password == password);
        // users.forEach(user=>{
        //     console.log("user.email",user.email)
        //     console.log("user.password",user.password)
        //     console.log("email",email);
        // })
        if(userAccount){
            // console.log("line 23",users);
            // console.log("line 24",userAccount);
            return userAccount;
        }
        return null;
    }
}

let users = [];