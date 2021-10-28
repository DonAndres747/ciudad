
function main() {
    const scene= new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    var controls;
    var stats;
    


    controls = new THREE.OrbitControls(camera, renderer.domElement);
    renderer.setSize( window.innerWidth, window.innerHeight );
    scene.fog= new THREE.Fog(0xffffff, 0.15, 100)

    document.body.appendChild( renderer.domElement );
    camera.position.z = 62;
    camera.rotation.x=-0.5;
    camera.position.y=20;
     
    ///////////plano/////////////

    const plano = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 1, 1),   new THREE.MeshBasicMaterial({color:0x515151}))
    plano.rotation.x = -0.5 * Math.PI;
    

    ///////////edificios///////////

    function generarLetra() {
        var letras = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var numero = (Math.random() * 15).toFixed(0);
        return letras[numero];
    }

    function colorHEX() {
        var coolor = "";
        for (var i = 0; i < 6; i++) {
            coolor = coolor + generarLetra();
        }
        return "#" + coolor;
    }
    
    var _controls = new (function () {
        this.addBuilding = function () {
        var s = 20 + Math.random()*20;

        const cube= new THREE.Mesh(new THREE.BoxGeometry(5, s,5), new THREE.MeshBasicMaterial({color:colorHEX()}));

        
        
        cube.position.x = Math.random() * (40 + 40) -40; 
        cube.position.z = Math.random() * (40 + 40) -40;
        cube.position.y = s/2;

        scene.add(cube);

        };
    });

    //////////controles///////////

    function createDataGui() {
        var gui = new dat.GUI();
        gui.add(_controls, 'addBuilding');
    }
    createDataGui();

    //////////////////////////////

    function createStats() {
      stats = new Stats();
      stats.setMode(2); // 0: fps, 1: ms, 2memory
      stats.domElement.style.position = "absolute";
      stats.domElement.style.left = "100px";
      stats.domElement.style.top = "10px";
      document.getElementById("myStats").appendChild(stats.domElement);
      return stats;
    } 
    createStats();
    
    function animate() {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
      stats.update();
      
    }

    scene.add(plano);
  
  animate();
    
}

main();
