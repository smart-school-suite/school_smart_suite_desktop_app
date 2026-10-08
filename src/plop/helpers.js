export function registerHelpers(plop) {
  plop.setHelper('pascalCase', (text) =>
    text
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^(.)/, (c) => c.toUpperCase())
  );

  plop.setHelper('camelCase', (text) => {
    const pascal = text
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^(.)/, (c) => c.toUpperCase());
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  });
}