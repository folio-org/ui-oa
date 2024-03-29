/* Based on the svg 'cross-fat.svg' in Icons.
 * Stripes does not provide a framework way to import SVGs as React components,
 * so we do it directly for now.
 */
const CrossFatIcon = (props) => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M5.233 6.133a3.332 3.5 45 0 0-.119 4.831 3.332 3.5 45 0 0 .08.07l5.856 5.855-5.95 5.95.008.007a3.5 3.332 45 0 0 .13 4.815 3.5 3.332 45 0 0 4.832.12 3.5 3.332 45 0 0 .069-.081L16 21.839l5.861 5.861a3.332 3.5 45 0 0 .07.08 3.332 3.5 45 0 0 4.83-.119 3.332 3.5 45 0 0 .12-4.83l.006-.005-5.937-5.937 5.855-5.856a3.5 3.332 45 0 0 .08-.069 3.5 3.332 45 0 0-.118-4.83 3.5 3.332 45 0 0-4.83-.12l-.005-.006L16 11.939l-5.944-5.944-.007.007a3.332 3.5 45 0 0-4.816.131Z" />
  </svg>
);

export default CrossFatIcon;
