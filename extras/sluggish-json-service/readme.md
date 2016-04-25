## Sluggish json service

This repository contains implementation of a sluggish json service that can be used for performance testing.

## Installation

```
mvn clean install content-package:install
```

## Usage

Simply request for a [/content/performance-testing/turtle.json](http://localhost:4502/content/performance-testing/turtle.json?delayMin=100&delayMax=3000&message=xyz)


Supported parameters:
- delayMin (ms)
- delayMax (ms)
- message (string)

## Configuration of ContextHub store(s)

This content package includes one ContextHub store that is using sluggish json service. Mentioned [store](https://git.corp.adobe.com/akudlacz/code-snippets/blob/master/aem/sluggish-json-service/jcr_root/apps/performance-testing/store.sluggish-store.js#L23-L36) is configured by default to work in **synchronous** mode. That can be changed using [ContextHub's store config editor](http://localhost:4502/etc/cloudsettings/default/contexthub/performance-testing.edit.html).

Sample config:
```
{
    "service": {
        "timeout": "5000",
        "synchronous": true,
        "params": {
            "delayMin": "100",
            "delayMax": "300",
            "message": "some message here to distinguish a response"
        }
    }
}
```

It's possible to use more than one sluggish store - to do that simply copy and paste **/etc/cloudsettings/default/contexthub/performance-testing** node using [crxde](http://localhost:4502/crx/de/index.jsp#/etc/cloudsettings/default/contexthub/). Each store can have own configuration, so some of the stores can work **synchronously**, some **asynchronously** and of course response delays can also vary.

If you don't want to test store's initialization timeout - set the **timeout** value higher than **delayMax**.
