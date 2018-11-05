using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net.Http;
using System.Text;
using ModelLibrary;
using Newtonsoft.Json;

namespace CoinRestCoin
{
    internal class RestCoin
    {
        // Konstant til URI
        private String CustomerURI = "http://localhost:49427/api/Bids/";
        public RestCoin()
        {
        }

        public void Start()
        {
            //Hent listen
            Console.WriteLine("Hele Listen/Alle mønt bud : ");
            var bids = GetBids();
            foreach (var coin in bids)
            {
                Console.WriteLine(coin);
            }

            //Hent bud nr. 3
            Console.WriteLine("Hent bud nr 3");
            var bid3 = GetBidById(3);
            Console.WriteLine(bid3);

            //Tilføj bud
            Console.WriteLine("Tilføj et nyt bud");
            var newBid = CreateNewBid(new CoinBid(8, "Gold DK 1640", 6000, "Jan"));
            Console.WriteLine("nyt bud tilføjet = " + newBid);

        }
        //Metode til at hente listen
        public IList<CoinBid> GetBids()
        {
            using (HttpClient client = new HttpClient())
            {
                string content = client.GetStringAsync(CustomerURI).Result;
                IList<CoinBid> cList = JsonConvert.DeserializeObject<IList<CoinBid>>(content);
                return cList;
            }
        }
        //Metode til at hente et bestemt id
        public CoinBid GetBidById(int id)
        {
            using (HttpClient client = new HttpClient())
            {
                string content = client.GetStringAsync(CustomerURI + id).Result;
                CoinBid cust = JsonConvert.DeserializeObject<CoinBid>(content);
                return cust;
            }
        }

        //Metode til at poste nyt bud
        public bool CreateNewBid(CoinBid bid)
        {
            // prepare the bid to be send in the body as content
            // convert the bid object into a json string and create the content (body)
            String jsonStr = JsonConvert.SerializeObject(bid);
            StringContent content = new StringContent(jsonStr, Encoding.UTF8, "application/json");

            bool succed = false;

            // setup to use HTTP as transport for a REST request
            using (HttpClient client = new HttpClient())
            {
                // send a REST POST request ie. creating
                HttpResponseMessage response = client.PostAsync(CustomerURI, content).Result;
                // check if it succeded
                if (response.IsSuccessStatusCode)
                {
                    // get the result as json string and convert it into an boolean
                    String jsonRes = response.Content.ReadAsStringAsync().Result;
                    succed = JsonConvert.DeserializeObject<bool>(jsonRes);
                }
            }
            return succed;
        }
    }
}
