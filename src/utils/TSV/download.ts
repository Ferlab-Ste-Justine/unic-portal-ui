const download = async (data: Record<string, any>[], filename: string) => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const tsvRows = data.map((row) => headers.map((header) => String(row[header] ?? '')).join('\t'));
  const tsvContent = [headers.join('\t'), ...tsvRows].join('\n');
  const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
};

export default download;
