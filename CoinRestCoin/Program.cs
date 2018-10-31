using System;
using System.Collections.Generic;
using ModelLibrary;

namespace CoinRestCoin
{
    class Program
    {
        static void Main(string[] args)
        {
            RestCoin newbid = new RestCoin();
            newbid.Start();
            Console.ReadLine();
        }
    }
}