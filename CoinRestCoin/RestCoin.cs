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
            Console.WriteLine("Hele Listen/Alle mønt bud : ");
            var bids = GetBids();
            foreach (var coin in bids)
            {
                Console.WriteLine(coin);
            }

            Console.WriteLine("Hent bud nr 3");
            var bid3 = GetBidById(3);
            Console.WriteLine(bid3);
        }
        public IList<CoinBid> GetBids()
        {
            using (HttpClient client = new HttpClient())
            {
                string content = client.GetStringAsync(CustomerURI).Result;
                IList<CoinBid> cList = JsonConvert.DeserializeObject<IList<CoinBid>>(content);
                return cList;
            }
        }
        public CoinBid GetBidById(int id)
        {
            using (HttpClient client = new HttpClient())
            {
                string content = client.GetStringAsync(CustomerURI + id).Result;
                CoinBid cust = JsonConvert.DeserializeObject<CoinBid>(content);
                return cust;
            }
        }
    }
}
