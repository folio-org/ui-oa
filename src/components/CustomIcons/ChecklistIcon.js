/* Based on the svg 'list.svg' in Icons.
 * Stripes does not provide a framework way to import SVGs as React components,
 * so we do it directly for now.
 */
const ChecklistIcon = (props) => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M8.85 5.8a3.7 3.7 0 0 1-3.7 3.7 3.7 3.7 0 0 1-3.7-3.7 3.7 3.7 0 0 1 3.7-3.7 3.7 3.7 0 0 1 3.7 3.7zM8.782 26.728A3.642 3.594 0 0 1 5.141 29.9a3.642 3.594 0 0 1-3.642-3.172A3.642 3.594 0 0 1 5.141 22.5a3.642 3.594 0 0 1 3.641 4.228zM8.854 16.725a3.627 3.803 0 0 1-3.727 3.169A3.627 3.803 0 0 1 1.5 16.725 3.627 3.803 0 0 1 5.127 12.5a3.627 3.803 0 0 1 3.727 4.225ZM13.343 3.197h17.4v5.288h-17.4ZM13.343 13.553h17.4v5.288h-17.4ZM13.343 23.556h17.4v5.288h-17.4Z" />
  </svg>
);

export default ChecklistIcon;
