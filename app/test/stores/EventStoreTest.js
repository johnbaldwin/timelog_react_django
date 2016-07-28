/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import alt from 'components/Dispatcher';
import { EventStore } from 'stores//EventStore';
import AltTestingUtils from 'alt-utils/lib/AltTestingUtils';

describe('EventStore', () => {

  let storeClass;

  // Instanciate a new store for every test
  beforeEach(() => {
    storeClass = AltTestingUtils.makeStoreTestable(alt, EventStore);
  });
});
