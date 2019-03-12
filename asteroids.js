

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

    this.length = function(){
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
    viewWidth: 800, // (unit: pixels)
    viewHeight: 600,
    loopMargin: 10, // margin around view before enter "loop zone"(unit: pixels)
    shipBoostForce: 100, // force magnitude (unit: newtons).
    shipMass: 1, // (unit: kilograms).
    shipInverseMass: (1 / 1),
    shipAngularSpeed: 4, // (unit: degrees per second).
    shipMaxSpeedSquared: 50000,
    shipShootDelay: 0.2, // limit fire rate (unit: seconds).
    shipPulseDelay: 0.5, // limits pulse rate (unit: seconds).
    bulletSpeed: 400, // (unit: meters per second).
    bulletRadius: 1, // drawing only, bullets considered points (unit: pixels)
    maxAsteroidSpeed: 200, // (unit: meters per second)
    minAsteroidSpeed: 100,
    asteroidSpawnExlusionRadius: 100, // circle centered at screen center.
    asteroidUnitMass: 10, // mass per unit of scale (unit: kg per unit scale).
    minParticleSpeed: 200, // (unit: meters per second)
    maxParticleSpeed: 400, 
    particleAcceleration: -100, // (unit: meters per second squared)
    particleMinAge: 0.6,  // (unit: seconds)
    particleMaxAge: 1.0,
    particleRadius: 1, // (unit: pixel)
    playerColor: "#91ffec",
    pulseImpulse: 1.5, // (unit: newton seconds).
    pulseRadiusSquared: 10000, // (unit: meters) 
};
Object.freeze(config);

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
        radius: 2.20,
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
        radius: 2.33,
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
        radius: 2.21,
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
    this.body_L = new Polygon([ // _L means points in local space.
        new Point2H(0, 0),
        new Point2H(10, 20),
        new Point2H(-10, 20)
        ], 
        true
    );
    this.tail_L = new Polygon([
        new Point2H(4, 20),
        new Point2H(0, 28),
        new Point2H(-4, 20),
        ],
        false
    );
}

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
    let p, sv, bv, b, sd;
    sd = config.shipShootDelay;
    if((time - ship.lastShootTime) < sd){
        return;
    }
    p = ship.position_V;
    sv = ship.velocity_V;
    bv = cloneObject(NORTH);
    VEC2.rotateIP(bv, ship.angle);
    VEC2.scaleIP(bv, config.bulletSpeed);
    VEC2.addIP(bv, sv);
    b = new Bullet(p.x, p.y, bv.x, bv.y);
    bullets.append(b);
    ship.lastShootTime = time;
}

