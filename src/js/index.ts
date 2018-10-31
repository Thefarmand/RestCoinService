//import axios from 'axios';
import Axios,{} from '../../node_modules/axios/index'
interface bidlist{
  id:number,
  genstand:string,
  bud:number,
  name:string
};



//let Buttonhent: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getList");
let hentliste = document.getElementById("list_bids") as HTMLTextAreaElement;

// Buttonhent.addEventListener("click", MouseEvent => {
    Axios.get('https://restcoinservice20181030103640.azurewebsites.net/api/Bids')
    .then(function (response) {

      // handle success
      let bl = response.data as bidlist[];
      
      
      bl.forEach(member => {
        hentliste.value += "ID: " + member.id + " Genstand: " + member.genstand + " Bud: " + member.bud + " Navn: " + member.name + "\n";
      });
      console.log(response + "HEJ");
    })
    .catch(function (error) {
      // handle error
      console.log(error + "nej");
    });