// http://blog.csdn.net/matrix_space/article/details/47059861 (万花筒效果)
    let src = cv.imread('canvasInput');
    let dst = src.clone();

    let width=src.cols;
    let height=src.rows;

    let angle = Math.PI/4;
    let angle2 = Math.PI/4;
    let centreX = 0.5;
    let centreY = 0.5;
    let sides = 10;

    let icentreX=width*centreX;
    let icentreY=height*centreY;
    let radius = 150;

    let dx,dy,new_x,new_y;
    let p,q,x1,y1;
    let distance;
    let c, r, theta, temp_theta, radius_c;

    function Triangle(x) {
    	function fmod(a,b) {
    		return Number((a - (Math.floor(a / b) * b)).toPrecision(8));
    	}
    	let temp_r=fmod(x, 1.0);

	    if (temp_r<0.5)
	    {
	       return 2*temp_r;
	    }
	    else
	    {
	       return 2*(1-temp_r);
	    }
    }

    for (let y=0; y<height; y++)
    {
        for (let x=0; x<width; x++)
        {

             dx=x-icentreX;
             dy=y-icentreY;

             theta=Math.atan2(dy, dx)-angle-angle2;
             r=Math.sqrt(dy*dy+dx*dx);

             temp_theta=theta/Math.PI*sides*0.5;
             theta=Triangle(temp_theta);

             if (radius)
             {
                c=Math.cos(theta);
                radius_c=radius/c;
                r=radius_c * Triangle(r/radius_c);
             }


            theta=theta+angle;

            new_x=r * Math.cos(theta)+icentreX;
            new_y=r * Math.sin(theta)+icentreY;

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
