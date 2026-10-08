const { z } = require("zod");

const CurrencySchema = z.object({
    code: z.string(),
    name: z.string(),
    symbol: z.string(),
    salam: z.optional()
});

const LanguageSchema = z.object({
    iso639_1: z.string(),
    iso639_2: z.string(),
    name: z.string(),
    nativeName: z.string(),
});

const RegionalBlocSchema = z.object({
    acronym: z.string(),
    name: z.string(),
});

const FlagsSchema = z.object({
    svg: z.string().url(),
    png: z.string().url(),
});

const CountrySchema = z.object({
    name: z.string(),
    topLevelDomain: z.array(z.string()),
    alpha2Code: z.string(),
    alpha3Code: z.string(),
    callingCodes: z.array(z.string()),
    capital: z.string(),
    altSpellings: z.array(z.string()),
    subregion: z.string(),
    region: z.string(),
    population: z.number().int().nonnegative(),
    latlng: z.tuple([z.number(), z.number()]),
    demonym: z.string(),
    area: z.number().nonnegative(),
    timezones: z.array(z.string()),
    borders: z.array(z.string()),
    nativeName: z.string(),
    numericCode: z.string(),
    flags: FlagsSchema,
    currencies: z.array(CurrencySchema),
    languages: z.array(LanguageSchema),
    translations: z.record(z.string(), z.string()),
    flag: z.string().url(),
    regionalBlocs: z.array(RegionalBlocSchema),
    cioc: z.string(),
    independent: z.boolean(),
});

module.exports = {
    CountrySchema,
    CurrencySchema,
    LanguageSchema,
    RegionalBlocSchema,
    FlagsSchema
};