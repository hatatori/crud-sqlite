function read(id=''){
    
    lista.innerHTML = ''
    listadel.innerHTML = ''

    fetch('http://localhost:3000/lista/'+id)
    .then(e => e.json())
    .then(e => {
        lista.innerHTML = JSON.stringify(e)
        
        console.log(e)

        if(id == ""){
            e.map(el=>{
                listadel.innerHTML += `<div>${el.id} - ${el.name} - ${el.age} - <button onclick="del(${el.id})">Deletar</button></div>`
            })
        }else{
            listadel.innerHTML += `<div>${e.id} - ${e.name} - ${e.age} - <button onclick="del(${e.id})">Deletar</button></div>`
        }
    })
}

function del(id){
    fetch('http://localhost:3000/delete/'+id)
    .then(e=>{
        window.location.reload()
    })
}

function add(name, age){
    fetch('http://localhost:3000/add',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:name, age:age}),
    })
    .then(e=>e.json())
    .then(e=> read() )
}

read()

bt_filter.onclick = () => read(inp_id.value)
bt_add.onclick = () => add(inp_name.value, inp_age.value)

Array.from([inp_name, inp_age]).map(el=>{
    el.addEventListener('keyup', e=>{
        if(e.key == "Enter"){
            add(inp_name.value, inp_age.value)
        }
    })
})

inp_id.addEventListener('keyup', e=>{
    if(e.key == "Enter"){
        read(inp_id.value)
    }
})



