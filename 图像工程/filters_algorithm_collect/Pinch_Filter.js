    // 参考http://blog.csdn.net/matrix_space/article/details/47059593
    let src = cv.imread('canvasInput');
    let dst = src.clone();

    let width=src.cols;
    let height=src.rows;

    let angle = Math.PI/2;
    let centreX = 0.5;
    let centreY = 0.5;
    let radius = 200;
    let amount=0.5;

    if (radius==0) radius=Math.min(width, height)/2;

    let icentreX=width*centreX;
    let icentreY=height*centreY;
    let radius2=radius*radius;

    let dx,dy,new_x,new_y;
    let p,q,x1,y1;
    let distance;
    let a,d,t,s,c,e;

    for (let y=0; y<height; y++)
    {
        for (let x=0; x<width; x++)
        {

             dx=x-icentreX;
             dy=y-icentreY;

             distance=dx*dx+dy*dy;

             if (distance>radius2 || distance==0)
             {
                 new_x=x;
                 new_y=y;
             }
             else
             {
                d = Math.sqrt( distance / radius2 );
                t = Math.pow(Math.sin( Math.PI*0.5 * d ),-amount);

                dx =dx* t;
                dy =dy* t;

                e = 1 - d;
                a = angle * e * e;

                s = Math.sin( a );
                c = Math.cos( a );

                new_x = icentreX + c*dx - s*dy;
                new_y = icentreY + s*dx + c*dy;
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