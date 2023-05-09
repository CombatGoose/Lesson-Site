//Save elements which we need
let userBalance = document.querySelector("#userBalance") 
let btnCont = document.querySelector(".button-container")
let addMoney = document.querySelector(".money")
let sum = document.querySelectorAll(".sum")
let cart = document.querySelector(".cart")
let clearCart = document.querySelector(".clear-cart")
let input = document.querySelector("#input")
let main = document.querySelector(".main_wrapper")

//Balance

const writeBalance = () => {
    userBalance.innerHTML = `Баланс: ${localStorage.getItem("balance")} грн`
}

const setBalance = (value = 0) => {
    localStorage.setItem("balance", value)
    writeBalance()
}

const getBalance = () => {
    return parseInt(localStorage.getItem("balance"))
}

writeBalance()

addMoney.addEventListener("click", () => {
    let currentBalance = getBalance()
    let valueAdd = parseInt(input.value)
    setBalance(currentBalance + valueAdd)
    input.value = ""
})
//Cards which save in the array
let cardsStore = [
    {
        id: 1,
        name: "Картопля",
        price: 108,
        reality: 138,
        src: "./img/potato.jpg"
    },
    {
        id: 2,
        name: "Помідори",
        price: 114,
        reality: 412,
        src: "./img/tomato.jpg"
    },
    {
        id: 3,
        name: "Огірки",
        price: 200,
        reality: 897,
        src: "./img/cucumber.jpg"
    }
]

let bucketStore = []

const removeBucket = (idToRemove) => {
    bucketStore = bucketStore.filter(bucketItem => {
        if(bucketItem.id != idToRemove){
            return bucketItem
        }
    })
    generateBucket()
}

const findItemInArray = (array, id) => {
    let currentIndex
    array.forEach((item, index) => { 
        if (item.id == id){
            currentIndex = index
        }
    })
    return currentIndex
}

const generateCard = () => {
    cardsStore.forEach((card) => {
        main.innerHTML += `
        <div id="${card.id}" class="product_card">
        <img src="${card.src}" alt="">
        <p class="inf">${card.name}</p>
        <p>В наявності: ${card.reality} кг</p>
        <input class="input" id="inputCount-${card.id}" type="text" placeholder="Кількість в кг">
        <p class="sum">${card.price}.00 грн</p>
        <button class="button">Додати до кошику</button>
    </div>
        `
    })
    let buttons = document.querySelectorAll(".button")
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            let currentId = parseInt(button.parentNode.id)
            let currentBalance = parseInt(localStorage.getItem('balance'))
            let price = cardsStore[findItemInArray(cardsStore, currentId)].price
            let count = document.querySelector(`#inputCount-${currentId}`)
            let sum = price * parseFloat(count.value)
            if (currentBalance - sum >= price) {
                bucketStore = [
                    ...bucketStore,
                    {
                        ...cardsStore[findItemInArray(cardsStore, currentId)]
                    }
                ]
                generateBucket()
                setBalance(currentBalance-sum)
            } else {
                alert("На жаль, Вам не вистачає грошей, щоб придбати цей товар, будь ласка, поповніть баланс")
            }
        })
    })
}

 const generateBucket = () => {

    cart.innerHTML = ""

 bucketStore.forEach(bucketEl => {
        cart.innerHTML += `            
        <div id="${bucketEl.id}" class="product_card">
        <img src="${bucketEl.src}" alt="">
        <p class="inf">${bucketEl.name}</p>
        <p class="sum">${bucketEl.price}</p>
        <button class="button" id="btnRemove">Видалити з кошику</button>
    </div>`
 })

 let buttonsDelete = document.querySelectorAll("#btnRemove")
 buttonsDelete.forEach((btn) => {
    btn.addEventListener("click", () => {
        let currentId = parseInt(btn.parentNode.id)
        bucketStore = [
            ...bucketStore, 
            {
                ...bucketStore[findItemInArray(bucketStore, currentId)]
            }
        ]
        let currentBalance = parseInt(localStorage.getItem('balance'))
        let price = bucketStore[findItemInArray(bucketStore, currentId)].price
        setBalance(currentBalance+price)
        removeBucket(currentId)
    })
 })
}

generateCard()

const clearTheCart = () => {
    cart.innerHTML = ""
}

clearCart.addEventListener("click", clearTheCart)