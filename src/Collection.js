
import { List } from 'immutable';
import map from 'lodash/map';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import isFunction from 'lodash/isFunction';
import filter from 'lodash/filter';
import isUndefined from 'lodash/isUndefined';
import invariant from 'invariant';
import remove from 'lodash/remove';
import take from 'lodash/take';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import uniqBy from 'lodash/uniqBy';
import slice from 'lodash/slice';

import Model from './Model';

export default class Collection {

    constructor(data) {
        invariant(!isUndefined(this.constructor.Model), 'Model cannot undefined.');
        if (data instanceof Collection) {
            this.data = data.getData();
        }
        else if (List.isList(data)) {
            this.data = data;
        }
        else {
            this.data = new List(map(data, (d) => {
                const model = d instanceof Model ? d : new this.constructor.Model(d);
                return model;
            }));
        }
    }

    get length() {
        return this.data.size || 0;
    }

    toJS() {
        return this.data.toJS();
    }

    set(index, value) {
        const model = value instanceof Model ? value : new this.constructor.Model(value);
        return new this.constructor(this.data.set(index, model));
    }

    get(index) {
        return this.data.get(index);
    }

    push(value) {
        const model = value instanceof Model ? value : new this.constructor.Model(value);
        return new this.constructor(this.data.push(model));
    }

    toArray() {
        return this.data.toArray();
    }

    remove(predicate) {
        return new this.constructor(remove(this.data.toArray(), predicate));
    }

    removeById(id) {
        return this.remove(item => isFunction(item.getId) && item.getId() !== id);
    }

    findById(id) {
        return this.find(item => isFunction(item.getId) && item.getId() === id);
    }

    findIndexById(id) {
        return this.findIndex(item => isFunction(item.getId) && item.getId() === id);
    }

    find(predicate) {
        return find(this.data.toArray(), predicate);
    }

    filter(predicate) {
        return new this.constructor(filter(this.data.toArray(), predicate));
    }

    findIndex(predicate) {
        return findIndex(this.data.toArray(), predicate);
    }

    map(predicate) {
        return new this.constructor(map(this.data.toArray(), predicate));
    }

    concat(collection) {
        const collectionData = collection.toArray ? collection.toArray() : collection;
        const data = new this.constructor(collectionData);
        return new this.constructor(this.data.concat(data.toArray()));
    }

    addOrReplaceById(id, value) {
        const index = this.findIndexById(id);
        if (index !== -1) {
            return this.set(index, value);
        }
        return this.push(value);
    }

    getData() {
        return this.data;
    }

    take(n) {
        return new this.constructor(take(this.data.toArray(), n));
    }

    sortBy(predicate) {
        return new this.constructor(sortBy(this.data.toArray(), predicate));
    }

    reverse() {
        return new this.constructor(reverse(this.data.toArray()));
    }

    uniqBy(predicate) {
        return new this.constructor(uniqBy(this.data.toArray(), predicate));
    }

    removeDuplicates() {
        return this.uniqBy(a => a.id || a.getId());
    }

    findByName(name) {
        return this.find(item => (item.name || item.getName()) === name);
    }

    findIndexByName(name) {
        return this.findIndex(item => isFunction(item.getName) && item.getName() === name);
    }

    addOrReplaceByName(name, item) {
        const index = this.findIndexByName(name);
        if (index !== -1) {
            return this.set(index, item);
        }
        return this.push(item);
    }

    slice(start = 0, end = this.length) {
        return new this.constructor(slice(this.toArray(), start, end));
    }
}
