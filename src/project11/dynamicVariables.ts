// Frame dimensions
let frameH = 150, frameW = 60;
let frameH1 = 0.6 * frameH, frameW1 = 0.8 * frameW;

// Bead dimensions
let beadH = frameH - frameH1, beadW = 20;
let beadThickness = 4;

// Glass variables
let GVA = frameH - frameH1, GHA = frameH - frameH1;

// Window dimensions
let windowHeight = 1500, windowWidth = 2000;

// + lines length
let horizontalLineLength = 0.2 * windowWidth, verticalLineLength = 0.2 * windowHeight;

let defaultColor = "white", highlightColor = "#2222c9", subHighlightColor = "#9696ff";

export { frameH, frameW, frameH1, frameW1, beadH, beadW, beadThickness, windowHeight, windowWidth, defaultColor, highlightColor, subHighlightColor, GVA, GHA, horizontalLineLength, verticalLineLength };