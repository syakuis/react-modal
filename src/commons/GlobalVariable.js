/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 9. 1.
 */

import immutable from 'immutable';

window.GV = {};

class GlobalVariable {
  constructor(target, defaultValue = {}) {
    this.target = target;
    this.defaultValue = defaultValue;

    if (!Object.prototype.hasOwnProperty.call(window.GV, target)) {
      this.reset();
    }
  }

  set(key, value) {
    window.GV[this.target][key] = value;
  }

  setArray(key, value) {
    if (!Object.prototype.hasOwnProperty.call(window.GV[this.target], key)) {
      window.GV[this.target][key] = [];
    }
    window.GV[this.target][key].push(value);
  }

  merge(key, value) {
    window.GV[this.target][key] = immutable.fromJS({
      ...window.GV[this.target][key], ...value,
    }).toJS();
  }

  get(key) {
    return window.GV[this.target][key];
  }

  del(key) {
    if (Object.prototype.hasOwnProperty.call(window.GV[this.target], key)) {
      delete window.GV[this.target][key];
    }
  }

  reset() {
    window.GV[this.target] = immutable.fromJS({ ...this.defaultValue }).toJS();
  }
}

export default GlobalVariable;
