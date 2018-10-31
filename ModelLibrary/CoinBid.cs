using System;

namespace ModelLibrary
{
    public class CoinBid
    {
        private int _id;
        private string _genstand;
        private int _bud;
        private string _name;

        public CoinBid(int id, string genstand, int bud, string name)
        {
            _id = id;
            _genstand = genstand;
            _bud = bud;
            _name = name;
        }

        public CoinBid()
        {
        }

        public int Id
        {
            get => _id;
            set => _id = value;
        }

        public string Genstand
        {
            get => _genstand;
            set => _genstand = value;
        }

        public int Bud
        {
            get => _bud;
            set => _bud = value;
        }

        public string Name
        {
            get => _name;
            set => _name = value;
        }

        public override string ToString()
        {
            return $"{nameof(Id)}: {_id}, {nameof(Genstand)}: {_genstand}, {nameof(Bud)}: {_bud}, {nameof(Name)}: {_name}";
        }
    }
}
