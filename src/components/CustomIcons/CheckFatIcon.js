/* Based on the svg 'check-fat.svg' in Icons.
 * Stripes does not provide a framework way to import SVGs as React components,
 * so we do it directly for now.
 */
const CheckFatIcon = (props) => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M24.407 7.359a3.5 3.5 0 0 0-2.252.955 3.5 3.5 0 0 0-.142.156l-7.977 7.55-3.427-3.638-.014.012a3.5 3.5 0 0 0-.115-.129 3.5 3.5 0 0 0-4.948-.144 3.5 3.5 0 0 0-.146 4.947 3.5 3.5 0 0 0 .168.154l3.4 3.608-.015.013 4.812 5.084 4.133-3.912.957-.902-.002-.002 7.984-7.557-.02-.021a3.5 3.5 0 0 0 .165-.135 3.5 3.5 0 0 0 .137-4.947 3.5 3.5 0 0 0-2.698-1.092Z" />
  </svg>
);

export default CheckFatIcon;
