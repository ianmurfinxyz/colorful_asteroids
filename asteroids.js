//==============================================================================
// completion-date: 19.03.2019
// author: Ian Murfin (https://github.com/zombie-snail)
//==============================================================================

(function(){

//==============================================================================
// Data Containers
//==============================================================================

//
// Basic linked list container.
// 
// <note>
//   list code from book "Learning Javascript Data Structures and Algorithms" 
//   authored by Loiane Groner.
// </note>
//
function List(){
    this._length = 0;
    this._head = null;

    this._makeNode = function(element){
        return {
            _element: element,
            _next: null,
        }
    };

    this.append = function(element){
        let node = this._makeNode(element);
        if(this._head == null){
            this._head = node;
        }
        else{
            let i = this._head;
            while(i._next != null){
                i = i._next;
            }
            i._next = node;
        }
        this._length++;
    };

    this._indexof = function(element){
        let current = this._head;
        let index = 0;
        while(current){
            if(element === current.element){
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    }

    //
    // Removes an element from the list at the given index.
    // 
    // <param {int} index> 
    //   The index of the element to remove.
    // </param>
    // <return>
    //   Returns the removed element. If no element removed returns null.
    // </return>
    //
    this.removeAt = function(index){
        if(!(index >= 0 && index < _length)){
            return null;
        }
        let curr, prev, i;
        curr = this._head;
        i = 0;
        if(index === 0){
            this._head = curr._next;
        }
        else{
            while(i++ < index){
                prev = curr;
                curr = curr._next;
            }
            prev._next = curr._next;
        }
        _length--;
        return curr._element;
    };

    //
    // Removes the passed element from the list.
    // 
    // <param {int} index> 
    //   The element to remove from the list.
    // </param>
    // <return>
    //   Returns the removed element. If no element removed returns null.
    // </return>
    //
    this.remove = function(element){
        let curr, prev;
        curr = this._head;
        if(curr._element === element){
            this._head = curr._next;
            this._length--;
            return curr._element;
        }
        else{
            do{
                prev = curr;
                curr = curr._next;
                if(curr._element === element){
                    prev._next = curr._next;
                    this._length--;
                    return curr._element;
                }
            }
            while(curr._next != null)
        }
        return null;
    };

    this.clear = function(){
        this._head = null;
        this._length = 0;
    };


    this.isEmpty = function(){
        let r;
        (this._length > 0) ? r = false : r = true;
        return r;
    };

    this.getLength = function(){
        return this._length;
    };

    //
    // Returns an iterator used to loop through the linked list.
    //
    this.getIter = function(){
        let i = undefined;
        let _length = this._length;
        let _head = this._head;
        return {
            //
            // Resets the iterator to the start of the list and returns the
            // first element in the list.
            //
            reset: function(){
                i = undefined;
            },

            //
            // Moves to the next element in the list. Returns the element if
            // it exists, else it returns null. 
            //
            // <note>
            //   The first call to the 'next' will return the first element
            //   in the list.
            // </note>
            //
            next: function(){
                if(_length === 0){
                    return null;
                }
                if(i == undefined){
                    i = _head;
                    return _head._element;
                }
                if(i._next == null){
                    return null;
                }
                i = i._next;
                return i._element;
            },
        }
    }
}

//==============================================================================
// Math
//==============================================================================

function Vector2H(x = 0, y = 0){
    this.x = x;
    this.y = y;
    this.w = 0;
}

function Point2H(x = 0, y = 0){
    this.x = x;
    this.y = y;
    this.w = 1;
}


// namespace to store all vector functions.
let VEC2 = {};

//
// Adds two vectors together. Does NOT modify either vector.
// 
// <params {object} v1 and v2>
//   Instances of either Vector2H or Point2H.
// </param>
// <return>
//   Returns a new Vector2H.
// </return>
VEC2.add = function(v1, v2){
    let v3 = new Vector2H();
    v3.x = v1.x + v2.x;
    v3.y = v1.y + v2.y;
    v3.w = v1.w + v2.w;
    return v3;
}

//
// Adds v2 to v1, modifying v1 in-place.
//
// <params {object} v1 and v2>
//   Instances of either Vector2H or Point2H.
// </param>
//
VEC2.addIP = function(v1, v2){
    v1.x += v2.x;
    v1.y += v2.y;
    v1.w += v2.w;
}

//
// Subtracts v2 from v1. Does NOT modify either vector.
//
// <params {object} v1 and v2>
//   Instances of either Vector2H or Point2H.
// </param>
// <return>
//   Returns a new 2d vector.
// </return>
//
VEC2.subtract = function(v1, v2){
    let v3 = new Vector2H();
    v3.x = v1.x - v2.x;
    v3.y = v1.y - v2.y;
    v3.w = v1.w - v2.w;
    return v3;
}

//
// Subtracts v2 from v1, modifiying v1 in-place.
//
// <params {object} v1 and v2>
//   Instances of either Vector2H or Point2H.
// </param>
//
VEC2.subtractIP = function(v1, v2){
    v1.x -= v2.x;
    v1.y -= v2.y;
    v1.w -= v2.w;
}

//
// Performs Dot product between two vectors. Does not modify either vector.
//
// <params {object} v1 and v2>
//   Instances of either Vector2H or Point2H.
// </param>
// <return>
//   Scalar value of dot product.
// </return> 
//
VEC2.dot = function(v1, v2){
    return (v1.x * v2.x) + (v1.y * v2.y);
}

//
// Performs 2d vector product between two vectors. Does not modify either 
// vector.
//
// <params {object} v1 and v2>
//   Instances of either Vector2H or Point2H.
// </param>
// <return>
//   scalar value of vector product
// </return> 
// <note>
//   Returned scalar represents magnitude of vector perpedicular to
//   both input vectors. Since we are working in 2d the direction of
//   that vector is in the 'imaginary' z-axis. The sign of the result
//   indicates the direction the vector 'points' in the z-axis. Sign
//   is determined by the angle between the left and right operands;
//   thus the operation is not commutative.
// </note>
//
VEC2.cross = function(v1, v2){
    return (v1.x * v2.y) - (v1.y * v2.x);
}

//
// Calculates the square magnitude of a vector.
//
// <params {object} v1>
//   Instance of Vector2H.
// </param>
// <return>
//   Square magnitude of the vector.
// </return>
//
VEC2.magnitudeSquared = function(v1){
    return Math.pow(v1.x, 2) + Math.pow(v1.y, 2);
}

VEC2.magnitude = function(v1){
    return Math.sqrt(Math.pow(v1.x, 2) + Math.pow(v1.y, 2));
}

//
// Performs component-wise multiplication between two vectors, i.e the 
// hadamard product. Does NOT modify either vector.
//
// <params {object} v1>
//   Instance of Vector2H.
// </param>
// <return>
//   Resultant vector as a new vector.
// </return> 
//
VEC2.hadamard = function(v1, v2){
    v3 = new Vector2H();
    v3.x = v1.x * v2.x;
    v3.y = v1.y * v2.y;
    return v3;
}

//
// Performs component-wise multiplication between two vectors, i.e the 
// hadamard product. Modifies v1 in-place.
//
// <params {object} v1>
//   Instance of Vector2H.
// </param>
// <return>
//   Resultant vector as a new vector.
// </return> 
//
VEC2.hadamardIP = function(v1, v2){
    v1.x *= v2.x;
    v1.y *= v2.y;
}

//
// Helper to assign property values of v2 to v1 without reasigning references.
//
// <params {object} v1 and v2>
//   Instances of either Vector2H or Point2H.
// </param>
//
VEC2.assignIP = function(v1, v2){
    v1.x = v2.x;
    v1.y = v2.y;
}

//
// Scales a vector. Does NOT modify v1.
//
// <params {object} v1>
//   Instance of either Vector2H or Point2H.
// </param>
// <params {number} factor>
//   The factor by which to scale the vector.
// </param>
// <return>
//   Result as new vector.
// </return>
//
VEC2.scale = function(v1, factor){
    v3 = new Vector2H();
    v3.x = v1.x * factor;
    v3.y = v1.y * factor;
    v3.w = v1.w;
    return v3;
}

//
// Scales a vector. DOES modify v1.
//
// <params {object} v1>
//   Instance of either Vector2H or Point2H.
// </param>
// <params {number} factor>
//   The factor by which to scale the vector.
// </param>
// <return>
//   Result as new vector.
// </return>
//
VEC2.scaleIP = function(v1, factor){
    v1.x *= factor;
    v1.y *= factor;
}

VEC2.normalise = function(v1){
    let im, v3; 
    im = (1 / VEC2.magnitude(v1));
    v3 = new Vector2H();
    v3.x = v1.x * im;
    v3.y = v1.y * im;
    return v3;
}

VEC2.normaliseIP = function(v1){
    let im; 
    im = (1 / VEC2.magnitude(v1));
    v1.x *= im;
    v1.y *= im;
}

//
//
//
VEC2.rotate = function(v1, angle){
    let m = makeRotationMatrix(angle);
    let r = multiplyVec2HByMatrix2x2(v1, m);
    return r;
}

//
//
//
VEC2.rotateIP = function(v1, angle){
    let m = makeRotationMatrix(angle);
    let r = multiplyVec2HByMatrix2x2(v1, m);
    VEC2.assignIP(v1, r);
}

function Matrix3x3(elements = null){
    this.elements = elements;
    if(!this.elements){
        this.elements = [[0,0,0],[0,0,0],[0,0,0]];
    }
}

function Matrix2x2(elements = null){
    this.elements = elements;
    if(!this.elements){
        this.elements = [[0,0],[0,0]];
    }
}   

function makeTranslationMatrix(){

}

function makeRotationMatrix(angle){
    let e = [[0,0],[0,0]];
    e[0][0] = Math.cos(angle);
    e[1][0] = -Math.sin(angle);
    e[0][1] = Math.sin(angle);
    e[1][1] = Math.cos(angle);
    let m = new Matrix2x2(e);
    return m;
}

//
// Creates a transformation matrix to apply to a Vector2H instance.
//
// <param {Vector2H} translation}
//   The vector by which to translate.
// </param>
// <param {float} angle>
//   The angle by which to rotate. (unit: degrees)
// </param>
// <param {float} scale>
//   The scale factor to apply.
// </param>
//
function makeTranformMatrix(translation, angle, scale = 1.0){
    let e = [[0,0,0],[0,0,0],[0,0,0]];
    e[0][0] = scale * Math.cos(angle);
    e[0][1] = scale * Math.sin(angle);
    e[1][0] = scale * -Math.sin(angle);
    e[1][1] = scale * Math.cos(angle);
    e[2][0] = translation.x;
    e[2][1] = translation.y;
    e[2][2] = 1;
    let t = new Matrix3x3(e);
    return t;
}

//
// Applies a translation vector to a transformation matrix. The net translation
// is the vector sum of the new translation and the transforms original 
// translation.
//
// <param {Vector2H} translation}
//   The vector by which to translate.
// </param>
// <param {Matrix3x3} transform>
//   The transformation matrix for which to apply the translation.
// </param>
//
function applyTranslationToTransform(translation, transform){
    let e = transform.elements;
    e[2][0] += translation.x;
    e[2][1] += translation.y;
}

//
//
//
function multiplyVec2HByMatrix3x3(v1, m1){
    let r = new Vector2H();
    let e = m1.elements;
    r.x = (v1.x * e[0][0]) + (v1.y * e[1][0]) + (v1.w * e[2][0]);
    r.y = (v1.x * e[0][1]) + (v1.y * e[1][1]) + (v1.w * e[2][1]);
    r.w = (v1.x * e[0][2]) + (v1.y * e[1][2]) + (v1.w * e[2][2]);
    return r;
}

//
//
//
function multiplyVec2HByMatrix2x2(v1, m1){
    let r = new Vector2H();
    let e = m1.elements;
    r.x = (v1.x * e[0][0]) + (v1.y * e[1][0]);
    r.y = (v1.x * e[0][1]) + (v1.y * e[1][1]);
    return r;
}

//==============================================================================
// Utility
//==============================================================================

cloneObject = function(obj) {
    var clone = {};
    for(var i in obj) {
        if(obj[i] != null &&  typeof(obj[i])=="object")
            clone[i] = cloneObject(obj[i]);
        else
            clone[i] = obj[i];
    }
    return clone;
}

//==============================================================================
// Config
//==============================================================================

//
// <note>
//   The coordinate spaces are in units of meters. Therefore a transformation
//   between meters and pixels will be necessary to draw the game. The choice 
//   of meters is to allow all math to be done in SI units. Except angular math
//   which will use degrees. Hence consider all variables, except angles, to be 
//   in SI units. Note: can actually make things really simply and have 
//   1px = 1meter. Then dont need to do anything. It just makes the values of 
//   force and mass unrealistic.
// </note> 
//

const config = {
    baseColor: "#ffffff",
    viewWidth: 1400, // (unit: pixels)
    viewHeight: 800,
    loopMargin: 10, // margin around view before enter "loop zone"(unit: pixels)
    shipBoostForce: 400, // force magnitude (unit: newtons).
    shipMass: 1, // (unit: kilograms).
    shipInverseMass: (1 / 1),
    shipAngularSpeed: 5, // (unit: degrees per second).
    shipMaxSpeedSquared: 60000,
    shipShootDelay: 0.25, // limit fire rate (unit: seconds).
    shipPulseDelay: 1.5, // limits pulse rate (unit: seconds).
    shipSpawnDelay: 1.0, // (unit: seconds)
    bulletSpeed: 500, // (unit: meters per second).
    bulletRadius: 2, // drawing only, bullets considered points (unit: pixels)
    bulletAge: 2.0, // time period bullets live (unit: seconds).
    maxAsteroidSpeed: 400,
    maxAsteroidStartSpeed: 200, // (unit: meters per second)
    minAsteroidStartSpeed: 100,
    asteroidSpawnExlusionRadius: 200, // circle centered at screen center.
    asteroidUnitMass: 5, // mass per unit of scale (unit: kg per unit scale).
    asteroidSplitCount: 3, // number of smaller pieces asteroids break into.
    asteroidStartScale: 14.0, // scale of big asteroids.
    asteroidMaxSize: 2,
    asteroidScoreValue: [100, 50, 20], // score value for asteroid sizes, 0,1,2
    baseAsteroidsPerRound: 4,
    asteroidIncreasePerRound: 2,
    asteroidColor: "#ffffff",
    maxAsteroidsPerRound: 11,
    minParticleSpeed: 200, // (unit: meters per second)
    maxParticleSpeed: 400, 
    particleAcceleration: -100, // (unit: meters per second squared)
    particleMinAge: 0.6,  // (unit: seconds)
    particleMaxAge: 1.0,
    particleRadius: 2, // (unit: pixel)
    playerColor: "#ff570a",
    pulseImpulse: 20000000, // (unit: newton seconds).
    pulseMaxRadius: 80, // used for drawing (can be different to pulseMaxRadiusSquared)
    pulseMaxRadiusSquared: 40000, // used for in range test (unit: meters)
    pulseRadialSpeed: 400, // used ony for drawing (unit: meters per second)
    hudFont: '28px serif',
    hudColor: "#ffffff",
    saucerMinAccelerationTime: 2.0, // time when starts moving up/down (unit: seconds)
    saucerMaxAccelerationTime: 6.0,
    saucerSpeed: 200, // (unit: meters per second)
    saucerMinShootDelay: 2.0, //(unit: seconds)
    saucerMaxShootDelay: 6.0, //(unit: seconds)
    saucerMinSpawnDelay: 10.0,
    saucerMaxSpawnDelay: 20.0,
    saucerScoreValue: [1000, 200], // value[1]=big saucer, value[0]=small
    saucerColor: "#42f4a1",
    firstSaucerDelay: 1.0, // time until first saucer spawns.
    menuChangeDelay: 0.1, // delay between making changes on the game menu.
};
//Object.freeze(config);

//==============================================================================
// Global Constants
//==============================================================================

//
// Directions relative to view space (the screen). These direction define view 
// space such that the base unit vectors of view space are: x-axis: i=EAST, 
// y-axis: j=SOUTH. Where i and j are the unit vectors which define the 
// coordinate space.
// 
const NORTH = new Vector2H(0, -1); Object.freeze(NORTH);
const SOUTH = new Vector2H(0, 1); Object.freeze(SOUTH);
const EAST = new Vector2H(1, 0); Object.freeze(EAST);
const WEST = new Vector2H(1, 0); Object.freeze(WEST);

const KEYS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    A: 65,
    D: 68,
    W: 87,
    ESC: 27,
    SPACE: 32,
    ENTER: 13,
};
Object.freeze(KEYS);

//
// Vector shapes
//
// <note>
//   All shape points are in a coordinate space local to the shape.
// </note>
//
const SHAPES = {
    ship: {
        radius: 15,
        bounds_L: [ // triangle collision bounds for the ship
            new Point2H(0, -10),
            new Point2H(5, 10),
            new Point2H(-5, 10)
        ],
        points_L: [
            new Point2H(0, -10),
            new Point2H(5, 10),
            new Point2H(3, 8),
            new Point2H(-3, 8),
            new Point2H(-5, 10)
        ]
    },
    shipTail: {
        points_L: [
            new Point2H(4, 8),
            new Point2H(0, 18),
            new Point2H(-4, 8),
        ]
    },
    Saucer: {
            radius: 12.0,
            points_L: [[
                        new Point2H(10.0, -2),
                        new Point2H(5.0, 3.0),
                        new Point2H(3.0, 8.0),
                        new Point2H(-3.0, 8.0),
                        new Point2H(-5.0, 3.0),
                        new Point2H(-10.0, -2.0),
                        new Point2H(-5.0, -7.0),
                        new Point2H(5.0, -7.0)
                    ],[
                        new Point2H(10, -2.0),
                        new Point2H(-10, -2.0)
                    ],[
                        new Point2H(5, 3.0),
                        new Point2H(-5, 3.0)
                    ]
            ]
    },
    asteroid0: {
        radius: 2.50,
        points_L: [
            new Point2H(-0.01, 1.63),
            new Point2H(-1.07, 2.40),
            new Point2H(-2.72, 0.36),
            new Point2H(-1.24, -2.40),
            new Point2H(0.17, -2.67),
            new Point2H(2.02, -1.62),
            new Point2H(1.87, -0.39),
            new Point2H(2.51, 1.08),
            new Point2H(1.81, 1.96)
        ]
    },
    asteroid1: {
        radius: 2.40, // 2.20 precise, inflated size so easier to hit
        points_L: [
            new Point2H(-0.02, 2.32),
            new Point2H(-1.33, 1.49),
            new Point2H(-1.11, 0.79),
            new Point2H(-2.20, -0.2),
            new Point2H(-1.29, -1.43),
            new Point2H(-0.72, -1.17),
            new Point2H(0.78, -2.02),
            new Point2H(2.15, -0.67),
            new Point2H(1.38, 0.09),
            new Point2H(2.18, 0.38),
            new Point2H(1.89, 1.23),
            new Point2H(0.72, 1.27)
        ]
    },
    asteroid2: {
        radius: 2.5, // 2.33 precise
        points_L: [
            new Point2H(-2.24, -0.55),
            new Point2H(-1.00, -2.00),
            new Point2H(-0.26, -0.91),
            new Point2H(-0.19, -2.30),
            new Point2H(1.58, -1.74),
            new Point2H(2.31, -0.32),
            new Point2H(1.43, 1.83),
            new Point2H(-1.15, 2.00),
            new Point2H(-2.23, 0.69),
            new Point2H(-1.30, -0.02)
        ]
    },
    asteroid3: {
        radius: 2.4, // 2.21 precise
        points_L: [
            new Point2H(0.86, 0.09),
            new Point2H(2.00, 0.57),
            new Point2H(2.00, 1.00),
            new Point2H(0.69, 2.01),
            new Point2H(-1.28, 1.69),
            new Point2H(-0.46, 0.81),
            new Point2H(-2.01, 0.69),
            new Point2H(-0.56, -2.10),
            new Point2H(0.65, -1.42),
            new Point2H(1.57, -1.56),
            new Point2H(2.14, -0.44)
        ]
    },
}
Object.freeze(SHAPES);

const ASTEROIDS_FONT = {
    horizontalSpacing: 5, // (unit: pixels)
    verticalSpacing: 10,
    baseWidth: 20, // width of text (pixels) at scale=1
    baseHeight: 28, // height ...
    '-': [
        {
            isClosed: true,
            points_L: [
                new Point2H(0.0, 14.0),
                new Point2H(20.0, 14.0)
            ]
        }
    ],
    'A': [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 28.0),
                new Point2H(0.0, 10.0),
                new Point2H(10.0, 0.0),
                new Point2H(20.0, 10.0),
                new Point2H(20.0, 28.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 14.0),
                new Point2H(20.0, 14.0)
            ]
        }
    ],
    'B': [
        {
            isClosed: true,
            points_L: [
                new Point2H(0.0, 28.0),
                new Point2H(0.0, 0.0),
                new Point2H(14.0, 0.0),
                new Point2H(20.0, 7.0),
                new Point2H(14.0, 14.0),
                new Point2H(20.0, 21.0),
                new Point2H(14.0, 28.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 14.0),
                new Point2H(14.0, 14.0)
            ]
        }
    ],
    'C': [
        {
            isClosed: false,
            points_L: [
                new Point2H(20.0, 28.0),
                new Point2H(0.0, 28.0),
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 0.0)
            ]
        }
    ],
    'D': [
        {
            isClosed: true,
            points_L: [
                new Point2H(0.0, 28.0),
                new Point2H(0.0, 0.0),
                new Point2H(14.0, 0.0),
                new Point2H(20.0, 14.0),
                new Point2H(14.0, 28.0)
            ]
        }
    ],
    'E': [
        {
            isClosed: false,
            points_L: [
                new Point2H(20.0, 28.0),
                new Point2H(0.0, 28.0),
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 0.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 14.0),
                new Point2H(14.0, 14.0)
            ]
        }
    ],
    'F': [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 28.0),
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 0.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 14.0),
                new Point2H(14.0, 14.0)
            ]
        }
    ],
    'G': [
        {
            isClosed: false,
            points_L: [
                new Point2H(14.0, 14.0),
                new Point2H(20.0, 14.0),
                new Point2H(20.0, 28.0),
                new Point2H(0.0, 28.0),
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 0.0)
            ]
        }
    ],
    'H': [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 28.0),
                new Point2H(0.0, 0.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(20.0, 28.0),
                new Point2H(20.0, 0.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 14.0),
                new Point2H(20.0, 14.0)
            ]
        }
    ],
    'I': [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 0.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 28.0),
                new Point2H(20.0, 28.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(10.0, 0.0),
                new Point2H(10.0, 28.0)
            ]
        }
    ],
    'J': [
        {
            isClosed: false,
            points_L: [
                new Point2H(10.0, 0.0),
                new Point2H(10.0, 28.0),
                new Point2H(0.0, 28.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 0.0)
            ]
        }
    ],
    'K': [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 0.0),
                new Point2H(0.0, 28.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 14.0),
                new Point2H(20.0, 0.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 14.0),
                new Point2H(20.0, 28.0)
            ]
        }
    ],
    'L': [
        {
            isClosed: false,
            points_L: [
                new Point2H(20.0, 28.0),
                new Point2H(0.0, 28.0),
                new Point2H(0.0, 0.0),
            ]
        }
    ],
    'M': [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 28.0),
                new Point2H(0.0, 0.0),
                new Point2H(10.0, 14.0),
                new Point2H(20.0, 0.0),
                new Point2H(20.0, 28.0)
            ]
        }
    ],
    'N': [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 28.0),
                new Point2H(0.0, 0.0),
                new Point2H(2.0, 0.0),
                new Point2H(18.0, 28.0),
                new Point2H(20.0, 28.0),
                new Point2H(20.0, 0.0)
            ]
        }
    ],
    'O': [
        {
            isClosed: true,
            points_L: [
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 0.0),
                new Point2H(20.0, 28.0),
                new Point2H(0.0, 28.0),
            ]
        }
    ],
    'P': [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 28.0),
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 0.0),
                new Point2H(20.0, 14.0),
                new Point2H(0.0, 14.0)
            ]
        }
    ],
    'Q': [
        {
            isClosed: true,
            points_L: [
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 0.0),
                new Point2H(20.0, 20.0),
                new Point2H(12.0, 20.0),
                new Point2H(12.0, 28.0),
                new Point2H(0.0, 28.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(10.0, 14.0),
                new Point2H(20.0, 0.0)
            ]
        }
    ],
    'R': [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 28.0),
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 0.0),
                new Point2H(20.0, 14.0),
                new Point2H(0.0, 14.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(10.0, 14.0),
                new Point2H(20.0, 28.0)
            ]
        }
    ],
    'S': [
        {
            isClosed: false,
            points_L: [
                new Point2H(20.0, 0.0),
                new Point2H(0.0, 0.0),
                new Point2H(0.0, 14.0),
                new Point2H(20.0, 14.0),
                new Point2H(20.0, 28.0),
                new Point2H(0.0, 28.0)
            ]
        }
    ],
    'T': [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 0.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(10.0, 0.0),
                new Point2H(10.0, 28.0)
            ]
        }
    ],
    'U': [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 0.0),
                new Point2H(0.0, 28.0),
                new Point2H(20.0, 28.0),
                new Point2H(20.0, 0.0)
            ]
        }
    ],
    'V': [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 0.0),
                new Point2H(10.0, 28.0),
                new Point2H(20.0, 0.0)
            ]
        }
    ],
    'W': [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 0.0),
                new Point2H(0.0, 28.0),
                new Point2H(10.0, 14.0),
                new Point2H(20.0, 28.0),
                new Point2H(20.0, 0.0)
            ]
        }
    ],
    'X': [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 28.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 28.0),
                new Point2H(20.0, 0.0)
            ]
        }
    ],
    'Y': [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 0.0),
                new Point2H(10.0, 14.0),
                new Point2H(20.0, 0.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(10.0, 14.0),
                new Point2H(10.0, 28.0)
            ]
        }
    ],
    'Z': [
        {
            isClosed: false,
            points_L: [
                new Point2H(20.0, 28.0),
                new Point2H(0.0, 28.0),
                new Point2H(20.0, 0.0),
                new Point2H(0.0, 0.0)
            ]
        }
    ],
    0: [
        {
            isClosed: true,
            points_L: [
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 0.0),
                new Point2H(20.0, 28.0),
                new Point2H(0.0, 28.0),
            ]
        }
    ],
    1: [
        {
            isClosed: false,
            points_L: [
                new Point2H(20.0, 0.0),
                new Point2H(20.0, 28.0)
            ]
        }
    ],
    2: [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 0.0),
                new Point2H(20.0, 14.0),
                new Point2H(0.0, 14.0),
                new Point2H(0.0, 28.0),
                new Point2H(20.0, 28.0)
            ]
        }
    ],
    3: [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 0.0),
                new Point2H(20.0, 28.0),
                new Point2H(0.0, 28.0),
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(10.0, 14.0),
                new Point2H(20.0, 14.0)
            ]
        }
    ],
    4: [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 0.0),
                new Point2H(0.0, 14.0),
                new Point2H(20.0, 14.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(20.0, 0.0),
                new Point2H(20.0, 28.0)
            ]
        }
    ],
    5: [
        {
            isClosed: false,
            points_L: [
                new Point2H(20.0, 0.0),
                new Point2H(0.0, 0.0),
                new Point2H(0.0, 14.0),
                new Point2H(20.0, 14.0),
                new Point2H(20.0, 28.0),
                new Point2H(0.0, 28.0)
            ]
        }
    ],
    6: [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 14.0),
                new Point2H(20.0, 14.0),
                new Point2H(20.0, 28.0),
                new Point2H(0.0, 28.0),
                new Point2H(0.0, 0.0)
            ]
        }
    ],
    7: [
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 0.0),
                new Point2H(20.0, 28.0)
            ]
        }
    ],
    8: [
        {
            isClosed: true,
            points_L: [
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 0.0),
                new Point2H(20.0, 28.0),
                new Point2H(0.0, 28.0)
            ]
        },
        {
            isClosed: false,
            points_L: [
                new Point2H(0.0, 14.0),
                new Point2H(20.0, 14.0)
            ]
        }
    ],
    9: [
        {
            isClosed: false,
            points_L: [
                new Point2H(20.0, 14.0),
                new Point2H(0.0, 14.0),
                new Point2H(0.0, 0.0),
                new Point2H(20.0, 0.0),
                new Point2H(20.0, 28.0),
            ]
        }
    ]
}
Object.freeze(ASTEROIDS_FONT);

