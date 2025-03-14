import downloadTSV from '@/utils/TSV/download';

describe('downloadTSV', () => {
  let createElementSpy: jest.SpyInstance;
  let clickSpy: jest.Mock;

  beforeEach(() => {
    createElementSpy = jest.spyOn(document, 'createElement');
    clickSpy = jest.fn();
    createElementSpy.mockReturnValue({
      click: clickSpy,
      href: '',
      download: '',
    } as unknown as HTMLAnchorElement);

    global.URL.createObjectURL = jest.fn().mockReturnValue('mocked-url');
    global.URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should not trigger download if data is empty', async () => {
    await downloadTSV([], 'empty.tsv');
    expect(createElementSpy).not.toHaveBeenCalled();
    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should generate a TSV file and trigger download', async () => {
    const mockData = [
      { col1: 'data1', col2: 'data2' },
      { col1: 'data3', col2: 'data4' },
    ];

    await downloadTSV(mockData, 'test.tsv');

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('mocked-url');
  });

  it('should correctly format TSV content', async () => {
    const mockData = [
      { col1: 'data1', col2: 'data2' },
      { col1: 'data3', col2: null },
      { col1: '', col2: 'data5' },
    ];

    const blobSpy = jest.spyOn(global, 'Blob').mockImplementationOnce((content) => {
      expect(content?.[0]).toContain('col1\tcol2');
      expect(content?.[0]).toContain('data1\tdata2');
      expect(content?.[0]).toContain('data3\t');
      expect(content?.[0]).toContain('\tdata5');
      return {} as Blob;
    });

    await downloadTSV(mockData, 'formatted.tsv');
    expect(blobSpy).toHaveBeenCalled();
  });
});
