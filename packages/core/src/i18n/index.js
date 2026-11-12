import { interpolate } from './interpolate.js';
import { resolveTranslation } from './fallback.js';

export function createI18n({ defaultLocale = 'es', fallbackLocale = 'es', resources = {} } = {}) {
  let locale = defaultLocale;

  function t(key, params) {
    const resolved = resolveTranslation(resources, locale, fallbackLocale, key);
    if (typeof resolved.value !== 'string') {
      return key;
    }
    return params ? interpolate(resolved.value, params) : resolved.value;
  }

  function getLocale() {
    return locale;
  }

  function setLocale(next) {
    const valid = typeof next === 'string' && Object.prototype.hasOwnProperty.call(resources, next);
    if (!valid) {
      return false;
    }
    locale = next;
    return true;
  }

  const locales = Object.keys(resources);

  return { t, getLocale, setLocale, locales };
}