//==============================================================================
// Polygon
//==============================================================================

//
// A generic polygon; a set of points.
//
// <property {array} points}
//   Set of Vector2H points representing the corners of the polygon.
// </property>
// <property {bool} isClosed>
//   Flag specifying if the polygons points form a closed loop.
// </property>
//
function Polygon(points = [], isClosed = true){
    this.points = points
    this.isClosed = isClosed;
}

//==============================================================================
// Spaceship
//==============================================================================

function Ship(x = 0, y = 0){
    this.position_V = new Point2H(x, y); // _V means relative to view space.
    this.velocity_V = new Vector2H();
    this.angle = 0;
    this.rotationState = 0; // 0=no rotation, -1=clockwise, 1=anti-clockwise
    this.isBoosting = false;
    this.lastShootTime = 0;
    this.lastPulseTime = 0;
    this.pulseRadius = 0; // if radius = 0, no active pulse.
    this.spawnTime = 0; // if = 0 then ship alive. Else will spawn at this time.
    this.radius = SHAPES.ship.radius;
    this.bounds_L = SHAPES.ship.bounds_L;
    this.body_L = new Polygon(SHAPES.ship.points_L, true);
    this.tail_L = new Polygon(SHAPES.shipTail.points_L, false);
}

//
// <note>
//   In this function the magnitude of the velocity is limited as follows:
//     sf = v(max)^2 / v^2
//     if(sf < 0){                where v = velocity
//       scale(v, sf)                   sf = scale factor
//     }
//   Technically this is wrong! Since,
//     a/b != a^2/b^2      instead     a/b = (a^2/b^2)^0.5
//
//   The above is the equivilent of trying to normalise a vector without square 
//   rooting the magnitude, i.e. divinding each component by mag^2 rather than 
//   mag. The difference here is that we are scaling to v(max) not 1 (unity).
//
//   to scale v correctly, meaning the condition:
//     scale(v, sf) = v(max) is true
//
//   requires sf=mag(v(max))/mag(v), but we have sf=(mag(v(max))/mag(v))^2.
// 
//   The result is that we are essentially scaling v twice. 
//      since scale(v, sf^2) === scale(scale(v, sf), sf)
//
//   This could be really bad since it means the more v exceeds v(max) the 
//   larger the first scale, and thus the larger the second scale. The second 
//   scale creates the error. Thus the larger the second scale the larger the 
//   error.
//  
//   e.g. if v=4*v(max), then the correct sf=1/4. If v is 4 times too big which 
//   scale it to a quarter its size. But since we apply the scale twice, the 
//   final v is a quarter the desired value. A big error. The final v will always
//   be the correct sf smaller than the correct v.
//
//   However in the case of the ship it doesnt matter, since v only increases
//   incrementally the sf will never be that small. The correct sf should be
//   around 0.95 or so, and 0.95*0.95=0.9 which isnt much of an error to care
//   about. It will work in practice and we avoid a sqrt.
// </note>
//
function integrateShipPos(ship, dt){
    if(ship.rotationState){
        let av = ship.rotationState * config.shipAngularSpeed; // around z-axis
        ship.angle += av * dt;
    }
    if(ship.isBoosting){
        let d = cloneObject(NORTH);
        VEC2.rotateIP(d, ship.angle);
        let f = VEC2.scale(d, config.shipBoostForce);
        let dv = VEC2.scale(f, config.shipInverseMass); // f=ma -> a=f/m
        VEC2.scaleIP(dv, dt); // dv=(a)(dt)
        VEC2.addIP(ship.velocity_V, dv); // v1=v0+dv (euler integration)
        let ms = VEC2.magnitudeSquared(ship.velocity_V);
        if(ms > config.shipMaxSpeedSquared){
            let sf = (config.shipMaxSpeedSquared / ms);
            VEC2.scaleIP(ship.velocity_V, sf);
        }
    }
    let dp = VEC2.scale(ship.velocity_V, dt);
    VEC2.addIP(ship.position_V, dp);
}

