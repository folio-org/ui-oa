/* Based on the svg 'list.svg' in Icons.
 * Stripes does not provide a framework way to import SVGs as React components,
 * so we do it directly for now.
 */
const ChecklistIcon = (props) => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="5.2" cy="5.8" r="3.7" />
    <circle cx="5.2" cy="16" r="3.7" />
    <circle cx="5.2" cy="26" r="3.7" />
    <path
      d="M16 5.8h12M16 16h12M16 26h12"
      fill="none"
      stroke="#000"
      strokeLinecap="square"
      strokeWidth="5.269"
    />
  </svg>
);

export default ChecklistIcon;
