# Optimus Media Manager

A Vue plugin which interfaces with [optimuscms/media](https://github.com/optimuscms/media) api using [@optimuscms/ui](https://github.com/optimuscms/ui) components.

## Installation

#### Install the package:

```bash
# npm
npm install @optimuscms/media-manager --save

# yarn
yarn add @optimuscms/media-manager
```

#### Install the Vue plugin:

```js
import MediaManager from '@optimuscms/media-manager';

Vue.use(MediaManager, {
    store: vuexStore
});
```

Within your application include the following component:

```vue
<media-manager></media-manager>
```

#### Import the SCSS:

```scss
@import "~@optimuscms/media-manager/src/sass/_all";
```

## Usage

### Components

**Media picker:**

```vue
<media-picker v-model="media"></media-picker>
```

Props:
  * `value|(array,number)`: accepts a single Id or array of Ids
  * `accept|(array,string)`: accept a single extension or array of extensions
  * `limit|number`: Limit the number of media items which can be selected, defaults to `1`
  * `preview|boolean`: If limit is `1` and choosen media is an image, enable a thumbnail preview

### Accessing the plugin:

```js
// Globally
Vue.mediaManager.open();

// On an instance
this.$mediaManager.open();
```

### Methods

**open** - Opens the media manager

Accepted parameters:
  * `limit|number|required`
  * `accept|array`: Array of media extensions the user is allowed to select
  * `selected|array`: Array of media Ids which will be marked as selected

**onOpen** - Called when open is triggered, accepts a `callback`  

**close** - Closes the media manager  
**onClose** - Called when closes is triggered, accepts a `callback`  
**destroy**  - Called before the media manager is destoryed, accepts a `callback`  

**mediaSelected** - Fired when media is selected in the media manager, returns an `array` of Ids    
**onMediaSelected** - Called when media is selected, accepts a `callback`  
**removeMediaSelectedListener** - Removes the media selected listener, accepts a `callback`  

**mediaDeleted** - Fired when media is deleted, returns an `array` of Ids  
**onMediaDeleted** - Called when media is deleted, accepts a `callback`  

**setActiveMedia** - Sets active media, accepts an `array` of media items  
**getActiveMedia** - Returns single media object from the active media, accepts a media Id  
**clearActiveMedia** - Clears the active media items  

**imageExtensions** - Returns an array of image extensions

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