function integrateShipPulse(ship, dt){
    if(ship.pulseRadius !== 0){
        ship.pulseRadius += (config.pulseRadialSpeed * dt);
        if(ship.pulseRadius > config.pulseMaxRadius){
            ship.pulseRadius = 0;
        }
    }
}

function updateShip(ship, dt){
    if(ship.spawnTime !== 0){
        return;
    }
    integrateShipPos(ship, dt);
    integrateShipPulse(ship, dt);
}



//
// Makes a spaceship shoot.
//
// <param {Ship} ship>
//   The spaceship doing the shooting.
// </param>
// <param {List} bullets>
//   The list which will store the new bullet.
// </param> 
// <param {float} time>
//   Current time in the game (unit: seconds).
// </param>
//
function shipShoot(ship, bullets, time){
    if(ship.spawnTime !== 0){
        return;
    }
    if(bullets.getLength() >= 4){
        return;
    }
    let p, sv, bv, b, sd, ba;
    sd = config.shipShootDelay;
    ba = config.bulletAge;
    if((time - ship.lastShootTime) < sd){
        return;
    }
    p = ship.position_V;
    sv = ship.velocity_V;
    bv = cloneObject(NORTH);
    VEC2.rotateIP(bv, ship.angle);
    VEC2.scaleIP(bv, config.bulletSpeed);
    VEC2.addIP(bv, sv);
    b = new Bullet(time + ba, p.x, p.y, bv.x, bv.y);
    bullets.append(b);
    ship.lastShootTime = time;
    sfx.laserShoot.play();
}

