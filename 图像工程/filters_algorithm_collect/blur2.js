// http://blog.csdn.net/matrix_space/article/details/40897645 旋转模糊
let src = cv.imread('canvasInput');
    let dst = src.clone();

    let width=src.cols;
    let height=src.rows; 
  
    let R;  
    let angle;  
  
    let Center = {x:width/2 ,y:height/2};  
    let t1, t2, t3;  
    let new_x, new_y;  
  
    let Num=30;  
  
    for (let y=0; y<height; y++)  
    {  
        for (let x=0; x<width; x++)  
        {  
            t1=0; t2=0; t3=0;  
            R=Math.sqrt((y-Center.y)*(y-Center.y)+(x-Center.x)*(x-Center.x));  
            angle=Math.atan2((y-Center.y), (x-Center.x));  
            for (let mm=0; mm<Num; mm++)  
            {  
                angle=angle+0.01;
  
                new_x=R*Math.cos(angle)+Center.x;  
                new_y=R*Math.sin(angle)+Center.y;  
  
                if(new_x<0)       new_x=0;  
                if(new_x>width-1) new_x=width-1;  
                if(new_y<0)       new_y=0;  
                if(new_y>height-1)new_y=height-1;  
  
                t1=t1+src.ucharPtr(new_y, new_x)[0];  
                t2=t2+src.ucharPtr(new_y, new_x)[1];  
                t3=t3+src.ucharPtr(new_y, new_x)[2];  
  
            }  
  
            dst.ucharPtr(y, x)[0]=t1/Num;  
            dst.ucharPtr(y, x)[1]=t2/Num;  
            dst.ucharPtr(y, x)[2]=t3/Num;  
  
        }  
    }  
  
  
cv.imshow('canvasOutput', dst);
src.delete(); dst.delete(); 