# Alice.si website

## Don't forget to install node modules using
```bash
$ npm install
```

## To build
```bash
$ gulp build
```

## To push new version of alice.si to github pages
```bash
$ rm -rf build
$ gulp build
$ cp -r build/ docs/
$ git add docs
$ git commit -m "website version update"
$ git push
```


## To watch website on 3000 port (for development)
```bash
$ gulp watch
```