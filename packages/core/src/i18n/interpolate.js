export function interpolate(template, params) {
  if (typeof template !== 'string') {
    return template;
  }
  const values = params || {};
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    const value = Object.prototype.hasOwnProperty.call(values, key) ? values[key] : undefined;
    if (value === undefined || value === null) {
      return '';
    }
    return String(value);
  });
}
