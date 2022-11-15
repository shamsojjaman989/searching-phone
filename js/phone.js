// spinner function 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSerachResult = displayStyle => {
    document.getElementById('card-section').style.display = displayStyle;
}


// search Phone in input 
const searchPhoneData = () => {
    // console.log('checked')
    const searchInput = document.getElementById('search-field').value;
    // console.log(searchInput)
    loadPhoneData(searchInput);
    document.getElementById('search-field').value = '';
    // display spinner 
    toggleSpinner('block');
    toggleSerachResult('none');
}

// load data from api 
const loadPhoneData = searchPhone => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

const displayPhone = phones => {
    const cardGrp = document.getElementById('card-grp');
    cardGrp.textContent = '';
    if (phones.length == 0) {
        const notFound = document.getElementById('not-found');
        notFound.style.display = 'block'
            // toggleNotFound('block');
            // console.log('not found')

        const head4 = document.createElement('h4');
        head4.innerText = 'Not Found';
        notFound.appendChild(head4);
        // console.log('phones');
        // document.getElementById('not-found').value = '';
    } else {
        const notFound = document.getElementById('not-found');
        notFound.style.display = 'none';
        phones.forEach(phone => {
            const cards = document.createElement('card');
            cards.classList.add('cards');
            cards.innerHTML = `
            <div class="card-item">
                    <img class="img-fluid mx-auto p-4 rounded phone-images" src="${phone.image}"alt="reload">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${phone.phone_name}</h5>
                        <h5 class="card-title">Brand: ${phone.brand}</h5>
                        <p class="card-text">slug: ${phone.slug}.</p>
                    </div>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="detail-button px-3 rounded p-1 text-center mx-auto mb-3 mt-3">Details</button>
                </div>
                
            `;
            cardGrp.appendChild(cards);
        })
    }

    toggleSpinner('none')
    toggleSerachResult('block');

    // console.log(phones);
}
loadPhoneData('iphone');

// load data from api 
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}
const displayPhoneDetails = phone => {
    const other = phone.others;
    console.log(other)
    const moreDetials = document.getElementById('details-container');
    const newDiv = document.createElement('div');

    newDiv.innerHTML = `
    <div class="card mb-3 p-4" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Name: ${phone.name}</h5>
                <h6>Brand: ${phone.brand}</h6>
                <h6>Id: ${phone.slug}</h6>
                
                <p class="card-text">
                GPS: ${other.GPS} <br>
                Bluetooth: ${other.Bluetooth}<br>
                WLAN: ${other.WLAN}<br>
                Radio: ${other.Radio}<br>
                USB: ${other.USB}
                </p>
                <span id="relese">Relese Date: ${phone.releaseDate? phone.releaseDate:'Comming...'}</span>
              </div>
          </div>
        </div>
     </div>



    `;
    moreDetials.appendChild(newDiv);
    console.log(phone)
}