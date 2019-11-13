import assert from 'assert';
import { expect } from 'chai';


import { getChannel } from '../src/index'

const testChannelUri = 'https://www.are.na/devin-halladay/gd398-idf-the-affect-of-ideologies-on-designed-forms'
const testChannelSlug = 'gd398-idf-the-affect-of-ideologies-on-designed-forms'

describe('getChannel', () => {
  specify('should resolve', () => {
    return getChannel(testChannelUri).then(channel => {
      expect(channel.slug).to.equal(testChannelSlug)
    })
  });

  specify('should fetch all blocks', () => {
    return getChannel(testChannelUri).then(channel => {
      expect(channel.contents.length).to.equal(channel.length)
    })
  })
});