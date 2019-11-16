import axios from 'axios';

exports.getChannel = (channelUri, options) => {
  var options = options || {};
  let blocksPer = options.blocksPer == null ? 100 : options.blocksPer;
  let blocksLimit = options.blocksLimit || null;

  async function apiCall(channel, per, page) {
    let re = /[^/]+(?=\/$|$)/;
    let channelSlug = re.exec(channelUri)[0];

    let res = await axios.get(`https://api.are.na/v2/channels/${channelSlug}?per=${blocksPer}&page=${page}`);
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

      apiCall(channelUri, blocksPer, initialPage)
        .then(data => {
          let channelData = data;

          let totalPages = Math.ceil(data.length / data.per);
          pageCount = blocksLimit == null ? totalPages : Math.ceil(blocksLimit / data.per);
          
          // pageCount = limitedPages <= totalPages ? limitedPages : totalPages;

          console.log(`total blocks: ${data.length}`);          
          console.log(`actual initial blocks: ${data.contents.length}`); 
          console.log(`totalPages: ${totalPages}`);
          console.log(`pageCount: ${pageCount}`);
          
          console.log(`blocks per page: ${data.per}`);

          if (pageCount > 1) {
            for (let i = currentPage; i < pageCount; i++) {              
              currentPage++

              apiCall(channelUri, blocksPer, currentPage)
                .then(data => {
                  channelData.contents = [...channelData.contents, ...data.contents];
                  resolve(channelData);
                });
            }
          } else {
            resolve(channelData);
          }
        }).catch(err => {
          // let errJson = err.json();
          // // Promise.reject(errJson.then((err) => { return err.data }));
          // console.log(errJson);
          console.log(err);
          
          
        })
    }
  });


}