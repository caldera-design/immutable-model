
import { Map } from 'immutable';

export default class Model {
    constructor(data) {
        if (data instanceof Model) {
            this.data = data.getData();
        }
        else if (Map.isMap(data)) {
            this.data = data;
        }
        else {
            this.data = new Map(data);
        }
    }

    toJS() {
        return this.data.toJS();
    }

    getData() {
        return this.data;
    }

    set(key, value) {
        return new this.constructor(this.data.set(key, value));
    }

    remove(key) {
        return new this.constructor(this.data.remove(key));
    }

    get(key) {
        return this.data.get(key);
    }

    setIn(keyPath, value) {
        return new this.constructor(this.data.setIn(keyPath, value));
    }

    getIn(keyPath) {
        return this.data.getIn(keyPath);
    }
}
