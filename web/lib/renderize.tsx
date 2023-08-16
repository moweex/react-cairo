export const renderize = ({
  element,
  renderElement,
}: {
  element?: string;
  renderElement?: () => JSX.Element;
}) => {
  if (renderElement) return renderElement;
  // eslint-disable-next-line react/display-name
  if (element) return () => <>{element}</>;
  return null;
};
