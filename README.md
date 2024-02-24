## MMM-AACPSBus

Read the AACPS Outage Website, and display on the screen if the bus isnt running


## installation

```
Open a terminal session, navigate to your MagicMirror's modules folder and execute git clone https://github.com/smiles3983/MMM-AACPSBus.git, a new folder called MMM-AACPSBus will be created.

Activate the module by adding it to the config.js file as shown below.
```

## Configuration

```
{
    module: "MMM-AACPSBus",
    position: "top_right", // Choose any position
    config: {
        url: "https://busstops.aacps.org/public/BusRouteIssues.aspx", // The web page URL to check
        bus: "111", // The bus number to look for
        image: "https://tse4.mm.bing.net/th/id/OIG3.lMh29Wgi3XZZsAbBLOV8?w=270&h=270&c=6&r=0&o=5&pid=ImgGn", // Bus icon
        imageSize: "100%", // size of the image.  Default is 100%
        updateInterval: 60 * 1000, // How often to check the web page (in milliseconds).  Default is 60 seconds
    },
}

```
