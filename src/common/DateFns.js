import { LanguageDevice } from "@common";
import { format, formatRelative, subDays, parseISO } from 'date-fns';
import { enUS, ptBR, pt } from 'date-fns/locale';

const locales = { enUS, ptBR, pt };

const normalizeTranslate = {
  'en_US': 'enUS',
  'pt_BR': 'ptBR',
  'en': 'enUS',
  'pt_US': 'ptBR',
  'pt_PT': 'pt',
}


const getLanguage = () => {
  let language = 'enUS';
  const languageDevice = LanguageDevice();
  const iHaveThisLanguage = normalizeTranslate.hasOwnProperty(languageDevice);
  if (iHaveThisLanguage) {
    return (normalizeTranslate[languageDevice]);
  }
  return language;

}


class DateFns {

  constructor() {

  }

  static mFormatRelative(date) {

    const formatRelativeLocale = {
      lastWeek: "'Último' eeee dia d",
      yesterday: "'Ontem'",
      today: "'Hoje'",
      tomorrow: "'Amanhã'",
      nextWeek: "'Próximo' eeee 'dia' d",
      other: 'dd-MM-yyyy',
    };

    const locale = {
      ...ptBR,
      formatRelative: (token) => formatRelativeLocale[token],
    };

    return formatRelative(parseISO(date), new Date(), { locale });
  }

  static mFormat(date, formatStr = 'PP') {
    return format(date, formatStr, {
      locale: locales[getLanguage()]
    })
  }

  static mSubDays(date, value) {
    return subDays(date, value);
  }
}


export default DateFns;