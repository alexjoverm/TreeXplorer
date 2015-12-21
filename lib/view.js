/**
 * @module js/TreeModel
 */

var $ = require('jquery')
    sprintf = require('sprintf-js').sprintf;


var TreeModel = require('./model');

/**
 * TreeView is the View module of TreeXplorer. It holds all DOM manipulation and listens to the model changes (Observer)
 * @param model
 * @class
 */
var TreeView = function(model){
    this.model = model;
    this.element = model.element;
    this.baseElement = $('<ul class="tree-view"></ul>');
    this.dirElement = '<li class="tree-dir"><i class="tree-sprite tree-folder"></i> <span class="title">%s</span> </li>';
    this.fileElement = '<li class="tree-filetype"><i class="tree-sprite tree-file"></i> <span class="title">%s</span> </li>';

    // Events
    this.element.on('init', this.initTree.bind(this));
};

TreeView.prototype = {

    /**
     * Insert direct children nodes given a piece of json and its container
     * @param nodes
     * @param container
     */
    insertNodes: function(nodes, container){
        var list = this.baseElement.clone();

        for(var i=0; i< nodes.length; i++){
            if(nodes[i].children) { // is directory
                var elem = $(sprintf(this.dirElement, nodes[i].name));
                elem.children('.tree-folder').on('click', this.openCloseFolder.bind(this));
            }
            else{ // is a file
                var elem = $(sprintf(this.fileElement, nodes[i].name));
            }

            list.append(elem);
        }
        container.append(list);
    },


    /**
     * Open or Closes the clicked folder
     * @param ev
     */
    openCloseFolder: function(ev){
        ev.stopPropagation();
        var elem = $(ev.target);
        var elem = elem.closest('li.tree-dir'); // Get closest li parent
        elem.toggleClass('open');
        if(elem.children('.tree-folder').length > 0){
            elem.children('.tree-folder').removeClass('tree-folder').addClass('tree-folder-open');
            var path = this.model.getPath(elem);
            var node = this.model.loadSingleNode.call(this.model, path);
            if(node && node.children)
                this.insertNodes(node.children, elem);
        }
        else{
            elem.children('ul').remove();
            elem.children('.tree-folder-open').removeClass('tree-folder-open').addClass('tree-folder');
        }

    },


    // ***************** EVENTS HANDLING **********************

    /**
     * Catches "init" event and load nodes.
     */
    initTree: function(){
        var nodes = this.model.getNodes();
        this.insertNodes(nodes, this.element);
    }

};

module.exports = TreeView;