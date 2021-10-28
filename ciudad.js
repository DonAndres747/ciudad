
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
    camera.position.z = 20;
     
    ///////////plano/////////////

    const plano = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 1, 1),   new THREE.MeshBasicMaterial({color:0x515151}))
    plano.rotation.x = -0.5 * Math.PI;
    plano.position.y=-2;

    ///////////edificios///////////

    var _controls = new (function () {
        this.addBuilding = function () {
        var s = 10 + Math.random()*10;
        const cube= new THREE.Mesh(new THREE.BoxGeometry(5, s,5), new THREE.MeshBasicMaterial({color:"red"}));
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
