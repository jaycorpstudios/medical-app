import cacheHelper from 'src/utils/cache';

describe('Utils Cache Helper Module', () => {

    const userObjString = '{"name":"Jay"}';

    const localStorageSpy = {
        setItem: jest.spyOn(Storage.prototype, 'setItem'),
        getItem: jest.spyOn(Storage.prototype, 'getItem').mockImplementation( () => userObjString),
    };

    it('should set item on LocalStorage', () => {
        cacheHelper.setItem( 'user', {name: 'Jay'} )
        expect(localStorageSpy.setItem).toHaveBeenCalledWith('villafeet-user', userObjString);
    });

    it('should get item from LocalStorage', () => {
        expect(cacheHelper.getItem( 'user' )).toMatchObject({name: 'Jay'});
    });

    afterAll( () => {
        localStorageSpy.getItem.mockReset();
    });

})