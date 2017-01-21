
import { Collection, Model } from '../src/LibraryEntryPoint';

describe('Test `Model` class', () => {
    it('should `toJS()` into a plain javascript object.`', () => {
        let data = {
            a: 'a',
            b: 'b'
        };
        let model = new Model(data);
        expect(model.toJS()).toEqual(data);
    });

    it('should be immutable.`', () => {
        let data = {
            a: 'a'
        };
        let model = new Model(data);
        expect(model).not.toEqual(model.set('b', 'b'));
    });

    it('should be able to remove properties.`', () => {
        let model = new Model({
            a: 'a'
        });
        let modelWithARemoved = model.remove('a');
        expect(modelWithARemoved.get('a')).toBeUndefined();
        expect(model.get('a')).toBe('a');
    });
});
