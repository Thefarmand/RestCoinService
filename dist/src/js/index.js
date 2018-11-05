//import axios from 'axios';
import Axios from '../../node_modules/axios/index';
//const axios = require('axios');
var url = "https://restcoinservice20181030103640.azurewebsites.net/api/bids/";
var BidsTable = document.getElementById("bidsTable");
var BidTable = document.getElementById("bidTable");
var getCoinButton = document.getElementById("getCoinButton");
var postCoinButton = document.getElementById("postCoinButton");
var bidIdInput = document.getElementById("bidIdInput");
var postIdInput = document.getElementById("postIdInput");
var postItemInput = document.getElementById("postItemInput");
var postOfferInput = document.getElementById("postOfferInput");
var postNameInput = document.getElementById("postNameInput");
getCoinButton.addEventListener("click", function () { GetCoinData(); });
postCoinButton.addEventListener("click", function () { PostCoin(); });
function PopulateAllBidsTable() {
    if (BidsTable.rows.length > 1) {
        for (var i = 1; i < BidsTable.rows.length; i++) {
            BidsTable.deleteRow(i);
        }
    }
    Axios.get(url)
        .then(function (response) {
        var CoinInfo = response.data;
        CoinInfo.forEach(function (bid) {
            var bidRow = document.createElement('tr');
            BidsTable.appendChild(bidRow);
            var elID = document.createElement('td');
            var elItem = document.createElement('td');
            var elOffer = document.createElement('td');
            var elName = document.createElement('td');
            elID.innerHTML = bid.id;
            elItem.innerHTML = bid.genstand;
            elOffer.innerHTML = bid.bud;
            elName.innerHTML = bid.name;
            bidRow.appendChild(elID);
            bidRow.appendChild(elItem);
            bidRow.appendChild(elOffer);
            bidRow.appendChild(elName);
        });
    })
        .catch(function (error) {
        console.log(error);
    });
}
function GetCoinData() {
    if (BidTable.rows.length > 1) {
        BidTable.deleteRow(1);
    }
    var id = Number(bidIdInput.value);
    if (id < 1) {
        return;
    }
    Axios.get(url + bidIdInput.value)
        .then(function (response) {
        var bidRow = document.createElement('tr');
        BidTable.appendChild(bidRow);
        var elID = document.createElement('td');
        var elItem = document.createElement('td');
        var elOffer = document.createElement('td');
        var elName = document.createElement('td');
        elID.innerHTML = response.data.id;
        elItem.innerHTML = response.data.genstand;
        elOffer.innerHTML = response.data.bud;
        elName.innerHTML = response.data.navn;
        bidRow.appendChild(elID);
        bidRow.appendChild(elItem);
        bidRow.appendChild(elOffer);
        bidRow.appendChild(elName);
    })
        .catch(function (error) {
        console.log(error);
    });
}
function PostCoin() {
    var id = Number(postIdInput.value);
    var item = postItemInput.value;
    var offer = postOfferInput.value;
    var name = postNameInput.value;
    if (id < 0 || item == "" || offer == "" || name == "") {
        return;
    }
    Axios.post(url, {
        id: id,
        genstand: item,
        bud: offer,
        navn: name
    })
        .then(function (response) {
        console.log(response);
        PopulateAllBidsTable();
    })
        .catch(function (error) {
        console.log(error);
    });
}
PopulateAllBidsTable();
// //import axios from 'axios';
// import Axios,{} from '../../node_modules/axios/index'
// interface bidlist{
//   id:number,
//   genstand:string,
//   bud:number,
//   name:string
// };
// //let Buttonhent: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getList");
// let hentliste = document.getElementById("list_bids") as HTMLTextAreaElement;
// // Buttonhent.addEventListener("click", MouseEvent => {
//     Axios.get('https://restcoinservice20181030103640.azurewebsites.net/api/Bids')
//     .then(function (response) {
//       // handle success
//       let bl = response.data as bidlist[];
//       bl.forEach(member => {
//         hentliste.value += "ID: " + member.id + " Genstand: " + member.genstand + " Bud: " + member.bud + " Navn: " + member.name + "\n";
//       });
//       console.log(response + "HEJ");
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error + "nej");
//     });
