const getTagColorByType = (type: string) => {
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
      return '';
  }
};

export default getTagColorByType;
