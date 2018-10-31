using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ModelLibrary;

namespace RestCoinService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidsController : ControllerBase
    {

        static CoinBid coin1 = new CoinBid(1, "Gold DK 1640", 2500, "Mike");
        static CoinBid coin2 = new CoinBid(2, "Gold NL 1764", 5000, "Anbo");
        static CoinBid coin3 = new CoinBid(3, "Gold FR 1644", 0, "Auction");
        static CoinBid coin4 = new CoinBid(4, "Gold FR 1644", 35000, "Hammer");
        static CoinBid coin5 = new CoinBid(5, "Silver GR 333", 2500, "Mike");

        private static List<CoinBid> coinList = new List<CoinBid>()
            {coin1, coin2, coin3, coin4, coin5};

        // GET: api/Liste over bids
        [HttpGet]
        public IEnumerable<CoinBid> Get()
        {
            return coinList;
        }

        // GET: api/Customers. Hent et enkelt bud ud fra ID
        [HttpGet("{id}", Name = "Get")]
        public CoinBid Get(int id)
        {
            return coinList.Find(o => o.Id == id);
        }


        // POST: api/Tilføj ID
        [HttpPost]
        [Route("")]
        public bool Post([FromBody] CoinBid value)
        {
            CoinBid cust = Get(value.Id);
            if (cust == null)
            {
                coinList.Add(value);
                return true;
            }
            return false;
        }
    }
}
