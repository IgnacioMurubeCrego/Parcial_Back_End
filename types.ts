export type Monument = {
    name : string, // Monument Name
    description : string,
    postCode : string, // In Body
    city : string, // zip API
    country : string, // restCountries API
    continent : string, // restCountries API
    time : string, // WorldTime API
    weather : string // Weather API 
}

export type Location = {
    city : string,
    country: string,
    continent: string
};
  
  export type Weather = {
    location: Location,
    temperature: number,
    description: string
  };

  export type Time = {
    timestamp : string
  }