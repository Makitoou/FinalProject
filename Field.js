class Field{
    constructor(w, h){
     this.w = w;
     this.h = h;
     this.b = [];
     for(var i = 0;i < w*h; ++i){
         this.b.push(0);
     }

    }

    collision(f){
     for(var i = 0;i < f.s; ++i)
         for(var j = 0;j < f.s; ++j){
             var fx = f.x + j;
             var fy = f.y + i;
             if(f.b[i*f.s+j] != 0){
                 if(fx < 0 || fx >= this.w || fy < 0 || fy >= this.h)
                     return 1;
                 if(this.b[fy*this.w+fx] != 0)
                     return 1;
             };
         };
     return 0;
    }
    plantFigure(f){
     for(var i = 0;i < f.s; ++i)
         for(var j = 0;j < f.s; ++j)
             if(f.b[i*f.s+j] != 0){
                 var fx = f.x + j;
                 var fy = f.y + i;
                 this.b[fy*this.w+fx] = f.b[i*f.s+j];
             };
    }
    lineIsFilled(num){
     for(var i = 0;i < this.w; ++i)
         if(this.b[num*this.w+i] == 0)
             return 0;
     return 1;
    }
    shiftLines(num){
     for(var i = num; i > 0;--i)
         for(var j=0; j<this.w;++j)
             this.b[i*this.w+j] = this.b[(i-1)*this.w+j];
    }
    eraseLines(){
     var count = 0;
     for(var i = this.h-1;i > 0;--i){
         while(this.lineIsFilled(i)){
             this.shiftLines(i);
             count++;
         };
     };
    }
    draw(){
     for(var i = 0;i < this.h;++i){
         for(var j = 0; j<this.w;++j){
             if(this.b[i*this.w+j] == 0){
                 drawBlock(i, j, "#000000");/*!!!*/
             }
             else{
                 drawBlock(i, j, "#FF0000");
             }
         }
     }
    }
 }