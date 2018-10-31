using System;
using System.Collections.Generic;
using System.Net.Http;
using ModelLibrary;
using Newtonsoft.Json;

namespace RestCoin
{
    class Program
    {
        private const string URI = "http://localhost:49427/api/Bids/";

        static void Main(string[] args)
        {

            foreach (var coinbid in GetCoinBid(""))
            {
                Console.WriteLine(coinbid);
            }
            Console.ReadLine();
        }
        public static IList<CoinBid> GetCoinBid(string path)
        {
            using (HttpClient client = new HttpClient())
            {
                string content = client.GetStringAsync(URI + path).Result;
                IList<CoinBid> coinList = JsonConvert.DeserializeObject<IList<CoinBid>>(content);
                return coinList;
            }
        }

    }
}