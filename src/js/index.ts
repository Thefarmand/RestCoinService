
//import axios from 'axios';
import Axios,{} from '../../node_modules/axios/index'

//const axios = require('axios');
const url = "https://restcoinservice20181030103640.azurewebsites.net/api/bids/";

const BidsTable: HTMLTableElement = <HTMLTableElement>document.getElementById("bidsTable");
const BidTable: HTMLTableElement = <HTMLTableElement>document.getElementById("bidTable");

const getCoinButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getCoinButton");
const postCoinButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("postCoinButton");

const bidIdInput: HTMLInputElement = <HTMLInputElement>document.getElementById("bidIdInput");

const postIdInput: HTMLInputElement = <HTMLInputElement>document.getElementById("postIdInput");
const postItemInput: HTMLInputElement = <HTMLInputElement>document.getElementById("postItemInput");
const postOfferInput: HTMLInputElement = <HTMLInputElement>document.getElementById("postOfferInput");
const postNameInput: HTMLInputElement = <HTMLInputElement>document.getElementById("postNameInput");

getCoinButton.addEventListener("click", function () { GetCoinData() });
postCoinButton.addEventListener("click", function () { PostCoin() });

interface Coin {
    id:string,
    genstand: string
    bud: string,
    name: string;
}
//Funktion til at hente alle bud
function PopulateAllBidsTable(): void {
    if (BidsTable.rows.length > 1) {
        for (let i = 1; i < BidsTable.rows.length; i++) {
            BidsTable.deleteRow(i);
        }
    }
    Axios.get(url)
        .then(function (response) {
          let CoinInfo = response.data as Coin[];

            CoinInfo.forEach(bid => {
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
        })
}

//Funktion til at hente data om et givent ID
function GetCoinData(): void {
    if (BidTable.rows.length > 1) { BidTable.deleteRow(1); }
    var id = Number(bidIdInput.value);
    if (id < 1) { return; }
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
            elName.innerHTML = response.data.name;

            bidRow.appendChild(elID);
            bidRow.appendChild(elItem);
            bidRow.appendChild(elOffer);
            bidRow.appendChild(elName);
        })
        .catch(function (error) {
            console.log(error);
        })
}
//Funktion til at poste et nyt bud
function PostCoin(): void {
    var id: number = Number(postIdInput.value);
    var item: string = postItemInput.value;
    var offer: string = postOfferInput.value;
    var name: string = postNameInput.value;

    if (id < 0 || item == "" || offer == "" || name == "") { return; }

    Axios.post(url, {
        id: id,
        genstand: item,
        bud: offer,
        name: name
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