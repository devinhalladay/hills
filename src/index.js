import axios from 'axios';

exports.getChannel = async (channelUri, options) => {
  var options = options || {};
  let blocksPer = options.blocksPer == null ? 100 : options.blocksPer;
  let blocksLimit = options.blocksLimit || null;

  async function apiCall(channel, per, page) {
    let re = /[^/]+(?=\/$|$)/;
    let channelSlug = re.exec(channelUri)[0];

    let res = await axios.get(`https://api.are.na/v2/channels/${channelSlug}?per=${blocksPer}&page=${page}`);
    let data = res.data;
    return data;
  }

  if (typeof channelUri !== 'string') {
    reject('You need to specify a channel URI as a string.')
  } else {
    const initialPage = 1;
    let currentPage = initialPage;
    let pageCount;

    let initialApiCall = await apiCall(channelUri, blocksPer, initialPage);
    let channelData = initialApiCall;
    let totalPages = Math.ceil(channelData.length / channelData.per);
    let totalBlockCount = channelData.length;
    pageCount = blocksLimit == null ? totalPages : Math.ceil(blocksLimit / channelData.per);

    if (pageCount > 1) {
      for (let i = currentPage; i <= pageCount; i++) {
        let newApiCall = await apiCall(channelUri, blocksPer, i);
        let newApiData = newApiCall;
        
        channelData.contents = [...channelData.contents, ...newApiData.contents];

        if (blocksLimit !== null && i == pageCount - 1) {
          channelData.contents = channelData.contents.slice(0, blocksLimit)
          return channelData;
        } else if (i == pageCount - 1) {
          channelData.contents = channelData.contents.slice(0, totalBlockCount)
          return channelData;
        }
      }
    } else {
      return channelData;
    }
  }
}