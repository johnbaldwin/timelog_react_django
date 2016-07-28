/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import alt from 'components/Dispatcher';
import { EventsStore } from 'stores//EventsStore';
import AltTestingUtils from 'alt-utils/lib/AltTestingUtils';

describe('EventsStore', () => {

  let storeClass;

  // Instanciate a new store for every test
  beforeEach(() => {
    storeClass = AltTestingUtils.makeStoreTestable(alt, EventsStore);
  });
});