//
// Applies an impulse to all asteroids. The impulse force can be considered to 
// act for an infinitesimal time period.
//
// <note>
//   Uses the formula:
//     dv = J/mr^2
//   where:
//     dv = instantaeous change in velocity. (unit: meters per second)
//     J = impulse to apply (unit: newton seconds).
//     m = mass of the object the impulse is applied to. (unit: kilograms)
//     r = distance between target object and source of impulse. (unit: meters)
// </note>
// <note>
//   This is an expensive function as it performs multiple square roots. All
//   square roots will be performed once for each asteroid in the pulse radius.
//   Thus a smaller pulse radius will make the function quicker since fewer 
//   asteroids will be tested. config.pulseMaxRadiusSquared sets radius. 
// </note>
//
function shipPulse(ship, asteroids, time){
    if(ship.spawnTime !== 0){
        return;
    }
    let pd, J, aiter, a, d, ds, m, um, sf, dv, prs, mas, vm;
    mas = config.maxAsteroidSpeed;
    pd = config.shipPulseDelay;
    if((time - ship.lastPulseTime) < pd){
        return;
    }
    J = config.pulseImpulse;
    um = config.asteroidUnitMass;
    prs = config.pulseMaxRadiusSquared;
    a = null;
    aiter = asteroids.getIter();
    while((a = aiter.next()) != null){
        d = VEC2.subtract(a.position_V, ship.position_V); // distance
        ds = VEC2.magnitudeSquared(d); // distance squared
        if(ds < prs){
            m = a.scale * um; // mass
            sf = (J / (m * ds)); // scale factor
            dv = VEC2.normalise(d); 
            VEC2.scaleIP(dv, sf); // instantaneous change in velocity.
            VEC2.addIP(a.velocity_V, dv);
            vm = VEC2.magnitude(a.velocity_V);
            if(vm > mas){
                sf = (mas / vm);
                VEC2.scaleIP(a.velocity_V, sf);
            }
        }
    }
    ship.lastPulseTime = time;
    ship.pulseRadius = 1;
    sfx.pulse.play();
}

//==============================================================================
// Asteroids
//==============================================================================

//
// <param {int} num>
//   The type number of the asteroid. Can be asteroid0/1/2/3. See SHAPES object.
// </param> 
// <param {int} size>
//   Three sizes of asteroid, 0\1\2 or small\medium\large. Every time an 
//   asteroid breaks it creates asteroids of the next size smaller.
// </param> 
//
function Asteroid(num = 0, x = 0, y = 0, vx = 0, vy = 0, angle = 0.0, scale = 1.0, size = 2){
    this.position_V = new Point2H(x, y); // _V means relative to view space.
    this.velocity_V = new Vector2H(vx, vy);
    this.angle = angle;
    this.scale = scale;
    this.size = size;
    this.num = num;
    let type = "asteroid" + num;
    this.radius = (SHAPES[type].radius * scale);
    this.body_L = new Polygon(SHAPES[type].points_L, true); 
}

function integrateAsteroidPos(asteroid, dt){
    let dp = VEC2.scale(asteroid.velocity_V, dt);
    VEC2.addIP(asteroid.position_V, dp);
}

function integrateAsteroidsPos(asteroids, dt){
    let a = null;
    let iter = asteroids.getIter();
    while((a = iter.next()) != null){
        integrateAsteroidPos(a, dt);
    }
}

function spawnAsteroids(count, scale, size, asteroids, x = Infinity, y = Infinity){
    let mins, maxs, s, v, va, a, n, px, py, vw, vh, lm, er, i, j, as;
    vw = config.viewWidth;
    vh = config.viewHeight;
    vhw = vw * 0.5;
    vhh = vh * 0.5;
    lm = config.loopMargin;
    er = config.asteroidSpawnExlusionRadius;
    mins = config.minAsteroidStartSpeed;
    maxs = config.maxAsteroidStartSpeed;
    for(i = 0; i < count; i++){
        if(x === Infinity && y === Infinity){
            j = -1;
            do {
                px = (Math.random() * (vw + (2 * lm))) - lm; // x position
                j++;
                if(j > 10){
                    console.log("warning: excessive asteroid x-position generating!");
                }
            }
            while(px > (vhw - er) && px < (vhw + er));
            j = -1;
            do {
                py = (Math.random() * (vh + (2 * lm))) - lm; // y position
                j++;
                if(j > 10){
                    console.log("warning: excessive asteroid y-position generating!");
                }
            }
            while(py > (vhh - er) && py < (vhh + er));
        }
        else{
            px = x;
            py = y;
        }
        n = Math.floor(Math.random() * 3.99); // type number.
        s = (Math.random() * (maxs - mins)) + mins; // speed
        a = (Math.random() * (Math.PI * 2)); // render angle
        va = (Math.random() * (Math.PI * 2)); // velocity angle
        v = VEC2.rotate(NORTH, va); 
        VEC2.scaleIP(v, s); // velocity
        as = new Asteroid(n, px, py, v.x, v.y, a, scale, size);
        asteroids.append(as);
    }
}

//==============================================================================
// Bullets
//==============================================================================

function Bullet(time, x = 0, y = 0, vx = 0, vy = 0){
    this.position_V = new Point2H(x, y); // _V means relative to view space.
    this.velocity_V = new Vector2H(vx, vy);
    this.dissolveTime = time;
}

function integrateBulletPos(bullet, dt){
    let dp = VEC2.scale(bullet.velocity_V, dt);
    VEC2.addIP(bullet.position_V, dp);
}

function integrateBulletsPos(bullets, dt){
    let b = null;
    let iter = bullets.getIter();
    while((b = iter.next()) != null){
        integrateBulletPos(b, dt);
    }
}

//==============================================================================
// Particles
//==============================================================================

function Particle(time, x = 0, y = 0, vx = 0, vy = 0, ax = 0, ay = 0){
    this.position_V = new Point2H(x, y); // _V means relative to view space.
    this.velocity_V = new Vector2H(vx, vy);
    this.acceleration_V = new Vector2H(ax, ay);
    this.dissolveTime = time;
}

function integrateParticlePos(particle, dt){
    let dv, dp, a;
    a = particle.acceleration_V;
    dv = VEC2.scale(a, dt); // dv=(a)(dt)
    VEC2.addIP(particle.velocity_V, dv); // v1=v0+dv (euler integration)
    dp = VEC2.scale(particle.velocity_V, dt); // dp=(v)(dt)
    VEC2.addIP(particle.position_V, dp);
}

function integrateParticlesPos(particles, dt){
    let pa = null;
    let iter = particles.getIter();
    while((pa = iter.next()) != null){
        integrateParticlePos(pa, dt);
    }
}

//
// <param {float} time>
//   The current time in the game. (unit: seconds).
// </param>
// <param {List} particles>
//   A linked list to store the newly spawned particles.
// </param>
//
function spawnParticles(count, time, x, y, particles){
    let i, mins, maxs, va, pv, pa, s, par, mina, maxa, ag, a, d;
    mins = config.minParticleSpeed;
    maxs = config.maxParticleSpeed;
    mina = config.particleMinAge;
    maxa = config.particleMaxAge;
    a = config.particleAcceleration;
    for(i = 0; i < count; i++){
        ag = (Math.random() * (maxa - mina)) + mina; // life length (seconds).
        s = (Math.random() * (maxs - mins)) + mins; // speed
        va = (Math.random() * (Math.PI * 2)); // velocity angle
        d = VEC2.rotate(NORTH, va); // direction particle moves.
        pv = VEC2.scale(d, s); // velocity
        pa = VEC2.scale(d, a); // acceleration
        par = new Particle(time + ag, x, y, pv.x, pv.y, pa.x, pa.y);
        particles.append(par);
    }
}

//==============================================================================
// Saucers
//==============================================================================

//
// <param {int} size>
//   Big saucer (size=1) or small saucer(size=0)?.
// </param>  
// <param {float} time>
//   The time the saucer was created.
// </param>
//
function Saucer(time, x = 0, y = 0, vx = 0, vy = 0, size = 0, ){
    this.position_V = new Point2H(x, y);
    this.velocity_V = new Vector2H(vx, vy);
    this.size = size;
    this.scale = -1.5 * (size + 1) * 0.5;
    this.radius = Math.abs(SHAPES.Saucer.radius * this.scale);
    this.body_L = SHAPES.Saucer.points_L;
    this.lastShootTime = 0.0;
    this.currentShootDelay = config.saucerMinShootDelay;
    this.accelerationTime = Math.floor(Math.random() * 100) % 2; // if 0 dont accelerate.
    if(this.accelerationTime){ // if moves up/down or only horizontal.
        let amin, amax;
        mina = config.saucerMinAccelerationTime;
        maxa = config.saucerMaxAccelerationTime;
        this.accelerationTime = (Math.random() * (maxa - mina)) + mina;
    }
}

function integrateSaucer(saucer, dt){
    let dp = VEC2.scale(saucer.velocity_V, dt);
    VEC2.addIP(saucer.position_V, dp);
}

//
// changes saucer direction to start move diagonally up or down.
//
function saucerAccelerate(saucer, time){
    let a, at;
    at = saucer.accelerationTime;
    if((at) && at < time){
        a = (Math.floor((Math.random() * 100) % 2) * -1) * (Math.PI * 0.3);
        VEC2.rotateIP(saucer.velocity_V, a);
        saucer.accelerationTime = 0;
    }
}

function updateSaucer(saucer, dt, time){
    saucerAccelerate(saucer, time);
    integrateSaucer(saucer, dt);
}

function saucerShoot(saucer, ship, bullets, time){
    let b, bp, bv, a, p1, p2, sdmin, sdmax;
    if((time - saucer.lastShootTime) < saucer.currentShootDelay){
        return;
    }
    sdmin = config.saucerMinShootDelay;
    sdmax = config.saucerMaxShootDelay;
    p1 = saucer.position_V;
    p2 = ship.position_V;
    if(!saucer.size){ // small saucer
        bv = VEC2.subtract(p2, p1);
        VEC2.normaliseIP(bv);
    }
    else { // big saucer
        a = Math.random() * Math.PI * 2;
        bv = VEC2.rotate(NORTH, a);
    }
    bp = new Vector2H();
    VEC2.assignIP(bp, p1);
    VEC2.addIP(bp, VEC2.scale(bv, saucer.radius * 2));
    VEC2.scaleIP(bv, config.bulletSpeed);
    b = new Bullet(time + config.bulletAge, bp.x, bp.y, bv.x, bv.y);
    bullets.append(b);
    saucer.lastShootTime = time;
    saucer.currentShootDelay = (Math.random() * (sdmax - sdmin)) + sdmin;
}



