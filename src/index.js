import axios from 'axios';

exports.getChannel = (channelUri, shouldGetAllBlocks = true) => {
  async function apiCall(channel, page) {
    let re = /[^/]+(?=\/$|$)/;
    let channelSlug = re.exec(channelUri)[0];

    let res = await axios.get(`https://api.are.na/v2/channels/${channelSlug}?per=100&page=${page}`);
    let data = await res.data;
    return data;
  }

  return new Promise((resolve, reject) => {
    if (typeof channelUri !== 'string') {
      reject('You need to specify a channel URI as a string.')
    } else {
      const initialPage = 1;
      let currentPage = initialPage;
      let pageCount;

      apiCall(channelUri, initialPage)
        .then(data => {
          let channelData = data;
          
          pageCount = Math.ceil(data.length / data.per);

          if (pageCount > 1 && shouldGetAllBlocks === true) {
            for (let i = currentPage; i < pageCount; i++) {
              currentPage++;
              apiCall(channelUri, currentPage)
                .then(data => {
                  channelData.contents = [...channelData.contents, ...data.contents]
                  resolve(channelData);
                });
            }
          } else {
            resolve(channelData);
          }
        });
    }
  });
}