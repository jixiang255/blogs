// 参考http://blog.csdn.net/matrix_space/article/details/47059451 水波效果
    // 参考http://blog.csdn.net/matrix_space/article/details/47059543 旋转效果
    let src = cv.imread('canvasInput');
    let dst = src.clone();

    let width=src.cols;
    let height=src.rows;

    let wavelength = 20;
    let amplitude = 30;
    let phase = Math.PI/4;
    let centreX = 0.25;
    let centreY = 0.5;
    let radius = 0;

    if (radius==0) radius=Math.min(width, height)/2;

    let icentreX=width*centreX;
    let icentreY=height*centreY;
    let radius2=radius*radius;

    let dx,dy,new_x,new_y;
    let p,q,x1,y1,x0,y0;
    let distance,distance2;
    let amount;

    for (let y=0; y<height; y++)
    {
        for (let x=0; x<width; x++)
        {

             dx=x-icentreX;
             dy=y-icentreY;

             distance2=dx*dx+dy*dy;

             if (distance2>radius2)
             {
                 new_x=x;
                 new_y=y;
             }
             else
             {
                distance = Math.sqrt( distance2 );
                amount=amplitude * Math.sin(distance / wavelength * 2*Math.PI - phase);
                amount =amount* (radius-distance)/radius;
                amount=amount*wavelength/(distance+0.0001);

                new_x =x + dx*amount;
                new_y =y + dy*amount;
             }

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