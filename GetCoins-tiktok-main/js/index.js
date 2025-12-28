const submit = document.getElementById("btn-submit");
const inputCustum = document.getElementById("input-coin");
const back = document.getElementById("btn-back");
const submitPay = document.getElementById("btn-submit-pay");
const inputAccount = document.getElementById("inputAccount");

const COIN_PRICE = 0.0106;
const ANIMATION_DELAY = 3000;

// تحميل الرصيد من localStorage عند تحميل الصفحة
const loadBalance = () => {
    const savedBalance = localStorage.getItem('tiktokCoinsBalance');
    if (savedBalance) {
        document.querySelector(".tiktok-11tgy7o-SpanCoinNum").textContent = parseInt(savedBalance).toLocaleString();
    }
};

// حفظ الرصيد في localStorage
const saveBalance = (balance) => {
    localStorage.setItem('tiktokCoinsBalance', balance);
};

// تحميل الرصيد عند بدء الصفحة
window.addEventListener('DOMContentLoaded', loadBalance);

const handleCoinSelection = (i) => {
    const currentBtn = document.getElementById(`btn-coin${i}`);
    
    if (currentBtn.classList.contains("tiktok-l4v9n8-ButtonContainer")) {
        currentBtn.classList.remove("tiktok-l4v9n8-ButtonContainer");
        currentBtn.classList.add("tiktok-1xsxoj2-ButtonContainer");
    }
    
    for (let j = 1; j < 9; j++) {
        if (j !== i) {
            const btn = document.getElementById(`btn-coin${j}`);
            btn.classList.remove("tiktok-1xsxoj2-ButtonContainer");
            btn.classList.add("tiktok-l4v9n8-ButtonContainer");
        }
    }
    
    const custunCoin = document.getElementById("custun-coin");
    const inputCoin = document.getElementById("input-coin");
    custunCoin.style.display = "block";
    inputCoin.style.display = "none";
    
    if (i === 8) {
        custunCoin.style.display = "none";
        inputCoin.style.display = "block";
        
        inputCustum.addEventListener("input", handleCustomInput);
    } else {
        const money = document.querySelector(`#btn-coin${i} .tiktok-10102vh-SpanTextNow`).innerHTML;
        const coin = document.querySelector(`#btn-coin${i} .tiktok-wkgdjt-SpanNumDisplay`).innerHTML;
        
        updatePriceDisplay(money, coin);
    }
};

const handleCustomInput = () => {
    const inputValue = inputCustum.value;
    
    if (isNaN(inputValue) || inputValue < 0) {
        alert("Please enter a valid number!");
        inputCustum.value = "";
        return;
    }
    
    const result = parseInt(inputValue) * COIN_PRICE;
    document.getElementById("total-money").innerHTML = `$${result.toFixed(2)}`;
    document.getElementById("money").innerHTML = `$${result.toFixed(2)}`;
    document.getElementById("text-coin-result").innerHTML = inputValue;
    
    if (inputValue === "") {
        document.getElementById("total-money").innerHTML = "$";
        document.getElementById("money").innerHTML = "Large amount supported";
    }
};

const updatePriceDisplay = (money, coin) => {
    document.getElementById("total-money").innerHTML = money;
    document.getElementById("text-coin-result").innerHTML = coin;
    document.getElementById("coins").innerHTML = `${coin} Pièces`;
    document.getElementById("totalMoney1").innerHTML = money;
    document.getElementById("totalMoney2").innerHTML = money;
    document.getElementById("confirmAmount").innerHTML = money;
    document.getElementById("confirmCoins").innerHTML = `${coin} Pièces`;
};

for (let i = 1; i < 9; i++) {
    document.getElementById(`btn-coin${i}`).addEventListener("click", () => {
        handleCoinSelection(i);
    });
}

submit.addEventListener("click", () => {
    document.getElementById("payload").style.display = "block";
    const username = "infinity Meta";
    document.getElementById("Account").innerHTML = username;
});

document.getElementById("btn-close").addEventListener("click", () => {
    document.getElementById("payload").style.display = "none";
});

