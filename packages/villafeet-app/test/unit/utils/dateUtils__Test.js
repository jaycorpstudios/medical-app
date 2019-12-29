import dateUtils from 'src/utils/dateUtils';

describe('Utils Date Helper Module', () => {
  it('should parse a string from a timestamp', () => {
    expect(dateUtils.getFormatedDate(1540299600000)).toBe('Martes 23 de Octubre 2018');
    expect(dateUtils.getFormatedDate(1543669200000)).toBe('Sábado 1 de Diciembre 2018');
  });

  it('should return empty string when timestamp is invalid', () => {
    expect(dateUtils.getFormatedDate()).toBe('');
    expect(dateUtils.getFormatedDate(null)).toBe('');
  });
});
