import { it } from 'mocha';
import { expect } from 'chai';

import { getChannel, blockRepresentation } from '../src/index'

const testChannelUri = 'https://www.are.na/devin-halladay/gd398-idf-the-affect-of-ideologies-on-designed-forms'
const testChannelSlug = 'gd398-idf-the-affect-of-ideologies-on-designed-forms'

const getChannelOptions = {
  blocksPer: 20,
  blocksLimit: 60
}

const blockRepresentationOptions = {

}

describe('getChannel', () => {
  // TODO: Properly test for Promise resolution using a response
  // code rather than channel slug.
  it('resolves', () => {
    getChannel(testChannelUri, getChannelOptions).then((channel) => {
      expect(channel.slug).to.equal(testChannelSlug);
    })
  });

  specify('should fetch all blocks', () => {
    return getChannel(testChannelUri).then(channel => {
      expect(channel.contents.length).to.be.oneOf([getChannelOptions.blocksLimit, channel.length])
    })
  })
});

describe('blockRepresentation', () => {
  it('works', () => {
    getChannel(testChannelUri, blockRepresentationOptions).then((channel) => {
      const chosenBlock = channel.contents[Math.floor(Math.random() * Math.floor(channel.contents.length))]
      
      const representation = blockRepresentation(chosenBlock);

      console.log(representation);
    })
  })
})