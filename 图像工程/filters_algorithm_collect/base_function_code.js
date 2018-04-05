let src = cv.imread("canvasInput");
console.log('image width: ' + src.cols + '\n' +
            'image height: ' + src.rows + '\n' +
            'image size: ' + src.size().width + '*' + src.size().height + '\n' +
            'image depth: ' + src.depth() + '\n' +
            'image channels ' + src.channels() + '\n' +
            'image type: ' + src.type() + '\n');

// 1. default constructor
let mat = new cv.Mat();
// 2. two-dimensional arrays by size and type
let mat = new cv.Mat(size, type);
// 3. two-dimensional arrays by rows, cols, and type
let mat = new cv.Mat(rows, cols, type);
// 4. two-dimensional arrays by rows, cols, and type with initialization value
let mat = new cv.Mat(rows, cols, type, new cv.Scalar());


// 1. Create a Mat which is full of zeros
let mat = cv.Mat.zeros(rows, cols, type);
// 2. Create a Mat which is full of ones
let mat = cv.Mat.ones(rows, cols, type);
// 3. Create a Mat which is an identity matrix
let mat = cv.Mat.eye(rows, cols, type);

// 1. Use JS array to construct a mat.
// For example: let mat = cv.matFromArray(2, 2, cv.CV_8UC1, [1, 2, 3, 4]);
let mat = cv.matFromArray(rows, cols, type, array);
// 2. Use imgData to construct a mat
let ctx = canvas.getContext("2d");
let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
let mat = cv.matFromImageData(imgData);

// 1. Clone
let dst = src.clone();
// 2. CopyTo(only entries indicated in the mask are copied)
src.copyTo(dst, mask);

// Accessing and Modifying pixel values
data	uchar	Uint8Array	CV_8U
data8S	char	Int8Array	CV_8S
data16U	ushort	Uint16Array	CV_16U
data16S	short	Int16Array	CV_16S
data32S	int	Int32Array	CV_32S
data32F	float	Float32Array	CV_32F
data64F	double	Float64Array	CV_64F

let row = 3, col = 4;
let src = cv.imread("canvasInput");
if (src.isContinuous()) {
    let R = src.data[row * src.cols * src.channels() + col * src.channels()];
    let G = src.data[row * src.cols * src.channels() + col * src.channels() + 1];
    let B = src.data[row * src.cols * src.channels() + col * src.channels() + 2];
    let A = src.data[row * src.cols * src.channels() + col * src.channels() + 3];
}

CV_8U	ucharAt
CV_8S	charAt
CV_16U	ushortAt
CV_16S	shortAt
CV_32S	intAt
CV_32F	floatAt
CV_64F	doubleAt

let row = 3, col = 4;
let src = cv.imread("canvasInput");
let R = src.ucharAt(row, col * src.channels());
let G = src.ucharAt(row, col * src.channels() + 1);
let B = src.ucharAt(row, col * src.channels() + 2);
let A = src.ucharAt(row, col * src.channels() + 3);

CV_8U	ucharPtr	Uint8Array
CV_8S	charPtr	Int8Array
CV_16U	ushortPtr	Uint16Array
CV_16S	shortPtr	Int16Array
CV_32S	intPtr	Int32Array
CV_32F	floatPtr	Float32Array
CV_64F	doublePtr	Float64Array

let row = 3, col = 4;
let src = cv.imread("canvasInput");
let pixel = src.ucharPtr(row, col);
let R = pixel[0];
let G = pixel[1];
let B = pixel[2];
let A = pixel[3];

// **roi**
let src = cv.imread('canvasInput');
let dst = new cv.Mat();
// You can try more different parameters
let rect = new cv.Rect(100, 100, 200, 200);
dst = src.roi(rect);

// Image Addition
let src1 = cv.imread("canvasInput1");
let src2 = cv.imread("canvasInput2");
let dst = new cv.Mat();
let mask = new cv.Mat();
let dtype = -1;
cv.add(src1, src2, dst, mask, dtype);

// Image Subtraction
let src1 = cv.imread("canvasInput1");
let src2 = cv.imread("canvasInput2");
let dst = new cv.Mat();
let mask = new cv.Mat();
let dtype = -1;
cv.subtract(src1, src2, dst, mask, dtype);

// Bitwise Operations
let src = cv.imread('imageCanvasInput');
let logo = cv.imread('logoCanvasInput');
let dst = new cv.Mat();
let roi = new cv.Mat();
let mask = new cv.Mat();
let maskInv = new cv.Mat();
let imgBg = new cv.Mat();
let imgFg = new cv.Mat();
let sum = new cv.Mat();
let rect = new cv.Rect(0, 0, logo.cols, logo.rows);

// I want to put logo on top-left corner, So I create a ROI
roi = src.roi(rect);

// Create a mask of logo and create its inverse mask also
cv.cvtColor(logo, mask, cv.COLOR_RGBA2GRAY, 0);
cv.threshold(mask, mask, 100, 255, cv.THRESH_BINARY);
cv.bitwise_not(mask, maskInv);

// Black-out the area of logo in ROI
cv.bitwise_and(roi, roi, imgBg, maskInv);

// Take only region of logo from logo image
cv.bitwise_and(logo, logo, imgFg, mask);

// Put logo in ROI and modify the main image
cv.add(imgBg, imgFg, sum);

dst = src.clone();
for (let i = 0; i < logo.rows; i++) {
    for (let j = 0; j < logo.cols; j++) {
        dst.ucharPtr(i, j)[0] = sum.ucharPtr(i, j)[0];
    }
}

// Point
// The first way
let point = new cv.Point(x, y);
// The second way
let point = {x: x, y: y};

// Scalar
// The first way
let scalar = new cv.Scalar(R, G, B, Alpha);
// The second way
let scalar = [R, G, B, Alpha];

// size
// The first way
let size = new cv.Size(width, height);
// The second way
let size = {width : width, height : height};

// Circle
// The first way
let circle = new cv.Circle(center, radius);
// The second way
let circle = {center : center, radius : radius};

// Rect
// The first way
let rect = new cv.Rect(x, y, width, height);
// The second way
let rect = {x : x, y : y, width : width, height : height};

// RotatedRect
// The first way
let rotatedRect = new cv.RotatedRect(center, size, angle);
// The second way
let rotatedRect = {center : center, size : size, angle : angle};

// get the vertices from rotatedRect:
let vertices = cv.RotatedRect.points(rotatedRect);
let point1 = vertices[0];
let point2 = vertices[1];
let point3 = vertices[2];
let point4 = vertices[3];

 // get the bounding rectangle from rotatedRect:
 let boundingRect = cv.RotatedRect.boundingRect(rotatedRect);