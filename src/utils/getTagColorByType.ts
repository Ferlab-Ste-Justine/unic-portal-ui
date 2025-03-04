const getTagColorByType = (type?: string, defaultColor?: string) => {
  switch (type) {
    case 'warehouse':
      return 'orange';
    case 'research_project':
      return 'cyan';
    case 'eqp':
      return 'blue';
    case 'source_system':
      return 'purple';
    default:
      return defaultColor || '';
  }
};

export default getTagColorByType;
