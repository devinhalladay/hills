import assert from 'assert';

import { getChannel } from '../src/index'

const testChannelUri = 'https://www.are.na/devin-halladay/gd398-idf-the-affect-of-ideologies-on-designed-forms'

describe('getChannel', () => {
  specify('getChannel should succeed', () => {
    return (
      getChannel(testChannelUri).then(channelUri => {
        assert.equal(channelUri, testChannelUri)
      })
    )
  });
});