const url = "http://localhost:3000/tabela"

function date() {
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: "short", timeStyle: "short" }).format(new Date());  
}

const CreateAndUpdate = async () => {
    const response = await fetch(url)
    const data = await response.json()

    let title = document.getElementById("titulo").value
    let description = document.getElementById("description").value
    let teacher_name = document.getElementById("teacher_name").value
    let imgLink = document.getElementById("imgLink").value
    let class_list = document.getElementById("class_list").value
    let criar_ou_editar = document.getElementById("hdID").value
    let datec = document.getElementById("DateOld").value


    if(!criar_ou_editar || criar_ou_editar == 0){
        //createObj(id, title, description, imgLink, teacher_name, dateC, dateM, lesson_list)
        obj = createObj(data.length == 0 ? 1 : data[data.length - 1].id + 1, title, description, imgLink, teacher_name, class_list, date(), null)
        POSTA(obj)
    } else {
        obj = createObj(criar_ou_editar, title, description, imgLink, teacher_name, class_list, datec, date())
        PUT(criar_ou_editar, obj)
    }
    event.preventDefault()
    Reflash()
    CloserModal('MDL')
}


const Reflash = async () => {
    const response = await fetch(url)
    const data = await response.json()
    var container = document.getElementById("corpo")
    container.innerHTML = ""
    data.forEach(element => {
        container.innerHTML += `
        <tr>
            <td>${element.id}</td>
            <td><img class="imgs" src="${element.imgLink}"></td>
            <td>${element.title}</td>
            <td>${element.description}</td>
            <td>${element.teacher_name}</td>
            <td><a class="links" href="${element.class_list}" target="_blank">Link</a></td>
            <td>Criado:<br>${element.dateC}<br>${element.dateM !== null ? `Modificado:<br>${element.dateM}` : ``}</td>
            <td>
            <div>
                <button id="deletar" onclick="Erase(${element.id})">Excluir</button>
                <button id="editar" onclick="Edit(${element.id})">Editar</button>
            <div>
        </td>
        </tr>
        `
    });
}
    
Reflash()

const Erase = async (id) => {
    await fetch(`${url}/${id}`, {
        method: "DELETE"
    });
    Reflash()
}

const PUT = async (id, obj) => {
    await fetch(`${url}/${id}`,{
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(obj)
    })
}

const POSTA = async (obj) => {
    await fetch(url, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(obj)
    })
}

function createObj(id, title, description, imgLink, teacher_name, class_list, dateC, dateM){
    return {
        id: id,
        title: title,
        description: description,
        imgLink: imgLink,
        teacher_name: teacher_name,
        class_list: class_list,
        dateC: dateC,
        dateM: dateM
    }
}

const Edit = async (ID) => {
    const response = await fetch(url)
    const data = await response.json()
    OpenModal('MDL')
    data.filter(x => x.id == ID).map(x => {
        document.querySelector(".imgs").getAttribute = x.imgLink
        document.getElementById("hdID").value = x.id
        document.getElementById("DateOld").value = x.dateC
        document.getElementById("titulo").value = x.title
        document.getElementById("imgLink").value = x.imgLink
        document.getElementById("description").value = x.description
        document.getElementById("teacher_name").value = x.teacher_name
        document.getElementById("class_list").value = x.class_list
    })
}

function OpenLink(){
	window.open(url)
}
