export interface Summary {
    ID: string;
    Global: {};
    Date: string;
    Countries: Array<CountriesSummary>;
    Message: string;  
}

export interface CountriesSummary {
    ID: string;
    Date: string;
    Country: string;
    CountryCode: string;
    NewConfirmed: number;
    NewDeaths: number;
    NewRecovered: number;
    Premium: {};
    Slug: string;
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
}