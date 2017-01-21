Immutable Model and Collection Classes
---------------
Immutable `Model` and `Collection` classes for node or web.

Installation
============
Use [npm](https://www.npmjs.com/) to install:
```bash
npm install caldera-model
```

Usage
============
The `Model` and `Collection` classes are data structures that wrap javascript objects and arrays, respectively.

#### Model
| Method | Description
| --------------------------------
| `toJS()` | Returns a plain javascript object representing the data
| `get(key: string)` -> any | Returns the value for a key
| `set(key: string, value: any) -> Model` | Returns a new Model with the key/value pair
| `remove(key: string) -> Model` | Returns a new Model with the key/value removed
| `setIn(keyPath: [string], value: any) -> Model` | Returns a new Model with the keyPath set
| `getIn(keyPath: [string]) -> any` | Returns the value at the keyPath

#### Collection
| Method | Description
| --------------------------------
| `toJS()` | Returns a plain javascript object representing the data
| `get(index: number)` -> any | Returns the value at an index
| `set(index: number, value: any) -> Model` | Returns a new Collection with the index/value pair
| `push(value: any) -> Model` | Returns a new Collection with the value pushed
| `toArray() -> [any]` | Returns a new Collection with the value pushed
| `remove(predicate) -> Collection` | Returns a new Collection with any values removed where `predicate` returns true

Copyright and License
============
Code and documentation copyright 2017 Jon Brennecke. Code released under the MIT license. Docs released under Creative Commons.
