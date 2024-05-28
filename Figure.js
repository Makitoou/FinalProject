            var tmpFigures = [
            0,0,1,0,0,
            0,0,1,0,0,
            0,0,1,0,0,
            0,0,1,0,0,
            0,0,1,0,0,

            0,0,0,0,0,
            0,0,1,1,0,
            0,0,1,0,0,
            0,0,1,0,0,
            0,0,0,0,0,

            0,0,0,0,0,
            0,1,1,0,0,
            0,0,1,0,0,
            0,0,1,0,0,
            0,0,0,0,0,

            0,0,0,0,0,
            0,0,1,1,0,
            0,1,1,0,0,
            0,0,0,0,0,
            0,0,0,0,0,

            0,0,0,0,0,
            0,1,1,0,0,
            0,0,1,1,0,
            0,0,0,0,0,
            0,0,0,0,0,

            0,0,0,0,0,
            0,0,1,0,0,
            0,1,1,1,0,
            0,0,0,0,0,
            0,0,0,0,0
           ];
           class Figure{
            constructor(s, x, y){
                this.s = s;
                this.x = x;
                this.y = y;
                this.b = [];
                this.t = [];
                this.r = [];
                for(var i = 0;i < s*s; ++i){
                    this.b.push(0);
                    this.t.push(0);
                    this.r.push(0);
                }
            }
            moveDown(){
                this.y++;
            } 
            moveUp(){
                this.y--;
            }
            moveRight(){
                this.x++;
            }
            moveLeft(){
                this.x--;
            }
            dropNew(f){
                this.y = 0;
                this.x = Math.floor(f.w/2 - this.s/2);
                var f_size = this.s*this.s;
                var f_count = Math.floor(tmpFigures.length/f_size);
                var point = f_size*Math.floor(Math.random()*f_count);

                for(var i = 0;i < f_size;++i)
                    this.b[i] = tmpFigures[point+i];
            }
            draw(){
            for(var i = 0;i < this.s;++i)
                for(var j = 0; j<this.s;++j)
                    if(this.b[i*this.s+j] != 0)
                        drawBlock(i+this.y, j+this.x, "#FF0000");
           }
           rot(){
            for(var i = 0;i < this.s*this.s;++i)
                this.t[i] = this.b[i];
            for(var i = 0;i < this.s;++i)
                for(var j = 0;j < this.s;++j)
                    this.r[i*this.s+j] = this.b[j*this.s+this.s-1-i];
            for(var i=0;i < this.s*this.s;++i)
                this.b[i] = this.r[i];
           }
           rotBack(){
            for(var i = 0;i < this.s*this.s;++i)
                this.b[i] = this.t[i];
           }
        }