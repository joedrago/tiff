import * as standard from './tags/standard';
import * as exif from './tags/exif';
import * as gps from './tags/gps';

const tags = {
  standard,
  exif,
  gps
};

export default class IFD {
  constructor(kind) {
    if (!kind) {
      throw new Error('missing kind');
    }
    this.data = null;
    this.fields = new Map();
    this.kind = kind;
    this._map = null;
  }

  get(tag) {
    if (typeof tag === 'number') {
      return this.fields.get(tag);
    } else if (typeof tag === 'string') {
      return this.fields.get(tags[this.kind].tagsByName[tag]);
    } else {
      throw new Error('expected a number or string');
    }
  }

  get map() {
    if (!this._map) {
      this._map = {};
      const taglist = tags[this.kind].tagsById;
      for (var key of this.fields.keys()) {
        if (taglist[key]) {
          this._map[taglist[key]] = this.fields.get(key);
        }
      }
    }
    return this._map;
  }
}
