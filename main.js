const expenseInput = document.querySelector("#harcama")
const fiyatInput = document.querySelector("#fiyat")
const formBtn = document.querySelector(".ekle-btn")
const list = document.querySelector(".list")
const totalInfo= document.querySelector("#total-info")
const nameInput=document.getElementById("nameInput")
const userName=localStorage.getItem("name")
const statusCheck =document.getElementById("status-input")
const selectFilter=document.getElementById("filter-select")

nameInput.value=userName

nameInput.addEventListener("change",(e)=>{
    localStorage.setItem("name", e.target.value)
})
formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick)
selectFilter.addEventListener("change", handleFilter)



let toplam=0;

function updateToplam(fiyatBilgisi){
    toplam +=Number(fiyatBilgisi);
    totalInfo.innerText=toplam

}


function addExpense(e) {
    e.preventDefault();

    if(!expenseInput.value || !fiyatInput.value){
        alert("tüm boş alanları doldurun");
        
    } else{

    const harcamaDiv = document.createElement("div");
    harcamaDiv.classList.add("expense");
    if(statusCheck.checked){
        harcamaDiv.classList.add("payed")
    }
    harcamaDiv.innerHTML = `
    <h2>${expenseInput.value}</h2>
    <h2 id='value'>${fiyatInput.value}</h2>
    <div class="buttons">
        <img id="payment" src="/images/pay.png" alt="">
        <img id="remove" src="/images/remove.png" alt="">
    </div>`;

    list.appendChild(harcamaDiv);
    updateToplam(fiyatInput.value)
    }
    expenseInput.value="";
    fiyatInput.value="";


}

function handleClick(e){

    let clicked= e.target;
    if(clicked.id==="remove"){
        const container=clicked.parentElement.parentElement;

        const deletedPrice=container.querySelector('#value').innerText;
        updateToplam(-Number(deletedPrice));
        container.remove();

    }

}

function handleFilter(e){
    const harcamaKartlari=list.childNodes

const filterValue=e.target.value


harcamaKartlari.forEach((harcamaKarti)=>{
    switch(filterValue){
        case "all":
            harcamaKarti.style.display="flex";
            break;
        case "payed":
            if(!harcamaKarti.classList.contains("payed")){
                harcamaKarti.style.display="none";


            } else{
                harcamaKarti.style.display="flex";
            }
            break
        case "not-payed":
            if(harcamaKarti.classList.contains("payed")){
                harcamaKarti.style.display="none";
            } else{
                harcamaKarti.style.display="flex";
            }
            break
    }
})
}

