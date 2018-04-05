    // 参考http://blog.csdn.net/matrix_space/article/details/42394249
    let src = cv.imread('canvasInput');
    let dst = src.clone();

    let width=src.cols;
    let height=src.rows;


    let e;  
    let a,b, a0, b0, a1,b1;  
    let alpha=1.0;  
    let K=Math.PI/2;  
  
    a=width/2; b=height/2;  
    e=width/height;  
  
    let Center = {x:width/2 ,y:height/2};
  
    let new_x, new_y;  
    let p,q,x1,y1,x0,y0;  
    let theta;  

    for (let y=0; y<height; y++)
    {
        for (let x=0; x<width; x++)
        {

            y0=Center.y-y;  
            x0=x-Center.x;  
  
  
            theta=Math.atan(y0*e/(x0+0.0001));  
            if(x0<0)   theta=theta+Math.PI;  
  
            a0=x0/Math.cos(theta);  
            b0=y0/Math.sin(theta+0.0001);  
  
            if(a0/a>1 || b0/b>1)  continue;  
  
            a1=Math.asin(a0/a)*a/K;  
            b1=Math.asin(b0/b)*b/K;  
  
            a1=(a0-a1)*(1-alpha)+a1;  
            b1=(b0-b1)*(1-alpha)+b1;  
  
            new_x=a1*Math.cos(theta);  
            new_y=b1*Math.sin(theta);  
  
            new_x=Center.x+new_x;  
            new_y=Center.y-new_y;  

            if(new_x<0)         new_x=0;
            if(new_x>=width-1)  new_x=width-2;
            if(new_y<0)         new_y=0;
            if(new_y>=height-1) new_y=height-2;

            x1= parseInt(new_x);
            y1= parseInt(new_y);

            p=new_x - x1;
            q=new_y - y1;
 
            for (let k=0; k<3; k++)
            {
                dst.ucharPtr(y, x)[k]=(1-p)*(1-q)*src.ucharPtr(y1, x1)[k]+
                                        (p)*(1-q)*src.ucharPtr(y1,x1+1)[k]+
                                        (1-p)*(q)*src.ucharPtr(y1+1,x1)[k]+
                                        (p)*(q)*src.ucharPtr(y1+1,x1+1)[k];
            }

        }
    }
cv.imshow('canvasOutput', dst);
src.delete(); dst.delete(); 