//
// Applies an impulse to all asteroids and particles. The impulse force can be
// considered to act for an infinitesimal time period.
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
//
function shipPulse(ship, asteroids, time){
    let pd, J, aiter, a, d, ds, m, um, sf, dv, prs;
    pd = config.shipPulseDelay;
    if((time - ship.lastPulseTime) < pd){
        return;
    }
    J = config.pulseImpulse;
    um = config.asteroidUnitMass;
    prs = config.pulseRadiusSquared;
    a = null;
    aiter = asteroids.getIter();
    while((a = aiter.next()) != null){
        d = VEC2.subtract(a.position_V, ship.position_V); // distance
        ds = VEC2.magnitudeSquared(d); // distance squared
        if(ds < prs){
            m = a.scale * um; // mass
            sf = (J / m * ds); // scale factor
            dv = VEC2.normalise(d); 
            VEC2.scaleIP(dv, sf); // instantaneous change in velocity.
            VEC2.addIP(a.velocity_V, dv);
        }
    }
    ship.lastPulseTime = time;
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
    mins = config.minAsteroidSpeed;
    maxs = config.maxAsteroidSpeed;
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

function Bullet(x = 0, y = 0, vx = 0, vy = 0){
    this.position_V = new Point2H(x, y); // _V means relative to view space.
    this.velocity_V = new Vector2H(vx, vy);
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
// Collision Detection
//==============================================================================

//
// Handles collisions between bullets and the view. Bullets are destroyed when
// they go too far off screen; no bullet looping.
//
// <param {list} bullets>
//   A linked list containing all the bullets to test.
// </param>
//
function bulletsVsView(bullets){
    let b = null;
    let p = null;
    let vw = config.viewWidth;
    let vh = config.viewHeight;
    let m = config.loopMargin;
    let isVamoosed = false;
    let iter = bullets.getIter();
    while((b = iter.next()) != null){
        p = b.position_V;
        if(p.x < -m || p.x > (vw + m)){
            isVamoosed = true;
        }
        else if(p.y < -m || p.y > (vh + m)){
            isVamoosed = true;
        }
        if(isVamoosed){
            bullets.remove(b);
            isVamoosed = false;
        }
    } 
}

function bulletsVsAteroids(bullets, asteroids, time, particles){
    let a, b, aiter, biter, saiter, sa, spawnList, bp, ap, ar, d, s, z;
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
                z--;
                if(z !== -1){
                    if(spawnList === null){
                        spawnList = new List();
                    }
                    s = a.scale * 0.6;
                    spawnAsteroids(3, s, z, spawnList, ap.x, ap.y);
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
// Loops ship around screen.
//
function shipVsView(ship){
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

function cowboysVsAliens(){

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
    this.context.lineWidth = 1;
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
    renderer.context.clearRect(0, 0, 800, 600); // MAGIC NUMBERS!
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

function drawShip(ship, renderer){
    renderer.context.strokeStyle = config.playerColor;
    let transform = makeTranformMatrix(ship.position_V, ship.angle);
    drawPolygon(ship.body_L, transform, renderer);
    if(ship.isBoosting){
        drawPolygon(ship.tail_L, transform, renderer);
    }

    renderer.context.beginPath();
    renderer.context.arc(ship.position_V.x, ship.position_V.y, 100, 0, Math.PI * 2, false);
    renderer.context.stroke();
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
function drawBullets(bullets, renderer){
    let ctx, r, a, b, iter, p;
    ctx = renderer.context;
    ctx.fillStyle = config.playerColor;
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

function drawParticles(particles, renderer){
    let ctx, r, a, pa, iter, p;
    ctx = renderer.context;
    ctx.fillStyle = "#FFFFFF";
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
    renderer.context.strokeStyle = "#FFFFFF";
    let a = null;
    iter = asteroids.getIter();
    while((a = iter.next()) != null){
        //debugDrawAsteroid(a, renderer);
        drawAsteroid(a, renderer);
    }
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
    this.time = 0; // total time passed since game start. (unit: seconds).
    this.ship = new Ship(400, 300);
    this.bullets = new List();
    this.asteroids = new List();
    this.particles = new List();
}

let g_game = null;

function initGame(){
    g_renderer = new Renderer("canvas-div", 800, 600);
    g_game = new Game();
    
    spawnAsteroids(5, 10.0, 2, g_game.asteroids);

    attachInputHandlers();
}

function begin(){
    if(isKeyDown(KEYS.LEFT)){
        g_game.ship.rotationState = -1;
    }
    else if(isKeyDown(KEYS.RIGHT)){
        g_game.ship.rotationState = 1;
    }
    else{
        g_game.ship.rotationState = 0;
    }
    if(isKeyDown(KEYS.UP)){
        g_game.ship.isBoosting = true;
    }
    else {
        g_game.ship.isBoosting = false;
    }
    if(isKeyDown(KEYS.SPACE)){
        shipShoot(g_game.ship, g_game.bullets, g_game.time);
    }
    if(isKeyDown(KEYS.DOWN)){
        shipPulse(g_game.ship, g_game.asteroids, g_game.time);
    }
}

function update(dt_ms){
    let dt_s = dt_ms * 0.001;
    g_game.time += dt_s;

    integrateShipPos(g_game.ship, dt_s);
    integrateBulletsPos(g_game.bullets, dt_s);
    integrateAsteroidsPos(g_game.asteroids, dt_s);
    integrateParticlesPos(g_game.particles, dt_s);

    asteroidsVsView(g_game.asteroids);
    shipVsView(g_game.ship);
    bulletsVsView(g_game.bullets);
    bulletsVsAteroids(g_game.bullets, g_game.asteroids, g_game.time, g_game.particles);
    particlesVsTime(g_game.particles, g_game.time);
}

function draw(){
    clearView(g_renderer);
    drawShip(g_game.ship, g_renderer);
    drawBullets(g_game.bullets, g_renderer);
    drawParticles(g_game.particles, g_renderer);

    //debugDrawAsteroid(g_game.asteroid, g_renderer);
    drawAsteroids(g_game.asteroids, g_renderer);
}

function end(){
}

function startGame(){
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