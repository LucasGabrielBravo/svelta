import lodash from 'lodash';

const { random } = lodash

export function generateId() {
  return random(1000000, 9999999, false).toString(36)
}	