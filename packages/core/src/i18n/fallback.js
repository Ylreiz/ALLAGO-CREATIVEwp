export function resolveTranslation(resources, locale, fallbackLocale, key) {
  const current = resources ? resources[locale] : null;
  if (current && current.translation && Object.prototype.hasOwnProperty.call(current.translation, key)) {
    return { locale, value: current.translation[key] };
  }
  const fallback = resources ? resources[fallbackLocale] : null;
  if (fallback && fallback.translation && Object.prototype.hasOwnProperty.call(fallback.translation, key)) {
    return { locale: fallbackLocale, value: fallback.translation[key] };
  }
  return { locale: null, value: null };
}
