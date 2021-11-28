function OpenModal(mod) {
    let modal = document.getElementById(mod);
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'

}

function CloserModal(mod) {
    let modal = document.getElementById(mod);
    modal.style.display = 'none'
    document.body.style.overflow = 'auto'
    document.getElementById("titulo").value = ""
    document.getElementById("description").value = ""
    document.getElementById("teacher_name").value = ""
    document.getElementById("imgLink").value = ""
    document.getElementById("class_list").value = ""
    document.getElementById("hdID").value = "0"
}