spinwheelModule.directive('spinny', ['$document', function($document) {
   return {
       templateUrl: 'app/spinny.html',
       
       link: function(scope, element, attr) {
           var canvas = $('canvas', element)[0];
           var ctx = canvas.getContext('2d');
           ctx.save();
           
           var angle = 0;
           var anglePrevious = 0;
           var angleVelocity = 0;
           var frameMs = 20;
           
           var drawFrame = function() {
               ctx.restore();
               ctx.clearRect(0, 0, canvas.width, canvas.height);
               ctx.save();
               
               ctx.translate(canvas.width / 2, canvas.height / 2);
               ctx.rotate(angle);
               ctx.fillRect(-50, -50, 100, 100);
           }
           
           var leftButtonDown = false;
           
           var interval = setInterval(function() {
               angleVelocity *= .995;
               if (angleVelocity < .005) {
                   angleVelocity = 0;
               }
               angle += angleVelocity;

               drawFrame();
           }, frameMs);
           
           $document.mouseup(function(e) {
                // Left mouse button was released, clear flag
                if (e.which === 1) { 
                    leftButtonDown = false;
                }
                
                if (Math.abs(angleVelocity) > .05) {
                    angleVelocity = .6 * angleVelocity / Math.abs(angleVelocity);
                }
            })
           
           $(canvas).mousedown(function(e) {
                // Left mouse button was pressed, set flag
                if (e.which === 1) {
                    leftButtonDown = true;
                    angleVelocity = 0;
                }
            })
            .on('mousemove', function(event) {
                if (!leftButtonDown) {
                    return;
                }
                
                anglePrevious = angle;
                
                var x = event.pageX - canvas.offsetLeft;
                var y = event.pageY - canvas.offsetTop;
    
                var dx = x - (canvas.width / 2); 
                var dy = y - (canvas.height / 2); 
    
                if (dx == 0) {
                   angle = (Math.PI / 2 ) * (dy < 0 ? -1 : 1);
                } else {
                   angle = Math.atan(dy / dx);
                }
                
                angleVelocity = angle - anglePrevious;
           });
       }
   } 
}]);