//==============================================================================
// Collision Detection
//==============================================================================

//
// <note>
//   Many of these collison functions are rather similar and they could easily 
//   be refactored to reduce code duplication.
// </note>
//

//
// Handles collisions between bullets and the view. Bullets are destroyed when
// they go too far off screen; no bullet looping.
//
// <param {list} bullets>
//   A linked list containing all the bullets to test.
// </param>
//
//function bulletsVsView(bullets){
//    let b = null;
//    let p = null;
//    let vw = config.viewWidth;
//    let vh = config.viewHeight;
//    let m = config.loopMargin;
//    let isVamoosed = false;
//    let iter = bullets.getIter();
//    while((b = iter.next()) != null){
//        p = b.position_V;
//        if(p.x < -m || p.x > (vw + m)){
//            isVamoosed = true;
//        }
//        else if(p.y < -m || p.y > (vh + m)){
//            isVamoosed = true;
//        }
//        if(isVamoosed){
//            bullets.remove(b);
//            isVamoosed = false;
//        }
//    } 
//}

function bulletsVsView(bullets){
    let b = null;
    let p = null;
    let vw = config.viewWidth;
    let vh = config.viewHeight;
    let lm = config.loopMargin;
    let iter = bullets.getIter();
    while((b = iter.next()) != null){
        p = b.position_V;
        if(p.x < (-lm)){
            p.x = vw + lm;
        }
        else if(p.x > (vw + lm)){
            p.x = -lm;
        }
        if(p.y < (-lm)){
            p.y = vh + lm
        }
        else if(p.y > (vh + lm)){
            p.y = -lm;
        }
    } 
}

function bulletsVsTime(bullets, time){
    let b, iter;
    b = null;
    iter = bullets.getIter();
    while((b = iter.next()) != null){
        if(b.dissolveTime < time){
            bullets.remove(b);
        }
    }
}

function bulletsVsAteroids(bullets, asteroids, time, particles, playData){
    let a, b, aiter, biter, saiter, sa, spawnList, bp, ap, ar, d, s, z, sc, sval;
    sc = config.asteroidSplitCount;
    a = null;
    b = null;
    biter = bullets.getIter();
    spawnList = null;
    while((b = biter.next()) != null){
        aiter = asteroids.getIter();
        while((a = aiter.next()) != null){
            ap = a.position_V;
            bp = b.position_V;
            ar = a.radius;
            d = VEC2.subtract(ap, bp);
            if(VEC2.magnitudeSquared(d) < (ar * ar)){
                z = a.size;
                if(z === 2){
                    sfx.bangLarge.play();
                }
                else if(z === 1){
                    sfx.bangMedium.play();
                }
                else {
                    sfx.bangSmall.play();
                }
                sval = config.asteroidScoreValue[z];
                playData.score += sval;
                playData.scoreFromLife -= sval;
                z--;
                if(z !== -1){
                    if(spawnList === null){
                        spawnList = new List();
                    }
                    s = a.scale * 0.6;
                    spawnAsteroids(sc, s, z, spawnList, ap.x, ap.y);
                }
                spawnParticles(6, time, ap.x, ap.y, particles);
                asteroids.remove(a);
                bullets.remove(b);
                break;
            }
        }
    }
    if(!(spawnList === null)){
        saiter = spawnList.getIter();
        while((sa = saiter.next()) != null){
            asteroids.append(sa);
        }
    }
}

// 
// Tests a point against a trianle. 
//
// <note>
//   Scales the ship triangle up a little to make it less likely the bullet 
//   will pass through undetected due to bullet speed. The pass through walls
//   problem.
// </note>
//
function bulletsVsShip(bullets, ship, time, particles){
    if(ship.spawnTime !== 0){
        return;
    }
    let b, biter, bp, sp, sr, sb_L, sb_V, d, i2, normal, lp, sign, isCollided;
    sb_L = ship.bounds_L;
    b = null;
    biter = bullets.getIter();
    while((b = biter.next()) != null){
        sr = ship.radius;
        sp = ship.position_V;
        bp = b.position_V;
        d = VEC2.subtract(sp, bp);
        if(VEC2.magnitudeSquared(d) < (sr * sr)){ // broad phase test
            t = makeTranformMatrix(sp, ship.angle, 1.3); // scaled bigger
            sb_V = [];
            for(i = 0; i < sb_L.length; i++){
                sb_V.push(multiplyVec2HByMatrix3x3(sb_L[i], t));
            }
            isCollided = true;
            for(i = 0; i < sb_V.length; i++){   // narrow phase.
                ((i + 1) === sb_V.length) ? i2 = 0 : i2 = i + 1;
                normal = new Vector2H();
                normal.x = sb_V[i2].y - sb_V[i].y;
                normal.y = -(sb_V[i2].x - sb_V[i].x);
                lp = VEC2.subtract(bp, sb_V[i]);
                sign = VEC2.dot(normal, lp);
                if(sign > 0){ // if point on inside.
                    isCollided = false;
                    break;
                }
            }
            if(isCollided){
                spawnParticles(10, time, sp.x, sp.y, particles);
                ship.spawnTime = time + config.shipSpawnDelay;
                bullets.remove(b);
                sfx.bangSmall.play();
                return;
            }
        }
    }
}

function bulletsVsSaucer(bullets, saucer, time, particles, playData){
    let b, biter, bp, sp, sr, d, sval;
    b = null;
    biter = bullets.getIter();
    while((b = biter.next()) != null){
        sr = saucer.radius;
        sp = saucer.position_V;
        bp = b.position_V;
        d = VEC2.subtract(sp, bp);
        if(VEC2.magnitudeSquared(d) < (sr * sr)){
            sval = config.saucerScoreValue[saucer.size];
            playData.score += sval;
            playData.scoreFromLife -= sval;
            spawnParticles(10, time, sp.x, sp.y, particles);
            killSaucer();
            sfx.bangMedium.play();
            bullets.remove(b);
        }
    }
}

//
// <note>
//   Basically the same as shipVsAsteroids except with only one asteroid (the
//   saucer).
// </note>
//
function shipVsSaucer(ship, saucer, time, shipParticles, saucerParticles){
    if(ship.spawnTime !== 0){
        return;
    }
    let a, ap, ar, sp, sr, sb_L, d, dms, t, sb_V, i;
    sb_L = ship.bounds_L;
    sr = ship.radius;
    sp = ship.position_V;    
    ap = saucer.position_V;
    ar = saucer.radius;
    d = VEC2.subtract(ap, sp);
    dms = VEC2.magnitudeSquared(d);
    if(dms < ((ar * ar) + (sr * sr))){ // broad phase check.
        t = makeTranformMatrix(sp, ship.angle, 1.0);
        sb_V = [];
        for(i = 0; i < sb_L.length; i++){
            sb_V.push(multiplyVec2HByMatrix3x3(sb_L[i], t));
        }
        for(i = 0; i < sb_V.length; i++){
            d = VEC2.subtract(sb_V[i], ap);
            dms = VEC2.magnitudeSquared(d);
            if(dms < (ar * ar)){ // narrow phase: circle-corner test.
                ship.spawnTime = time + config.shipSpawnDelay;
                killSaucer();
                spawnParticles(10, time, sp.x, sp.y, shipParticles);
                spawnParticles(10, time, ap.x, ap.y, saucerParticles);
                sfx.bangLarge.play();
                return;
            }
        }
        // narrow phase: circle-edge test. (would go here).
    }
       
}

function particlesVsTime(particles, time){
    let pa, iter;
    pa = null;
    iter = particles.getIter();
    while((pa = iter.next()) != null){
        if(pa.dissolveTime < time){
            particles.remove(pa);
        }
    }
}

function asteroidsVsView(asteroids){
    let a, iter, p, vw, vh, lm;
    vw = config.viewWidth;
    vh = config.viewHeight;
    lm = config.loopMargin;
    a = null;
    iter = asteroids.getIter();
    while((a = iter.next()) != null){
        p = a.position_V;
        if(p.x < (-lm)){
            p.x = vw + lm;
        }
        else if(p.x > (vw + lm)){
            p.x = -lm;
        }
        if(p.y < (-lm)){
            p.y = vh + lm
        }
        else if(p.y > (vh + lm)){
            p.y = -lm;
        }
    }
}

//
// <note>
//   Performs broad phase then narrow phase tests. Narrow phase tests circle
//   against triangle but only tests the conditions in which a triangle corner
//   resides inside the circle and where a circle intersects a triangle edge.
//   Ignores the case where a circle sits inside the triangle since the ship 
//   triangle is small compared to all circles, so a circle cannot reside 
//   entirely in the triangle. A circle-triangle edge collision is also highly
//   unlikely to happen without also a circle-triangle corner collision but
//   it could happen with small asteroids colliding with the ship side before
//   being propelled away with a pulse.
//  
//   ADDENDUM: testing actually proved it unnecessary to implement circle-edge
//   tests. Objects move so fast the player can hardly notice anyhow and a
//   circle-edge only collision is so unlikely, if it actually happens, the 
//   player should go buy a lottery ticket. :)
// </note>
// <note>
//   We only need to find one collision to kill the ship. Once we have one 
//   collision all others can be ignored.
// </note>
//
function shipVsAsteroids(ship, asteroids, time, particles){
    if(ship.spawnTime !== 0){
        return;
    }
    let a, iter, ap, ar, sp, sr, sb_L, d, dms, t, sb_V, i;
    sb_L = ship.bounds_L;
    sr = ship.radius;
    sp = ship.position_V;
    a = null;
    iter = asteroids.getIter();
    while((a = iter.next()) != null){
        ap = a.position_V;
        ar = a.radius;
        d = VEC2.subtract(ap, sp);
        dms = VEC2.magnitudeSquared(d);
        if(dms < ((ar * ar) + (sr * sr))){ // broad phase check.
            t = makeTranformMatrix(sp, ship.angle, 1.0);
            sb_V = [];
            for(i = 0; i < sb_L.length; i++){
                sb_V.push(multiplyVec2HByMatrix3x3(sb_L[i], t));
            }
            for(i = 0; i < sb_V.length; i++){
                d = VEC2.subtract(sb_V[i], ap);
                dms = VEC2.magnitudeSquared(d);
                if(dms < (ar * ar)){ // narrow phase: circle-corner test.
                    ship.spawnTime = time + config.shipSpawnDelay;
                    spawnParticles(10, time, sp.x, sp.y, particles);
                    sfx.bangSmall.play();
                    return;
                }
            }
            // narrow phase: circle-edge test. (would go here).
        }
    }   
}

