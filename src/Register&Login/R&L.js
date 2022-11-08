function ADMS_Login (dbname, LoginPara) {
    // create Database
  
    const Login_db = new Dexie(dbname);
    Login_db.version(1).stores(LoginPara);
    Login_db.open();
  
  //   const db = new Dexie('mydb');
  //   db.version(1).stores({
  //       friends:`name, age`
  //   })
  
  //   db.open();
  
    return Login_db;
}

// insert fucntio 
    const userinfo = (dbtable, data) =>{
        let flag = empty(data)
        if(flag){
            dbtable.bulkAdd([data]);
            console.log("Data inserted Successfully");
        }
        else{
            console.log("Please Provide data"); 
        }

        return flag
    }

    const empty = Object =>{
        let flag = true
        for(const value in Object){
            if(Object[value] != "" && Object.hasOwnProperty(value)){
                flag = true
            }
            else{
                flag = false
            }
        }
        return flag
    }

let Login_db = ADMS_Login("DataDB", {
    authencationInfo:`++id, name, email, password`
});


// user input from inputbox 
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const error = document.getElementById('error');
const errorbg = document.getElementById('errorMsg');
errorbg.style.background  = "rgb(15, 15, 15)"

const singup = document.getElementById('btn-signup')


// insert userinfo

singup.onclick = (event) =>{

    let flag = userinfo(Login_db.authencationInfo, {
         name:username.value,
         email:email.value,
         password:password.value
    })
    if(flag){
            errorbg.style.background = "white"
            error.innerHTML = "Registered Successfully"
            errorbg
        let seconds = 1
            setTimeout( () => {
            // error.style.display = 'none'
            error.innerHTML = ""
            errorbg.style.background  = "rgb(15, 15, 15)"
            }, seconds * 1000);
    }
    console.log(flag)

    username.value = email.value = password.value = "";
    getData(Login_db.DataDB, (data)=>{
        id.value = data.id + 1 || 1;
    });


}

const getData = (dbtable, fn) =>{
    let index = 0;
    let obj = {};

    Login_db.authencationInfo.count((count)=>{
        if(count){
            Login_db.authencationInfo.each(table => {
                // console.log(table)

               obj = Sortobj(table)
               console.log(obj)
               fn(obj,index++);
            })
        }else{
            fn(0);
        }
    })
}

// sort the data id - name - enrolment - class
const Sortobj = sortobj =>{
    let obj = {};
    obj = {
        id:sortobj.id,
        name:sortobj.name,
        email:sortobj.email,
        password:sortobj.password
    }
    return obj;
}