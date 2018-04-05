// 参考http://blog.csdn.net/matrix_space/article/details/42395527 旋转效果
    let src = cv.imread('canvasInput');
    let dst = src.clone();

    let width=src.cols;
    let height=src.rows;
    let N = 70;  
  
    let Center = {x:width/2 ,y:height/2};
  
    let radius, Dis, new_x, new_y;  
    let p,q,x1,y1,x0,y0;  
    let theta;

    for (let y=0; y<height; y++)
    {
        for (let x=0; x<width; x++)
        {

            y0=Center.y-y;  
            x0=x-Center.x;  
  
            Dis=x0*x0+y0*y0;  

            theta=Math.atan(y0/(x0+0.00001));  
            if(x0<0) theta=theta+Math.PI;  

            radius=Math.sqrt(Dis);  
            theta=theta+radius/N;  
            new_x=radius*Math.cos(theta);  
            new_y=radius*Math.sin(theta);  
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