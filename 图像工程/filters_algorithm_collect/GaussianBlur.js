// http://blog.csdn.net/matrix_space/article/details/40898103
    let src = cv.imread('canvasInput');
    let dst = src.clone();

    let temp=dst.rowRange(100, 300);  
  
    cv.GaussianBlur(temp, temp, new cv.Size(21,21), 0, 0);  
    cv.GaussianBlur(temp, temp, new cv.Size(21,21), 0, 0);  
  
  
cv.imshow('canvasOutput', dst);
src.delete(); dst.delete(); 