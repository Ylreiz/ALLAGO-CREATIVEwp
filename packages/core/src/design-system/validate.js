/**
 * Design system token validation — @allago/core
 * First block of the reusable design system.
 *
 * Pure helper functions. No external dependencies.
 */

export const REQUIRED_PRIMITIVE_TOKENS = [
  '--palette-neutral-50',
  '--palette-neutral-100',
  '--palette-neutral-200',
  '--palette-neutral-300',
  '--palette-neutral-400',
  '--palette-neutral-500',
  '--palette-neutral-600',
  '--palette-neutral-700',
  '--palette-neutral-800',
  '--palette-neutral-900',
  '--palette-neutral-white',
  '--font-family-sans',
  '--font-family-serif',
  '--font-size-xs',
  '--font-size-sm',
  '--font-size-base',
  '--font-size-lg',
  '--font-size-xl',
  '--font-size-2xl',
  '--font-weight-regular',
  '--font-weight-medium',
  '--font-weight-semibold',
  '--font-weight-bold',
  '--line-height-tight',
  '--line-height-base',
  '--line-height-loose',
  '--letter-spacing-normal',
  '--letter-spacing-wide',
  '--space-1',
  '--space-2',
  '--space-3',
  '--space-4',
  '--space-5',
  '--space-6',
  '--space-8',
  '--space-12',
  '--container-max',
  '--radius-sm',
  '--radius-md',
  '--radius-lg',
  '--shadow-1',
  '--shadow-2',
  '--shadow-3',
  '--z-base',
  '--z-raised',
  '--z-overlay',
  '--z-modal',
  '--z-toast',
  '--motion-duration-fast',
  '--motion-duration-base',
  '--motion-duration-slow',
  '--motion-easing-standard',
  '--motion-easing-emphasized',
];

export const REQUIRED_SEMANTIC_TOKENS = [
  '--color-surface',
  '--color-surface-raised',
  '--color-surface-overlay',
  '--color-text',
  '--color-text-muted',
  '--color-text-on-action',
  '--color-action-primary',
  '--color-action-primary-hover',
  '--color-action-primary-contrast',
  '--color-action-secondary-bg',
  '--color-action-secondary-text',
  '--color-state-success-bg',
  '--color-state-success-fg',
  '--color-state-warning-bg',
  '--color-state-warning-fg',
  '--color-state-error-bg',
  '--color-state-error-fg',
];

function stripCssComments(css) {
  let source = String(css);
  let result = '';
  for (;;) {
    const start = source.indexOf('/*');
    if (start === -1) {
      result = result + source;
      break;
    }
    result = result + source.slice(0, start);
    const end = source.indexOf('*/', start + 2);
    if (end === -1) {
      source = '';
      break;
    }
    source = source.slice(end + 2);
  }
  return result;
}

export function validateTokenDeclarations(cssText, requiredTokens) {
  const tokens = requiredTokens || REQUIRED_PRIMITIVE_TOKENS;
  const withoutComments = stripCssComments(cssText);
  const declarations = withoutComments
    .split(';')
    .map((declaration) => declaration.trim())
    .filter(Boolean);
  const declared = new Set();
  for (const declaration of declarations) {
    const tokenStart = declaration.indexOf('--');
    if (tokenStart === -1) {
      continue;
    }
    const separatorIndex = declaration.indexOf(':', tokenStart);
    if (separatorIndex === -1) {
      continue;
    }
    const property = declaration.slice(tokenStart, separatorIndex).trim();
    if (property.startsWith('--')) {
      declared.add(property);
    }
  }
  const missing = tokens.filter((token) => !declared.has(token));
  return { valid: missing.length === 0, missing };
}

function normalizeHex(hex) {
  let value = String(hex).trim().replace('#', '');
  if (value.length === 3) {
    value = value.split('').map((character) => character + character).join('');
  }
  const intValue = parseInt(value, 16);
  return [(intValue >> 16) & 255, (intValue >> 8) & 255, intValue & 255];
}

function channelLuminance(channelValue) {
  const channel = channelValue / 255;
  return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
}

function relativeLuminance(rgb) {
  return 0.2126 * channelLuminance(rgb[0]) + 0.7152 * channelLuminance(rgb[1]) + 0.0722 * channelLuminance(rgb[2]);
}

export function calculateContrastRatio(fgHex, bgHex) {
  const foreground = relativeLuminance(normalizeHex(fgHex));
  const background = relativeLuminance(normalizeHex(bgHex));
  const lighter = Math.max(foreground, background);
  const darker = Math.min(foreground, background);
  return (lighter + 0.05) / (darker + 0.05);
}

export function validateContrastRatio(fgHex, bgHex, minimum) {
  const ratio = calculateContrastRatio(fgHex, bgHex);
  const threshold = minimum === undefined ? 4.5 : minimum;
  return { ratio, valid: ratio >= threshold };
}

export function validateStateContrast(stateTokens, minimum) {
  const threshold = minimum === undefined ? 4.5 : minimum;
  const results = {};
  for (const state of ['success', 'warning', 'error']) {
    const definition = stateTokens[state];
    const background = definition ? definition.background : null;
    const foreground = definition ? definition.foreground : null;
    if (!background || !foreground) {
      results[state] = { valid: false, missing: true, background: null, foreground: null };
      continue;
    }
    const ratio = calculateContrastRatio(foreground, background);
    results[state] = { background: background, foreground: foreground, ratio: ratio, valid: ratio >= threshold };
  }
  return results;
}
