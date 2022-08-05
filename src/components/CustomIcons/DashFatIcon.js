/* Based on the svg 'dash-fat.svg' in Icons.
 * Stripes does not provide a framework way to import SVGs as React components,
 * so we do it directly for now.
 */
const DashFatIcon = (props) => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7.646 12.493v.016a3.073 3.5 0 0 0-3.052 3.498 3.073 3.5 0 0 0 3.073 3.5 3.073 3.5 0 0 0 .17-.014h16.326a3.073 3.5 0 0 0 .17.014 3.073 3.5 0 0 0 3.073-3.5 3.073 3.5 0 0 0-3.073-3.5 3.073 3.5 0 0 0-.005 0v-.014z" />
  </svg>
);

export default DashFatIcon;
