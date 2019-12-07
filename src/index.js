import axios from 'axios';

exports.getChannel = async (channelUri, options) => {
  // TODO: Add error handlers in case a Promise does not resolve.

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

exports.blockRepresentation = (block, options) => {
  let mutatedBlock = block;
  let representationHtml;

  if (block.class === 'Image' && block.image) {
    representationHtml = `
      <div className="Block block--image">
        <img src=${block.image.original.url} />
      </div>
    `
  } else if (block.class === 'Text') {
    representationHtml = `
      <div className="Block block--text">
        ${block.content}
      </div>
    `
  } else if (block.class === 'Link' && block.source) {
    representationHtml = `
      <div className="Block block--link">
        <a href=${block.source.url} target="_blank" rel="noopener noreferrer">
          <div className="Block--link__thumbnail">
            <img src=${block.image.display.url} />
            <p>${block.generated_title}</p>
          </div>
        </a>
      </div>
    `
  } else if (block.class === 'Attachment' && block.attachment) {
    representationHtml = `
      <div className="Block block--attachment">
        <a href=${block.attachment.url} target="_blank" rel="noopener noreferrer">
          <div className="Block--attachment__thumnbail">
            <img src=${block.image ? block.image.display.url : ''} />
            <p>${block.generated_title}</p>
          </div>
        </a>
      </div>
    `
  } else if (block.class === 'Media' && block.embed) {
    representationHtml = `
      <div className="Block block--media">
        ${block.content}
      </div>
    `
  } else if (block.class === 'Channel') {
    representationHtml = `
      <div className=${`block block--channel ${block.open ? 'open' : ''}`}>
        <a target="_blank" rel="noopener noreferrer" href=${`http://are.na/${block.user.slug}/${block.slug}`}>
          <p>${block.title}</p>
          <p>${block.user.full_name}</p>
          <p>${block.length} Blocks</p>
        </a>
      </div>
    `
  }

  // TODO: Decide whether original API response should be immutable (prob yes)
  // block = {
  //   ...block,
  //   html_representation: representationHtml
  // }

  return { block, representationHtml }
}