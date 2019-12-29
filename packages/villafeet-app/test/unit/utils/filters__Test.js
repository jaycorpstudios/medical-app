import { filterByName, normalize } from 'src/utils/filters';

describe('should filter by name', () => {
  describe('filterByName', () => {
    const users = [
      { name: 'Jay', firstSurname: 'Garcia' },
      { name: 'Daniel', firstSurname: 'Martinez' },
      { name: 'Antonio', firstSurname: 'Garcia' },
      { name: 'Manuel', firstSurname: 'Garza' },
    ];
    const expectedOutputForGar = [
      { name: 'Jay', firstSurname: 'Garcia' },
      { name: 'Antonio', firstSurname: 'Garcia' },
      { name: 'Manuel', firstSurname: 'Garza' },
    ];

    it('should filter by name', () => {
      expect(users.filter(filterByName('daniel'))).toMatchObject([{ name: 'Daniel', firstSurname: 'Martinez' }]);
      expect(users.filter(filterByName('Jay Garcia'))).toMatchObject([{ name: 'Jay', firstSurname: 'Garcia' }]);
      expect(users.filter(filterByName('Gar'))).toMatchObject(expectedOutputForGar);
      expect([{ name: 'Carlos' }].filter(filterByName('Hector'))).toMatchObject([]);
    });

    it('should return all results on uninitialized filter', () => {
      const emptyFilter = filterByName();
      expect(users.filter(emptyFilter)).toEqual(users);
    });
  });

  describe('normalize', () => {
    it('should normilize a string removing accented characters and transforming to lowercase', () => {
      expect(normalize('MARIA OCHOA')).toEqual('maria ochoa');
      expect(normalize('Benítez')).toEqual('benitez');
      expect(normalize('BEnItEz')).toEqual('benitez');
      expect(normalize()).toEqual('');
    });
  });
});