function saucerVsAsteroids(saucer, asteroids, time, particles){
    let a, iter, ap, ar, sp, sr, sb_L, d, dms, t, sb_V, i;
    sr = saucer.radius;
    sp = saucer.position_V;
    a = null;
    iter = asteroids.getIter();
    while((a = iter.next()) != null){
        ap = a.position_V;
        ar = a.radius;
        d = VEC2.subtract(ap, sp);
        dms = VEC2.magnitudeSquared(d);
        if(dms < ((ar * ar) + (sr * sr))){
            killSaucer();
            spawnParticles(10, time, sp.x, sp.y, particles);
            sfx.bangSmall.play();
            return;
        }
    }   
}

//
// Loops ship around screen.
//
function shipVsView(ship){
    if(ship.spawnTime !== 0){
        return;
    }
    let p = ship.position_V;
    let vw = config.viewWidth;
    let vh = config.viewHeight;
    let m = config.loopMargin;
    if(p.x < (-m)){
        p.x = vw + m;
    }
    else if(p.x > (vw + m)){
        p.x = -m;
    }
    if(p.y < (-m)){
        p.y = vh + m
    }
    else if(p.y > (vh + m)){
        p.y = -m;
    }
}

function saucerVsView(saucer){
    let s, sp, lm, vw, vh, minssd, maxssd, ssd;
    lm = config.loopMargin;
    vw = config.viewWidth;
    vh = config.viewHeight;
    sp = saucer.position_V;
    if((sp.x < -lm) || (sp.x > (vw + lm))){
        killSaucer();
    }
    if(sp.y < -lm){
        sp.y = (vh + lm);
    }
    else if(sp.y > (vh + lm)){
        sp.y = -lm;
    }
}

// function cowboysVsAliens(){
// 
// }

//==============================================================================
// Audio - using web audio api
//==============================================================================

//
// sound effects
//
let sfx = {
    laserShoot : new Audio(),
    boost: new Audio(),
    bangLarge: new Audio(),
    bangMedium: new Audio(),
    bangSmall: new Audio(),
    saucerSmall: new Audio(),
    saucerBig: new Audio(),
    extraShip: new Audio(),
    pulse: new Audio()
}

//
// music
//
let music = {
    maxPower : new Audio(),
    elementaryWave: new Audio(),
}

//const audioCtxLegacy = undefined;
let audioCtx = undefined; 

let sfxGain = undefined; // sound effects gain node.
let mscGain = undefined; // music gain node.
let mstGain = undefined; // master gain node.

function initAudio(){
    // setup the sfx audio elements... (loads sounds).
    sfx.laserShoot.src = "assets/fire.ogg";
    sfx.laserShoot.type = "audio/mp3";
    sfx.boost.src = "assets/thrust.ogg";
    sfx.boost.type = "audio/mp3";
    sfx.boost.loop = true;
    sfx.bangLarge.src = "assets/bangLarge.ogg";
    sfx.bangLarge.type = "audio/mp3";
    sfx.bangMedium.src = "assets/bangMedium.ogg";
    sfx.bangMedium.type = "audio/mp3";
    sfx.bangSmall.src = "assets/bangSmall.ogg";
    sfx.bangSmall.type = "audio/mp3";
    sfx.saucerSmall.src = "assets/saucerSmall.ogg";
    sfx.saucerSmall.type = "audio/mp3";
    sfx.saucerSmall.loop = true;
    sfx.saucerBig.src = "assets/saucerBig.ogg";
    sfx.saucerBig.type = "audio/mp3";
    sfx.saucerBig.loop = true;
    sfx.extraShip.src = "assets/extraShip.ogg";
    sfx.saucerBig.type = "audio/mp3";
    sfx.pulse.src = "assets/pulse.ogg";
    sfx.pulse.type = "audio/mp3";

    // setup the music audio elements...
    music.maxPower.src = "assets/321011__littlerobotsoundfactory__loop-max-power-03.mp3"
    music.maxPower.type = "audio/mp3";
    music.maxPower.loop = true;
    music.elementaryWave.src = "assets/183881__deleted-user-2731495__elementary-wave-11.mp3"
    music.elementaryWave.type = "audio/mp3";
    music.elementaryWave.loop = true;


    // create the audio context...
    //audioCtxLegacy = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    // create the sfx gain node...
    sfxGain = audioCtx.createGain();

    // create the source nodes for the sfx and connect to the gain node...
    // note: NOT keeping references to the source nodes, need to?
    for(var audioID in sfx){
        if (!sfx.hasOwnProperty(audioID)){
            continue;
        }
        let srcNode = audioCtx.createMediaElementSource(sfx[audioID]);
        srcNode.connect(sfxGain);
    }

    // create the music gain node...
    mscGain = audioCtx.createGain();

    // create the source nodes for the music and connect to the gain node...
    // note: NOT keeping references to the source nodes, need to?
    for(var audioID in music){
        if (!music.hasOwnProperty(audioID)){
            continue;
        }
        let srcNode = audioCtx.createMediaElementSource(music[audioID]);
        srcNode.connect(mscGain);
    }

    // create a master gain node...
    mstGain = audioCtx.createGain();

    // connect the sfx gain and music gain nodes to the master...
    sfxGain.connect(mstGain);
    mscGain.connect(mstGain);

    // connect the master gain node to the destination/output...
    mstGain.connect(audioCtx.destination);

    // reduce volume of music relative to the sfx.
    mscGain.gain.value = 0.5;
}

function pauseAllSFX(){
    Object.keys(sfx).forEach(function(key) {
        sfx[key].pause();
    });
}


//==============================================================================
// Rendering
//==============================================================================

function Renderer(containerID, canvasWidth, canvasHeight){
    this.canvas = document.createElement('canvas');
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.canvas.style.background = "#000000"
    this.context = this.canvas.getContext('2d');
    this.context.strokeStyle = "#FFFFFF";
    this.context.fillStyle = "#FFFFFF";
    this.context.font = config.hudFont;
    this.context.lineWidth = 2;
    document.getElementById(containerID).appendChild(this.canvas);
}

let g_renderer = null;

function transformPoints(points, transform){
    let points_V = [];
    for(let i = 0; i < points.length; i++){
        points_V.push(multiplyVec2HByMatrix3x3(points[i], transform));
    }
    return points_V;
}

function clearView(renderer){
    renderer.context.clearRect(0, 0, config.viewWidth, config.viewHeight);
}

function drawPolygon(polygon, transform, renderer){
    let ctx = renderer.context;
    let points_V = transformPoints(polygon.points, transform);
    let isClosed = polygon.isClosed;
    ctx.beginPath();
    ctx.moveTo(points_V[0].x, points_V[0].y);
    for(let i = 1; i < points_V.length; i++){
        ctx.lineTo(points_V[i].x, points_V[i].y);
    }
    if(isClosed){
        ctx.lineTo(points_V[0].x, points_V[0].y);
    }
    ctx.stroke();
}

function debugDrawShip(ship, renderer){
    let ctx, r, a, b, iter, p;
    ctx = renderer.context;
    ctx.strokeStyle = "#0000FF";
    r = ship.radius;
    a = Math.PI * 2;
    p = ship.position_V;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, a, false);
    ctx.stroke();
}

function drawShip(ship, renderer){
    if(ship.spawnTime !== 0){
        return;
    }
    let ctx, i, r;
    r = ship.pulseRadius;
    ctx = renderer.context;
    ctx.strokeStyle = config.playerColor;
    ctx.beginPath();
    ctx.arc(ship.position_V.x, ship.position_V.y, r, 0, Math.PI * 2, false);
    ctx.stroke();
    let transform = makeTranformMatrix(ship.position_V, ship.angle);
    drawPolygon(ship.body_L, transform, renderer);
    if(ship.isBoosting){
        drawPolygon(ship.tail_L, transform, renderer);
    }
    //debugDrawShip(ship, renderer);
}

//
// Draws a set of bullets.
//
// <param {List} bullets>
//   The list which will store the new bullet.
// </param> 
// <param {Renderer} renderer>
//   The renderer doing the rendering.
// </param>
//
function drawBullets(bullets, color, renderer){
    let ctx, r, a, b, iter, p;
    ctx = renderer.context;
    ctx.fillStyle = color;
    r = config.bulletRadius;
    a = Math.PI * 2;
    b = null;
    iter = bullets.getIter();
    while((b = iter.next()) != null){
        p = b.position_V;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, a, false);
        ctx.fill();
    }
}

function drawParticles(particles, color, renderer){
    let ctx, r, a, pa, iter, p;
    ctx = renderer.context;
    ctx.fillStyle = color;
    r = config.particleRadius;
    a = Math.PI * 2;
    pa = null;
    iter = particles.getIter();
    while((pa = iter.next()) != null){
        p = pa.position_V;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, a, false);
        ctx.fill();
    }
}

function debugDrawAsteroid(asteroid, renderer){
    let ctx, r, a, b, iter, p;
    ctx = renderer.context;
    ctx.strokeStyle = "#00FF00";
    r = asteroid.radius;
    a = Math.PI * 2;
    p = asteroid.position_V;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, a, false);
    ctx.stroke();
}

function drawAsteroid(asteroid, renderer){
    let p = asteroid.position_V;
    let a = asteroid.angle;
    let s = asteroid.scale;
    let transform = makeTranformMatrix(p, a, s);
    drawPolygon(asteroid.body_L, transform, renderer);
}

function drawAsteroids(asteroids, renderer){
    renderer.context.strokeStyle = config.asteroidColor;
    let a = null;
    iter = asteroids.getIter();
    while((a = iter.next()) != null){
        //debugDrawAsteroid(a, renderer);
        drawAsteroid(a, renderer);
    }
}

function drawSaucer(saucer, renderer){
    let t, sb, i, poly;
    renderer.context.strokeStyle = config.saucerColor;
    t = makeTranformMatrix(saucer.position_V, 0.0, saucer.scale);
    sb = saucer.body_L;
    poly = new Polygon(sb[0], true);
    drawPolygon(poly, t, renderer);
    poly.isClosed = false;
    for(i = 1; i < sb.length; i++){
        poly.points = sb[i];
        drawPolygon(poly, t, renderer);
    }
    //debugDrawAsteroid(saucer, renderer);
}

//
// <param {int} digit>
//   The digit to draw. Availible digits are a-z, 0-9.
// </param>
// <param {matrix3x3} transform>
//   The transformation to apply to the digit.
// </param>
//
function drawDigit(digit, transform, renderer){
    let strokes, poly, i;
    strokes = ASTEROIDS_FONT[digit];
    if(!strokes){
        throw Error("error: cannot draw digit: " + digit + ", not in alphabet");
    }
    for(i = 0; i < strokes.length; i++){
        poly = new Polygon(strokes[i].points_L, strokes[i].isClosed);
        drawPolygon(poly, transform, renderer);
    }
}

//
// <param {Vector2H} position>
//   The top-left position of the text sign relative to the view.
// </param>
// <param {float} scale>
//   The scale of the text to draw. Base size is 28px tall. Scale is relative to
//   base. Thus a scale of 1.5 draws at 28*1.5px tall.
// </param>
//
function drawText(text, position, scale, renderer, color = config.baseColor, lineWidth = 2){
    let t, dg, bw, dw, ds;
    renderer.context.strokeStyle = color;
    renderer.context.lineWidth = lineWidth;
    bw = ASTEROIDS_FONT.baseWidth;
    dw = bw * scale; // digit width
    ds = ASTEROIDS_FONT.horizontalSpacing + dw + lineWidth; // digit spacing
    dsv = new Vector2H(ds, 0); // digit spacing vector
    t = makeTranformMatrix(position, 0.0, scale);
    dg = text.toString().split(''); // split text into array of digits
    for(i = 0; i < dg.length; i++){
        if(i !== 0){
            applyTranslationToTransform(dsv, t);
        }
        drawDigit(dg[i], t, renderer);
    }
    renderer.context.lineWidth = 2;
}

