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

    await apiCall(channelUri, blocksPer, initialPage)
      .then(async (data) => {
        let channelData = data;

        let totalPages = Math.ceil(data.length / data.per);
        pageCount = blocksLimit == null ? totalPages : Math.ceil(blocksLimit / data.per);

        // pageCount = limitedPages <= totalPages ? limitedPages : totalPages;

        console.log(`total blocks: ${data.length}`);
        // console.log(`actual initial blocks: ${data.contents.length}`); 
        // console.log(`totalPages: ${totalPages}`);
        console.log(`pageCount: ${pageCount}`);

        console.log(`blocks per page: ${data.per}`);

        console.log(`blocksLimit: ${blocksLimit}`);


        if (pageCount > 1) {
          for (let i = currentPage; i <= pageCount; i++) {
            await apiCall(channelUri, blocksPer, i)
              .then((data) => {
                channelData.contents = [...channelData.contents, ...data.contents];
                if (blocksLimit !== null && i == pageCount) {
                  console.log('1');
                  channelData.contents = channelData.contents.slice(0, blocksLimit)
                  return channelData;
                } else if (i == pageCount) {
                  console.log('2');
                  console.log(i);
                  return channelData;
                }
              })
          }
        } else {
          console.log(3);
          return channelData;
        }
      }).catch(err => {
        console.log(err);
      })
  }
}