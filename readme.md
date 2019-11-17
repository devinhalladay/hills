<p align="center"><img src="https://github.com/devinhalladay/hills/blob/master/hill.svg" width="400" /></p>

<h1 align="center">a place to watch the sun rise</h1>
<p align="center"><strong>hill</strong> is a third-party design ecosystem for tools built on top of are.na</p>

---

figma file for shared components: [hill design ecosystem](https://www.figma.com/file/R2WmAz2mvW9TV2hyJZztMA/hill-design-ecosystem?node-id=0%3A1)

## intent & goals
1. make building tools on top of are.na easy, accessible, and fun
2. contribute back to the community by listening for and addressing its needs, but spoken and un-

## what is a hill?
a hill is an are.na tool built within the hill design ecosystem. *note: if a tool consumes hill apis but does not consume hill ui, it is not, in fact, a hill.*

## what lives on hills?
### api helpers
hill comes with a set of api helpers that make consuming and interfacing with the are.na api dead easy. all you need to do is provide a channel slug and a callback, and hill will do the rest, like any good ecosystem.

### design ecosystem
the hill design ecosystem consists of two parts:

**hill ui:** this is the design system apps can consume to make themselves visually and functionally consistent with hills, making it, well, a hill.

**block representations**: block representations are immutable representations of are.na blocks that are style-consistent with the actual are.na ui. that means they have symbolic border color, correct type sizing, metadata, images, etc.

## docs
### `getChannel` — fetch a channel

```js
import { getChannel } from 'hills'

getChannel('proletarian-bourgeois')
  .then((response) => {
    // success!
    console.log(response)
  })
```

#### arguments
- `channelUri` (string: **required**) - either a fully-qualified are.na channel url `(`https://www.are.na/devin-halladay/proletarian-bourgeois`) or an are.na channel slug (`proletarian-bourgeois`)
- `shouldGetAllBlocks` (bool) - if `false`, only returns the first 100 blocks from the channel
