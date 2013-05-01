(function() {
  function Cropper() {
    this.init = init;

    var placeholder = document.getElementById('placeholder'),
        toolbar = document.getElementById('toolbar'),
        body = document.getElementsByTagName('body')[0],
        viewfinder = {
          width: window.innerWidth,
          height: window.innerHeight
        }
        img = new Image(),
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        handle = {
          size: 60,
          drag: [false,false,false,false],
          touch: [0,0,0,0],
          all: false
        }

    function init() {
      eventBindings();
    }

    function eventBindings() {
      body.addEventListener('drop', drop, false);
      body.addEventListener('dragover', hover, false);
      body.addEventListener('dragleave', hover, false);

      window.onresize = function(event) {
        viewfinder.width = window.innerWidth;
        viewfinder.height = window.innerHeight;

        console.log(viewfinder);
      }
    }

    function hover(event) {
      event.stopPropagation();
      event.preventDefault();
      placeholder.className = (event.type == "dragover" ? "hover" : "");
    }

    function drop(event) {
      hover(event);

      var files = event.target.files || event.dataTransfer.files,
          file = files[0],
          reader = new FileReader();

      reader.onload = createCanvas;
      reader.readAsDataURL(file);
    }

    function createCanvas(event) {
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.width = img.width;
        ctx.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);

        canvas.setAttribute('style', 'margin: -'+canvas.height/2+'px 0 0 -'+canvas.width/2+'px;');

        body.appendChild(canvas);
        canvas.className = 'visible';
        placeholder.className = 'hidden';
        toolbar.className = 'visible';
      }
      img.src = event.target.result;
    }
  }
  
  var cropper = new Cropper();

  if(window.File && window.FileList && window.FileReader) {
    cropper.init();
  }
})();