import en from "../locales/en-US.json";
import de from "../locales/de-DE.json";
import ua from "../locales/uk-UA.json";
import fr from "../locales/fr-FR.json";
import es from "../locales/es-ES.json";

const locales = {
    "en-US": en,
    "de-DE": de,
    "uk-UA": ua,
    "fr-FR": fr,
    "es-ES": es
};

export function getLocale(region) {
    return locales[region] || locales["en-US"];
}