import assert from 'assert';
import { expect } from 'chai';


import { getChannel } from '../src/index'

const testChannelUri = 'https://www.are.na/devin-halladay/gd398-idf-the-affect-of-ideologies-on-designed-forms'
const testChannelSlug = 'gd398-idf-the-affect-of-ideologies-on-designed-forms'
const options = {
  blocksPer: 30,
  blocksLimit: 40
}

describe('getChannel', () => {
  specify('should resolve', () => {
    return getChannel(testChannelUri, options).then(channel => {
      expect(channel.slug).to.equal(testChannelSlug)
      expect(channel.contents.length).to.be.oneOf([options.blocksLimit, channel.length])
      console.log(`Fetched ${options.blocksLimit || channel.length}/${channel.length} blocks`);
    });
  });

  // specify('should fetch all blocks', (done) => {
  //   return getChannel(testChannelUri).then(channel => {
  //     expect(channel.contents.length).to.equal(channel.length)
  //     done()
  //   })
  // })
});