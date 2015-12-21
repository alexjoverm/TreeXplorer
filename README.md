# TreeXplorer

A self-made web-based File Explorer made in Javascript. It is made for fun to help anybody working with MVC, DOM manipulation and
the difficulty to deal with background images to show a line structure.

An equivalent jQuery plugin is [jsTree](https://www.jstree.com/).

**Features**:

* Made using MVC, Observer and CommonJS patterns for a clean and organized code.
* A `Gulpfile.js` was created to automate everything for development and build processes.
* Uses jQuery for DOM manipulation
* Currently only supports a file structure given in the form `{ name: "blabla", children: [...] }` *(see js/randomFiles.json for an example)*


### Instructions

* Download:

```bash
git clone https://github.com/alexjoverm/TreeXplorer.git
```

* You need to have `node.js` installed.
* You also need `gulp`. If you don't have it, run:

```bash
npm install -g gulp
```

* Now install the required packages:

```bash
npm install
```

* Run the project:

```bash
gulp
```