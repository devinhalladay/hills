import assert from 'assert';
import { expect } from 'chai';


import { getChannel } from '../src/index'

const testChannelUri = 'https://www.are.na/devin-halladay/gd398-idf-the-affect-of-ideologies-on-designed-forms'
const testChannelSlug = 'gd398-idf-the-affect-of-ideologies-on-designed-forms'
const options = {
  blocksPer: 20,
}

describe('getChannel', () => {
  it('should resolve', async () => {
    const channel = await getChannel(testChannelUri, options)
    console.log(channel);
    // console.log(`Fetched ${options.blocksLimit || channel.length}/${channel.length} blocks`);
    channel.slug.should.equal(testChannelSlug)
    channel.contents.length.should.be.oneOf([options.blocksLimit, channel.length])

  });

  // specify('should fetch all blocks', (done) => {
  //   return getChannel(testChannelUri).then(channel => {
  //     expect(channel.contents.length).to.equal(channel.length)
  //     done()
  //   })
  // })
});