function drawHUD(playData, renderer){
    let st, i, dg, poly, lsv, rtp, tpv, vw;
    renderer.context.strokeStyle = config.hudColor;
    vw = config.viewWidth;
    tpv = new Vector2H();
    dg = playData.score.toString().split(''); // seperate digits
    st = "";
    if(dg.length === 1){
        st += "0";
    }
    st += playData.score.toString();
    tpv.x = 10;
    tpv.y = 10;
    drawText(st, tpv, 1.0, renderer, config.hudColor);

    dg = g_game.highScore.toString().split(''); // seperate digits
    st = "";
    if(dg.length === 1){
        st += "0";
    }
    st += g_game.highScore.toString();
    tpv.x = vw - 200;
    tpv.y = 10;
    drawText(st, tpv, 1.0, renderer, config.hudColor);

    if(playData.lives !== Infinity){
        lsv = new Vector2H(15.0, 0); // lives spacing vector
        t = makeTranformMatrix(new Vector2H(60, 60), 0.0, 1.0);
        poly = new Polygon(SHAPES.ship.points_L, true);
        for(i = 0; i < playData.lives; i++){
            if(i !== 0){
                applyTranslationToTransform(lsv, t);
            }
            drawPolygon(poly, t, renderer);    
        }
    }

    dg = playData.round.toString().split(''); // seperate digits
    st = "";
    if(dg.length === 1){
        st += "0";
    }
    st += playData.round.toString();
    tpv.x = config.viewWidth * 0.5 - 30;
    tpv.y = 10;
    drawText(st, tpv, 1.0, renderer, config.hudColor);
}

//==============================================================================
// User Input
//==============================================================================

let keyState = new Map();

function onKeyDown(event){
    keyState.set(event.keyCode, true);
}

function onKeyUp(event){
    keyState.delete(event.keyCode);
}

function attachInputHandlers(){
    window.addEventListener('keyup', onKeyUp, false);
    window.addEventListener('keydown', onKeyDown, false);
}

function releaseInputHandlers(){
    window.removeEventListener('keyup', onKeyUp, false);
    window.removeEventListener('keydown', onKeyDown, false);
}

function isKeyDown(keyCode){
    return keyState.get(keyCode);
}

//==============================================================================
// Game Core
//==============================================================================

function Game(){
    this.STATES = {
        MENU: 0xb001,
        PLAY: 0xb002,
        OVER: 0xb003
    };
    Object.freeze(this.STATES);
    this.state = this.STATES.MENU;
    this.time = 0; // total time passed since game start. (unit: seconds).
    this.stars = new List();
    this.highScore = 0; // highest score this session (window instance).
    this.playData = {
        ship: null,
        bullets: new List(),
        saucer: null,
        saucerBullets: new List(),
        saucerSpawnTime: 0,
        asteroids: new List(),
        asteroidParticles: new List(),
        saucerParticles: new List(),
        shipParticles: new List(),
        data: { // groups data into an object so they can be changed inside a function.
            round: -1,
            score: 0,
            lives: 30,
            scoreFromLife: 10000 // score to gain until get a new life
        }
    };
    this.menuData = {
        activeRow: 0,
        lastChangeTime: 0, //limits how fast states change; because can only respond if key down. not when key down.
        rows: [
            {
                name: "DIFFICULTY",
                activeOption: 0,
                options: [
                    {
                        name: "NORMAL",
                        value: "diff_norm"
                    },
                    {   
                        name: "HARD",
                        value: "diff_hard"
                    },
                    {
                        name: "IMPOSSIBLE",
                        value: "diff_impo"
                    },
                    {
                        name: "PRACTICE",   // make a seperate option?
                        value: "diff_prac" // sets lives = infinite
                    }
                ]
            },
            {
                name: "PLAYER-COLOR",
                activeOption: 0,
                options: [
                    {
                        name: "ORANGE",
                        value: "#ff570a"
                    },
                    {   
                        name: "CRIMSON",
                        value: "#dc143c"
                    },
                    {
                        name: "DEEP-PINK",
                        value: "#ff1493"
                    },
                    {   
                        name: "SPRING-GREEN",
                        value: "#00ff7f"
                    },
                    {   
                        name: "CYAN",
                        value: "#00ffff"
                    },
                    {   
                        name: "GHOST-WHITE",
                        value: "#f8f8ff"
                    },
                    {   
                        name: "YELLOW",
                        value: "#ffff33"
                    },
                    {   
                        name: "DODGER-BLUE",
                        value: "#1e90ff"
                    }
                ]
            },
            {
                name: "ALIEN-COLOR",
                activeOption: 3,
                options: [
                    {
                        name: "ORANGE",
                        value: "#ff570a"
                    },
                    {   
                        name: "CRIMSON",
                        value: "#dc143c"
                    },
                    {
                        name: "DEEP-PINK",
                        value: "#ff1493"
                    },
                    {   
                        name: "SPRING-GREEN",
                        value: "#00ff7f"
                    },
                    {   
                        name: "CYAN",
                        value: "#00ffff"
                    },
                    {   
                        name: "GHOST-WHITE",
                        value: "#f8f8ff"
                    },
                    {   
                        name: "YELLOW",
                        value: "#ffff33"
                    },
                    {   
                        name: "DODGER-BLUE",
                        value: "#1e90ff"
                    }
                ]
            },
            {
                name: "ASTEROID-COLOR",
                activeOption: 5,
                options: [
                    {
                        name: "ORANGE",
                        value: "#ff570a"
                    },
                    {   
                        name: "CRIMSON",
                        value: "#dc143c"
                    },
                    {
                        name: "DEEP-PINK",
                        value: "#ff1493"
                    },
                    {   
                        name: "SPRING-GREEN",
                        value: "#00ff7f"
                    },
                    {   
                        name: "CYAN",
                        value: "#00ffff"
                    },
                    {   
                        name: "GHOST-WHITE",
                        value: "#f8f8ff"
                    },
                    {   
                        name: "YELLOW",
                        value: "#ffff33"
                    },
                    {   
                        name: "DODGER-BLUE",
                        value: "#1e90ff"
                    }
                ]
            },
            {
                name: "HUD-COLOR",
                activeOption: 5,
                options: [
                    {
                        name: "ORANGE",
                        value: "#ff570a"
                    },
                    {   
                        name: "CRIMSON",
                        value: "#dc143c"
                    },
                    {
                        name: "DEEP-PINK",
                        value: "#ff1493"
                    },
                    {   
                        name: "SPRING-GREEN",
                        value: "#00ff7f"
                    },
                    {   
                        name: "CYAN",
                        value: "#00ffff"
                    },
                    {   
                        name: "GHOST-WHITE",
                        value: "#f8f8ff"
                    },
                    {   
                        name: "YELLOW",
                        value: "#ffff33"
                    },
                    {   
                        name: "DODGER-BLUE",
                        value: "#1e90ff"
                    }
                ]
            }
        ]
    }
}

let g_game = null;

function initGame(){
    g_renderer = new Renderer("canvas-div", config.viewWidth, config.viewHeight);
    g_game = new Game();
    initAudio();
    music.elementaryWave.play();
    attachInputHandlers();
    initStars();
}

function initStars(){
    let i, vw, vh, px, py, s;
    vw = config.viewWidth;
    vh = config.viewHeight;
    for(i = 0; i < 100; i++){
        px = (Math.random() * vw); // x position
        py = (Math.random() * vh); // x position
        s = new Particle(0, px, py, 0, 0, 0, 0);
        g_game.stars.append(s);
    }
}

function startRound(){
    let c, ab, ai, am, s;
    ab = config.baseAsteroidsPerRound;
    ai = config.asteroidIncreasePerRound;
    am = config.maxAsteroidsPerRound; 
    s = config.asteroidMaxSize;
    g_game.playData.data.round++;
    c = ab + (g_game.playData.data.round * ai);
    if(c > am){
        c = am;
    }
    spawnAsteroids(c, config.asteroidStartScale, s, g_game.playData.asteroids);
}

function trySpawnShip(){
    let gpd, s, vw, vh;
    gpd = g_game.playData; 
    s = gpd.ship;
    if(s.spawnTime != 0){
        if(s.spawnTime < g_game.time){
            gpd.data.lives--;
            if(gpd.data.lives < 0){
                s.spawnTime = Infinity;
                g_game.state = g_game.STATES.OVER;
                if(g_game.highScore < gpd.data.score){
                    g_game.highScore = gpd.data.score;
                }
                music.maxPower.pause();
                music.elementaryWave.play();
                pauseAllSFX();
            }
            vw = config.viewWidth;
            vh = config.viewHeight;
            s.spawnTime = 0;
            s.position_V.x = vw * 0.5;
            s.position_V.y = vh * 0.5;
            s.angle = 0;
            s.velocity_V.x = 0.0;
            s.velocity_V.y = 0.0;
            s.lastPulseTime = 0.0;
            s.lastShootTime = 0.0;
            shipPulse(s, g_game.playData.asteroids, g_game.time);
        }
    }
}

function killSaucer(){
    let minssd, maxssd, ssd, ss;
    minssd = config.saucerMinSpawnDelay;
    maxssd = config.saucerMinSpawnDelay;
    ss = g_game.playData.saucer.size;
    if(ss){
        sfx.saucerBig.pause();
    }
    else{
        sfx.saucerSmall.pause();
    }
    delete g_game.playData.saucer;
    g_game.playData.saucer = null;
    ssd = (Math.random() * (maxssd - minssd)) + minssd;
    g_game.playData.saucerSpawnTime = g_game.time + ssd;
}

function trySpawnSaucer(){
    let st, t, ss, px, py, vx, s;
    st = g_game.playData.saucerSpawnTime;
    if(!st){
        return;
    }
    t = g_game.time;
    if(st < t){
        if(g_game.playData.data.score > 10000){ // then can spawn little saucers
            ss = Math.floor(Math.random() * 100) % 4; // saucer size
            (ss < 3) ? ss = 0 : ss = 1;
        }
        else{
            ss = 1;
        }
        vx = config.saucerSpeed;
        px = Math.floor((Math.random() * 100) % 2) * config.viewWidth;
        if(px){
            px += config.loopMargin;
            vx *= -1;
        }
        else {
            px -= config.loopMargin;
        }
        py = Math.floor((Math.random() * 100) % 2) * config.viewHeight;
        if(py){
            py -= 150;
        }
        else {
            py += 150;
        }
        s = new Saucer(t, px, py, vx, 0.0, ss);
        g_game.playData.saucer = s;
        g_game.playData.saucerSpawnTime = 0;
        if(ss){
            sfx.saucerBig.play();
        }
        else{
            sfx.saucerSmall.play();
        }
    }
}

