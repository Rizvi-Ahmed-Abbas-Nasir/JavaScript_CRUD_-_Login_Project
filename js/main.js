// import studntdb from "./module";

function studntdb (dbname, table) {
    // create Database
  
    const db = new Dexie(dbname);
    db.version(1).stores(table);
    db.open();
  
  //   const db = new Dexie('mydb');
  //   db.version(1).stores({
  //       friends:`name, age`
  //   })
  
  //   db.open();
  
    return db;
}

 //  insert fucntion
    const bulkcreate = (dbtable, data) => {
        let flag = empty(data);
        if(flag){
            dbtable.bulkAdd([data]);
            console.log("Data inserted successfully...")
        }
        else{
            console.log("please provide data")
        }
        
        return flag
    }

    // check textbox validation
    const empty = object =>{
        let flag = true
        for(const value in object){
        if(object[value] != "" && object.hasOwnProperty(value)){
            flag = true
        }else{
            flag = false
        }
    }
    return flag;
    }


let db = studntdb("Productdb", {
    products:`++id, name, enrolment, class`
});

// input tags
const stdid = document.getElementById('id');
const std = document.getElementById('std');
const enroll = document.getElementById('enroll');
const stdclass = document.getElementById('stdclass');


//button
const create = document.getElementById('btn-create');
const read = document.getElementById('btn-read');
const update = document.getElementById('btn-update');
const deleteall = document.getElementById('btn-delete-all');


// insert value usign create 
create.onclick = (event) => {
   let flag =  bulkcreate(db.products, {
        name:std.value,
        enrolment:enroll.value,
        class: stdclass.value

    })
    //console.log(flag)

    std.value = enroll.value = stdclass.value = "";
    getData(db.products, (data) => {
        // console.log(data.id)
        id.value = data.id + 1 || 1;
    });
}


const getData = (dbtable, fn) =>{
    let index = 0;
    let obj = {};

    db.products.count((count)=>{
        if(count){
            db.products.each(table => {
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
        id: sortobj.id,
        name:sortobj.name,
        enrolment:sortobj.enrolment,
        class: sortobj.class
    }
    return obj;
}

// read the value usign read button

read.onclick = table;

// create dynamic elemetns
const createEle = (tagname, appendTo, fn) =>{
    const element = document.createElement(tagname);
    if(appendTo) appendTo.appendChild(element);
    if(fn)fn(element);
} 

function table(){

    //create element dynamiclly 
    const tbody = document.getElementById('tbody');
    // create element and append to the parent element 
    // let td = document.createElement('td')
    // console.log(tbody)
    // tbody.appendChild(td)
    // console.log(td)

    // create element using function (dymanically)
    // createEle("td",tbody,(td) =>{
    //     console.log(td);
    //     console.log(tbody)
    // })

    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild)
    }

    getData(db.products, (data)=>{
        console.log(data)

        if(data){
            createEle("tr",tbody, tr =>{
                for (const value in data) {
                    createEle("td", tr, td => {
                        td.textContent = data[value]

                    })
                  }
                  // insert img element 
                  createEle("td", tr ,td =>{
                    createEle('img', td, img =>{
                        img.width = 20
                        img.src = "edit_icon.png"
                    })
                  })
                  createEle("td", tr ,td =>{
                    createEle('img', td, img =>{
                        img.width = 20
                        img.src = "delete_icon.jfif"
                    })
                  })
            } )
        }
    })
}