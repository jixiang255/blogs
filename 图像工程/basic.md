基础知识

mat是一个类，由两个数据部分组成：矩阵头(矩阵尺寸、存储方法、存储地址)和一个指向存储所有像素值的矩阵的指针。

HSV、HLS分解色调、饱和度、亮度
YCrCb在jpeg使用
CIE L*a*b是一种在感知上均匀的颜色空间，它适合用来度量两个颜色之间的距离


scalar()表示具有4个元素的数组，在opencv中被大量用于传递像素值，如RGB颜色值。

cvtcolor()颜色空间转换函数，rgb -> hsv、hsi、灰度图像

图像叠加、混合
roi、addweighted

平滑处理(smoothing) 
模糊处理(bluring)
斑点噪声(speckle noise)
椒盐噪声(salt-and-pepper noise)
形态学(morphology)
膨胀(dilate)
腐蚀(erode)
开运算(opening operation)
闭运算(closing operation)
形态学梯度(morphology Gradient)
顶帽运算(top hat)
满水填充(floodfill)
高斯金字塔(gaussianpyramid)
拉普拉斯金字塔(laplacianpyramid)

滤波器
	方框滤波-boxblur函数
	均值滤波-blur函数
	高斯滤波-GaussianBlur函数
	中值滤波-medianBlur函数
	双边滤波-bilateralFilter函数

线性滤波器
	低通滤波器(模糊)
	高通滤波器(锐化)
	带通滤波器
	带阻滤波器
	全通滤波器
	陷波滤波器
非线性滤波器
	中值滤波
		用像素点邻域灰度值的中值来代替该像素点的灰度值。
	双边滤波
		结合图像的空间邻近度和像素值相似度的一种折中处理，同时考虑空域信息和灰度相似性。

膨胀
	求局部最大值的操作
腐蚀
	求局部最小值的操作
开运算
	先腐蚀后膨胀
闭运算
	先膨胀后腐蚀
形态学梯度
	膨胀图与腐蚀图之差
顶帽运算
	原图像与开运算图之差
黑帽
	闭运算的结果图与原图像之差
满水填充
	自动选中了和种子点相连的区域，接着将改区域替换成制定的颜色。
	它是查找和种子点连通的颜色相同的点
	魔术棒选择工具则是查找和种子点连通的颜色相近的点
高斯金字塔
	用来下降采样图像
拉普拉斯金字塔	
	用来从金字塔底层图像中向上采样，重建一个图像

对图像向上采样-pyrup函数
对图像向下采样-pyrdown函数

阈值化
	给定一个数组和一个阈值，然后根据数组中的每个元素的值时高于还是低于阈值而进行一些处理。
![](images/threshold1.png)
![](images/threshold2.png)
threshold函数
adaptivethreshold函数(自适应阈值函数)


![](images/blur.png)

均值滤波的缺陷
	不能很好地保护图像细节，在图像去噪的同时也破坏了图像的细节部分，从而使图像变得模糊，不能很好地去除噪声点。

高通滤波的具体操作时：用一个模板(卷积、掩模)扫描图像中的每一个像素，用模板确定的领域内像素的加权平均灰度值去替代模板中心像素点的值。它是一类根据高斯函数的形状来选择权值的线性平滑滤波器。

边缘检测一般步骤
	滤波：图像强度的一阶和二阶导数，但导数通常对噪声很敏感，因此必须采用滤波器来改善与噪声有关的边缘检测器的性能
	增强：确定图像各点邻域强度的变化值
	检测：经过增强的图像，往往邻域中有很多点的梯度值比较大

边缘检测的各种算子、滤波器
	canny算子
	sobel算子
	laplacian算子
	scharr滤波器

canny算子
	消除噪声
	计算梯度幅值和方向
	非极大值抑制
	滞后阈值

sobel算子
	主要用于边缘检测的离散微分算子，结合了高斯平滑和微分求导，用来计算图像灰度函数的近似梯度。在图像的任何一点使用此算子，都将会产生对应的梯度矢量或是其法矢量

laplacian算子
	laplacian算子是n维欧几里德空间中的一个二阶微分算子，定义为梯度grad的散度div。
	laplacian函数其实主要是利用sobel算子的运算。它通过加上sobel算子运算出的图像x方向和y方向上的倒数，来得到载入图像的拉普拉斯的变化结果。

scharr滤波器
	使用scharr滤波器运算符计算x或y方向的图像差分


苹果自带人脸变换功能，目前大致的思路是抽取人脸局部，再对人脸局部器官变换。

多边形变换
```
let src = cv.imread('canvasInput');
let dst = new cv.Mat();
let dsize = new cv.Size(src.rows, src.cols);
// (data32F[0], data32F[1]) is the first point
// (data32F[2], data32F[3]) is the sescond point
// (data32F[4], data32F[5]) is the third point
// (data32F[6], data32F[7]) is the fourth point
let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, 402, 0, 0, 402, 402, 402]);
let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, 300, 102, 0, 402, 300, 300]);
let M = cv.getPerspectiveTransform(srcTri, dstTri);
console.log(M)
// You can try more different parameters
cv.warpPerspective(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
cv.imshow('canvasOutput', dst);
src.delete(); dst.delete(); M.delete(); srcTri.delete(); dstTri.delete();
```

pinch 局部凸凹变换

http://sidekick.windforwings.com/2012/12/opencv-fun-with-remap.html
正方形变圆形


https://www.mathworks.com/help/images/examples/creating-a-gallery-of-transformed-images.html
https://www.mathworks.com/help/images/functionlist.html
各种matlab变换

特效http://blog.csdn.net/bravebean/article/details/51366903

疑问
opencv.js是否存在内存消耗过大问题？