submitPay.addEventListener("click", () => {
    const cardNumber = document.getElementById('cardNumberInput')?.value || '';
    const expiryDate = document.getElementById('expiryDateInput')?.value || '';
    const cardHolder = document.getElementById('cardHolderInput')?.value || '';
    
    if (cardNumber.length >= 4) {
        const lastDigits = cardNumber.replace(/\s/g, '').slice(-4);
        document.getElementById('cardLastDigits').textContent = `•••• •••• •••• ${lastDigits}`;
    }
    
    if (expiryDate) {
        const expiryEl = document.getElementById('cardExpiryDisplay');
        if(expiryEl) expiryEl.textContent = `EXP: ${expiryDate}`;
    }
    
    if (cardHolder) {
        document.getElementById('cardHolderDisplay').textContent = cardHolder.toUpperCase();
    }
    
    document.getElementById("paymentConfirmModal").style.display = "flex";
});

document.getElementById("closeConfirmModal").addEventListener("click", () => {
    document.getElementById("paymentConfirmModal").style.display = "none";
});

document.getElementById("cancelPayment").addEventListener("click", () => {
    document.getElementById("paymentConfirmModal").style.display = "none";
});

document.getElementById("confirmPayment").addEventListener("click", () => {
    document.getElementById("paymentConfirmModal").style.display = "none";
    document.getElementById("resultload").style.display = "block";
    
    setTimeout(() => {
        document.getElementById("resultload").style.display = "none";
        document.getElementById("result").style.display = "block";
        
        const currentCoins = parseInt(document.querySelector(".tiktok-11tgy7o-SpanCoinNum").textContent.replace(/,/g, '')) || 0;
        const selectedCoins = parseInt(document.getElementById("text-coin-result").textContent.replace(/,/g, '')) || 0;
        const newTotal = currentCoins + selectedCoins;
        document.querySelector(".tiktok-11tgy7o-SpanCoinNum").textContent = newTotal.toLocaleString();
        
        // حفظ الرصيد الجديد في localStorage
        saveBalance(newTotal);
    }, ANIMATION_DELAY);
    
    document.getElementById("payload").style.display = "none";
    document.getElementById("input-coin").value = "";
});

back.addEventListener("click", () => {
    document.getElementById("result").style.display = "none";
    document.getElementById("custun-coin").style.display = "block";
    document.getElementById("input-coin").style.display = "none";
    document.getElementById("money").innerHTML = "Large amount supported";
    document.getElementById("total-money").innerHTML = "$";
});

const handlePaymentMethod = (method) => {
    const cardDisplay = document.getElementById("card");
    const inputCard = document.getElementById("inputCard");
    const inputPaypal = document.getElementById("inputPaypal");
    const inputVemo = document.getElementById("inputVemo");
    
    if (method === "card") {
        cardDisplay.style.display = "block";
        inputCard.checked = true;
        inputPaypal.checked = false;
        inputVemo.checked = false;
    } else if (method === "paypal") {
        cardDisplay.style.display = "none";
        inputCard.checked = false;
        inputPaypal.checked = true;
        inputVemo.checked = false;
    } else if (method === "vemo") {
        cardDisplay.style.display = "none";
        inputVemo.checked = true;
        inputCard.checked = false;
        inputPaypal.checked = false;
    }
};

const editCard = document.getElementById("EditCard");
const payPal = document.getElementById("payPal");
const vemo = document.getElementById("Vemo");

if (editCard) editCard.addEventListener("click", () => handlePaymentMethod("card"));
if (payPal) payPal.addEventListener("click", () => handlePaymentMethod("paypal"));
if (vemo) vemo.addEventListener("click", () => handlePaymentMethod("vemo"));

window.copyInviteCode = () => {
    const code = '3FB5BNQ2';
    navigator.clipboard.writeText(code).then(() => {
        alert('Code copié : ' + code);
    }).catch(() => {
        alert('Erreur lors de la copie');
    });
};



const addCardBtn = document.getElementById('addCardBtn');
const cardForm = document.getElementById('cardForm');

if (addCardBtn && cardForm) {
    addCardBtn.addEventListener('click', () => {
        cardForm.style.display = cardForm.style.display === 'none' ? 'block' : 'none';
    });
}

const cardNumberInput = document.getElementById('cardNumberInput');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
}

const expiryInput = document.getElementById('expiryDateInput');
if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
}

const cvvInput = document.getElementById('cvvInput');
if (cvvInput) {
    cvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('TikTok Coins page loaded - 2025 standards');
});

// Profile Dropdown Logic
const profileIcon = document.getElementById('header-more-menu-icon');
const dropdownMenu = document.getElementById('profile-dropdown');

if (profileIcon && dropdownMenu) {
    profileIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (e) => {
        if (!profileIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
}
