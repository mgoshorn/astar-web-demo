'use strict'

let container;
let canvas;
let context;
let map = new AstarMap();
let activeMap = map;
let animation = new AnimationSettings();

let mouseActiveEvent;

const defaultLayoutSettings = {
    sizeStyle: true,
    nodeHeight: 50,
    nodeWidth: 50,
    nodeX: 120,
    nodeY: 60,
    margin: 2,
    originNode: [3, 5],
    goalNode: [115, 55]
};

const defaultColorSettings = {
    untracked: new Color(60, 60, 60),
    unnavigable: new Color(0, 0, 0),
    start: 'green',
    end: 'black',
    minColor: 'navy',
    maxColor: 'blueviolet',
    border: new Color(255,255,255)
}

const initializeMap = function() {
    const nodes = [];
    const animationSettings = new AnimationSettings();
    const layoutSettings = new LayoutSettings()
        .configure(defaultLayoutSettings);
    const colorSettings = new ColorSettings(defaultColorSettings)
        .configure(defaultColorSettings);
    const settings = new Settings(layoutSettings, animationSettings, colorSettings);
    const map =  new AstarMap(settings, defaultLayoutSettings.originNode, defaultLayoutSettings.goalNode, nodes);

    console.log(map);
    map.astar = new Astar(map, Heuristics.MANHATTAN);
    if (map.settings.layout.sizeStyle) {
        map.initializeWithExplicitNodes();
    } else {
        // alternative implementation
    }

    return map;
}

const computedSettings = {
    
}

let nodes = [];
activeMap.nodes = nodes;

let offsetX;
let offsetY;
let outerMarginX;
let outerMarginY;

const findNode = function(x, y) {
    x -= outerMarginX;

}

const redrawView = function() {
    activeMap.drawSelf(context);
}

const appInitialization = function() {
    activeMap = initializeMap();
    activeMap.animateIn();

    // Start drawing interval
    activeMap.drawInterval = setInterval(() => activeMap.process(context), 50);
}

window.addEventListener('load', () => {
    container = document.getElementById('canvas-container');
    canvas = document.getElementById('astar-canvas');
    canvas.height = container.offsetHeight;
    canvas.width = container.offsetWidth;
    context = canvas.getContext('2d');
    
    appInitialization();
    activeMap.canvas = canvas;

    canvas.addEventListener('mouseenter', (e) => {
        if(mouseActiveEvent) return;

        canvas.addEventListener('mousemove', (e) => {
            activeMap.mouse = [e.clientX, e.clientY];
        })
    });

    canvas.addEventListener('mousedown', (e) => {
        activeMap.processClick(e);
        activeMap.mouseDown = true;
    });

    canvas.addEventListener('mouseup', (e) => {
        activeMap.mouseDown = false;
    });
    
    canvas.addEventListener('mouseleave', (e) => {
        if(!mouseActiveEvent) return;
        canvas.removeEventListener('mousemove', mouseActiveEvent);
    });
});

