import assert from 'assert';
import { expect } from 'chai';


import { getChannel } from '../src/index'

const testChannelUri = 'https://www.are.na/devin-halladay/gd398-idf-the-affect-of-ideologies-on-designed-forms'
const testChannelSlug = 'gd398-idf-the-affect-of-ideologies-on-designed-forms'
const options = {
  blocksPer: 20,
  blocksLimit: 60
}

describe('getChannel', () => {
  it('resolves', () => {
    getChannel(testChannelUri, options).then((channel) => {
      expect(channel.slug).to.equal(testChannelSlug);
    })
  });

  specify('should fetch all blocks', () => {
    return getChannel(testChannelUri).then(channel => {
      expect(channel.contents.length).to.be.oneOf([options.blocksLimit, channel.length])
    })
  })
});