function menuBegin(){
    let gmd, isChanged, ar;
    gmd = g_game.menuData;
    ar = gmd.rows[gmd.activeRow];
    isChanged = false;
    if((g_game.time - gmd.lastChangeTime) < config.menuChangeDelay){
        return;
    }
    if(isKeyDown(KEYS.DOWN)){
        gmd.activeRow++;
        if(gmd.activeRow >= gmd.rows.length){
            gmd.activeRow = 0;
        }
        isChanged = true;
    }
    else if(isKeyDown(KEYS.UP)){
        gmd.activeRow--;
        if(gmd.activeRow < 0){
            gmd.activeRow = (gmd.rows.length - 1);
        }
        isChanged = true;
    }
    if(isKeyDown(KEYS.RIGHT)){
        ar.activeOption++;
        if(ar.activeOption >= ar.options.length){
            ar.activeOption = 0;
        }
        isChanged = true;
    }
    else if(isKeyDown(KEYS.LEFT)){
        ar.activeOption--;
        if(ar.activeOption < 0){
            ar.activeOption = (ar.options.length - 1);
        }
        isChanged = true;
    }
    if(isKeyDown(KEYS.ENTER)){
        resetPlay();
        g_game.state = g_game.STATES.PLAY;
    }

    if(isChanged){
        gmd.lastChangeTime = g_game.time;
    }
}

function menuUpdate(){

}

function menuDraw(){
    let gmd, i, mrx, mrtext, pv, pvdy, color; 
    pv = new Vector2H();
    mrx = 500;
    pv.x = mrx;
    pv.y = 400;
    pvdy = 40;
    gmd = g_game.menuData;
    for(i = 0; i < gmd.rows.length; i++){
        if(i !== 0){
            pv.y += pvdy;
        }
        mrtext = gmd.rows[i].name; 
        mrtext += "--";
        color = config.baseColor;
        if(i === gmd.activeRow){
            color = "#888888";
        }
        drawText(mrtext, pv, 0.5, g_renderer, color);
        pv.x += (mrtext.length * ASTEROIDS_FONT.baseWidth * 0.5);
        pv.x += ((mrtext.length + 4) * ASTEROIDS_FONT.horizontalSpacing + ASTEROIDS_FONT.baseWidth * 0.5 + 2);
        mrtext = gmd.rows[i].options[gmd.rows[i].activeOption].name;
        if(i != 0){
            color = gmd.rows[i].options[gmd.rows[i].activeOption].value;
        }
        drawText(mrtext, pv, 0.5, g_renderer, color);
        pv.x = mrx;
    }
    drawText("ASTEROIDS", new Vector2H(230, 50), 5, g_renderer, "#ffffff", 4);
    drawText("PRESS-ENTER-TO-PLAY", new Vector2H(500, 220), 0.8, g_renderer);
    drawText("SETTINGS", new Vector2H(500, 350), 0.8, g_renderer);
    drawText("-----------------", new Vector2H(500, 375), 0.8, g_renderer);
}

function assignSettings(){
    let gmd, gpd;
    gmd = g_game.menuData;
    gpd = g_game.playData;
    switch(gmd.rows[0].options[gmd.rows[0].activeOption].value){
        case "diff_prac":
            gpd.data.lives = Infinity;   
            config.asteroidSplitCount = 3;
            break;
        case "diff_norm":
            gpd.data.lives = 3;
            config.asteroidSplitCount = 2;
            break;
        case "diff_hard":
            gpd.data.lives = 2;
            config.asteroidSplitCount = 3;
            break;
        case "diff_impo":
            gpd.data.lives = 1;
            config.asteroidSplitCount = 4;
            break;
    }
    config.playerColor = gmd.rows[1].options[gmd.rows[1].activeOption].value;
    config.saucerColor = gmd.rows[2].options[gmd.rows[2].activeOption].value;
    config.asteroidColor = gmd.rows[3].options[gmd.rows[3].activeOption].value;
    config.hudColor = gmd.rows[4].options[gmd.rows[4].activeOption].value;
}

function resetPlay(){
    let gpd;
    gpd = g_game.playData;
    gpd.ship = new Ship(config.viewWidth * 0.5, config.viewHeight * 0.5);
    gpd.bullets.clear();
    gpd.saucer = null;
    gpd.saucerBullets.clear();
    gpd.saucerSpawnTime = g_game.time + config.firstSaucerDelay;
    gpd.asteroids.clear();
    gpd.asteroidParticles.clear();
    gpd.saucerParticles.clear();
    gpd.shipParticles.clear();
    gpd.data.scoreFromLife = 10000;
    gpd.data.score = 0;
    gpd.data.round = -1;

    assignSettings();
    music.elementaryWave.pause();
    music.maxPower.play();
}

function playBegin(){
    let ship, time, gpd;
    gpd = g_game.playData;
    ship = gpd.ship;
    time = g_game.time;
    if(isKeyDown(KEYS.ESC)){
        g_game.state = g_game.STATES.MENU;
        pauseAllSFX();
        music.maxPower.pause();
        music.elementaryWave.play();
    }
    if(isKeyDown(KEYS.LEFT)){
        ship.rotationState = -1;
    }
    else if(isKeyDown(KEYS.RIGHT)){
        ship.rotationState = 1;
    }
    else{
        ship.rotationState = 0;
    }
    if(isKeyDown(KEYS.UP)){
        ship.isBoosting = true;
        sfx.boost.play();
    }
    else {
        if(ship.isBoosting){
            ship.isBoosting = false;
            sfx.boost.pause();
        }
    }
    if(isKeyDown(KEYS.SPACE)){
        shipShoot(ship, gpd.bullets, time);
    }
    if(isKeyDown(KEYS.DOWN)){
        shipPulse(ship, gpd.asteroids, time);
    }
}

function playUpdate(dt_s){
    let gpd, time;
    gpd = g_game.playData;
    time = g_game.time;

    if(gpd.asteroids.getLength() === 0){
        startRound();
    }
    trySpawnShip();
    trySpawnSaucer();

    updateShip(gpd.ship, dt_s);
    if(gpd.saucer){
        updateSaucer(gpd.saucer, dt_s, time);
    }
    integrateBulletsPos(gpd.bullets, dt_s);
    integrateBulletsPos(gpd.saucerBullets, dt_s);
    integrateAsteroidsPos(gpd.asteroids, dt_s);
    integrateParticlesPos(gpd.asteroidParticles, dt_s);
    integrateParticlesPos(gpd.saucerParticles, dt_s);
    integrateParticlesPos(gpd.shipParticles, dt_s);

    asteroidsVsView(gpd.asteroids);
    shipVsView(gpd.ship);
    bulletsVsView(gpd.bullets);
    bulletsVsView(gpd.saucerBullets);
    bulletsVsShip(gpd.saucerBullets, gpd.ship, time, gpd.shipParticles);
    if(gpd.saucer){
        saucerVsView(gpd.saucer);
    }

    shipVsAsteroids(gpd.ship, gpd.asteroids, time, gpd.shipParticles);
    bulletsVsAteroids(gpd.bullets, gpd.asteroids, time, gpd.asteroidParticles, gpd.data);
    
    //
    // absolute mess! but it must be done as each call has the potential to 
    // destroy the saucer.
    //
    if(gpd.saucer){
        bulletsVsSaucer(gpd.bullets, gpd.saucer, time, gpd.saucerParticles, gpd.data);
    }
    if(gpd.saucer){
        shipVsSaucer(gpd.ship, gpd.saucer, time, gpd.shipParticles, gpd.saucerParticles);
    }
    if(gpd.saucer){
        saucerVsAsteroids(gpd.saucer, gpd.asteroids, time, gpd.saucerParticles);
    }

    bulletsVsTime(gpd.bullets, time);
    bulletsVsTime(gpd.saucerBullets, time);
    particlesVsTime(gpd.asteroidParticles, time);
    particlesVsTime(gpd.saucerParticles, time);
    particlesVsTime(gpd.shipParticles, time);

    if(gpd.saucer){
        saucerShoot(gpd.saucer, gpd.ship, gpd.saucerBullets, time);
    }

    if(gpd.data.scoreFromLife < 0){
        gpd.data.lives++;
        gpd.data.scoreFromLife += 10000;
        sfx.extraShip.play();
    }
}

function playDraw(){
    let gpd;
    gpd = g_game.playData;

    drawShip(gpd.ship, g_renderer);
    if(gpd.saucer){
        drawSaucer(gpd.saucer, g_renderer);
    }
    drawBullets(gpd.bullets, config.playerColor, g_renderer);
    drawBullets(gpd.saucerBullets, config.saucerColor, g_renderer);
    drawParticles(gpd.asteroidParticles, config.asteroidColor, g_renderer);
    drawParticles(gpd.saucerParticles, config.saucerColor, g_renderer);
    drawParticles(gpd.shipParticles, config.playerColor, g_renderer);
    drawAsteroids(gpd.asteroids, g_renderer);
    drawHUD(gpd.data, g_renderer);
}

function overBegin(){
    if(isKeyDown(KEYS.ESC)){
        g_game.state = g_game.STATES.MENU;
    }
}

function overUpdate(dt_ms){

}

function overDraw(){
    let gpd, text, pv;
    gpd = g_game.playData;
    pv = new Vector2H();
    text = "SCORE-" + gpd.data.score;
    pv.x = 550;
    pv.y = 450;
    drawText(text, pv, 0.5, g_renderer);
    text = "HIGH-SCORE-" + g_game.highScore;
    pv.x = 550;
    pv.y = 480;
    drawText(text, pv, 0.5, g_renderer);
    pv.x = 280;
    pv.y = 200;
    drawText("GAME-OVER", pv, 4, g_renderer, "#ffffff", 4);
    pv.x = 420;
    pv.y = 340;
    drawText("PRESS-ESCAPE-TO-CONTINUE", pv, 0.8, g_renderer);
}


function begin(){
    switch(g_game.state){
        case g_game.STATES.MENU:
            menuBegin();
            break;
        case g_game.STATES.PLAY:
            playBegin();
            break;
        case g_game.STATES.OVER:
            overBegin();
            break;
    }
}   

function update(dt_ms){
    let dt_s = dt_ms * 0.001;
    g_game.time += dt_s;
    switch(g_game.state){
        case g_game.STATES.MENU:
            menuUpdate(dt_s);
            break;
        case g_game.STATES.PLAY:
            playUpdate(dt_s);
            break;
        case g_game.STATES.OVER:
            overUpdate(dt_s);
            break;  
    }
}

function draw(){
    clearView(g_renderer);
    drawParticles(g_game.stars, "#555555", g_renderer);
    switch(g_game.state){
        case g_game.STATES.MENU:
            menuDraw();
            break;
        case g_game.STATES.PLAY:
            playDraw();
            break;
        case g_game.STATES.OVER:
            overDraw();
            break;
    }
}



//function end(){
//}

function startGame(){
    if(g_game !== null){
        return;
    }
    MainLoop.setBegin(begin);
    MainLoop.setUpdate(update);
    MainLoop.setDraw(draw);
    //MainLoop.setEnd(end);

    initGame();
    MainLoop.start();
}

window.ASTEROIDS = {};
window.ASTEROIDS.startGame = startGame;
}());