export const indicationCards: {
  id: number;
  logo: string;
  name: string;
  location: string;
  industry: string;
  action: "SELL" | "BUY";
  amount: string;
  share: string;
  vsLRV: string;
  valuation: string;
  fee: string;
  minSize: string;
  status:
    | "LISTING"
    | "OFFER"
    | "PRICE_CHANGE"
    | "PRICE_DROP"
    | "UNDER_CONTRACT";
}[] = [
  {
    id: 1,
    logo: "/icon/discord.png",
    name: "TechCorp",
    location: "New York, USA",
    industry: "Technology",
    action: "SELL",
    amount: "150",
    share: "20",
    vsLRV: "12",
    valuation: "1.5",
    fee: "3",
    minSize: "50",
    status: "LISTING",
  },
  {
    id: 2,
    logo: "/icon/discord.png",
    name: "HealthPlus",
    location: "London, UK",
    industry: "Healthcare",
    action: "BUY",
    amount: "200",
    share: "15",
    vsLRV: "8",
    valuation: "2.0",
    fee: "2.5",
    minSize: "75",
    status: "OFFER",
  },
  {
    id: 3,
    logo: "/icon/discord.png",
    name: "FinTrust",
    location: "Sydney, Australia",
    industry: "Finance",
    action: "SELL",
    amount: "180",
    share: "25",
    vsLRV: "10",
    valuation: "2.2",
    fee: "4",
    minSize: "100",
    status: "PRICE_CHANGE",
  },
  {
    id: 4,
    logo: "/icon/discord.png",
    name: "EduInnovate",
    location: "Toronto, Canada",
    industry: "Education",
    action: "BUY",
    amount: "120",
    share: "30",
    vsLRV: "9",
    valuation: "1.2",
    fee: "3.5",
    minSize: "60",
    status: "PRICE_DROP",
  },
  {
    id: 5,
    logo: "/icon/discord.png",
    name: "AutoMotive",
    location: "Berlin, Germany",
    industry: "Automotive",
    action: "SELL",
    amount: "250",
    share: "40",
    vsLRV: "15",
    valuation: "3.0",
    fee: "5",
    minSize: "120",
    status: "UNDER_CONTRACT",
  },
  {
    id: 6,
    logo: "/icon/discord.png",
    name: "EcoEnergy",
    location: "Tokyo, Japan",
    industry: "Energy",
    action: "BUY",
    amount: "300",
    share: "35",
    vsLRV: "20",
    valuation: "4.0",
    fee: "2",
    minSize: "150",
    status: "LISTING",
  },
];
