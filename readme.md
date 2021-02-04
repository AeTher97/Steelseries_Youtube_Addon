# Steelseries YouTube Addon
**Steelseries YouTube Addon** is a Chrome browser extension that displays data about song currently playing on Steelseries engine devices displays.

Steelseries API finder is required for mor information see ***installation***.

### Compatibility
Extension works on both YouTube and YouTube Music. However, it is limited to Chrome browser. In the future it might be extended to support other browsers if possible.

### Data
Extension displays following information on a device display:

- Title of the song.
- Artist.
- Current time and length.
- Song progress bar.
- If a song is paused.

## Installation

### Extension

Extension can be added to Chrome at [chrome web store](https://extension).

### Steelseries API Finder


**IMPORTANT**  
Software **cannot** function without **Steelseries API finder** that can be downloaded from [releases](https://github.com/AeTher97/Steelseries_Youtube_Addon/releases) section of this page.  

**API finder** is a Windows service that reads Steelseries engine local address from `coreProps.json`. 

#### Exe file
- Download exe file.
- Choose installation address.
- Install service.

Service wil start automatically with Windows and host Steelseries engine address as string on `localhost:55555`.

####Building from source

[Node.js](https://nodejs.org/en/) is required to perform installation.
- Clone the repository using
`git clone https://github.com/AeTher97/Steelseries_Youtube_Addon.git`   
- Install Windows service using `npm install`
  
### Uninstalling

#### Exe file
- Use uninstaller from installation folder.

#### Source
- run node `src/unistall.js` in `Service` folder.


## Limitations
- Extension required Windows service installed on a PC to function that might be solved in the future.
- Service is not available on Linux or macOS.
