(function(window, document) {
  const container = document.getElementById('three-container');
  let width = container.offsetWidth;
  let height = container.offsetHeight;
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );


  let renderer = new THREE.WebGLRenderer( { antialias: true, wireframe: true, alpha: true } );
  renderer.setClearColor( 0xffffff, 1 );
  renderer.setSize( width, height );

  container.appendChild( renderer.domElement );

  // Resize
  window.addEventListener( 'resize', () => {
    renderer.setSize( container.offsetWidth, container.offsetHeight );
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
  } );

  controls = new THREE.OrbitControls( camera, renderer.domElement );

  camera.position.z = 11;

  let loader = new THREE.ObjectLoader();
  let watch, strap;

  loader.load
  (
    'model/apple-watch.json',
    ( object ) => {
        watch = object;
        strap = watch.getObjectByName('group').getObjectByName('group1').getObjectByName('Strap');
        object.position.z = 0;
        object.rotation.y += 90 * Math.PI / 180;
        scene.add( object );
      }
  );

  const strapColors = {
    black: 0x333333,
    navy: 0x19405E,
    yellow: 0xF9DA24,
    salmon: 0xFE4446,
    green: 0x84CF96,
    orange: 0xFF5A09
  }

  // const planeTextures = {
  //   about: new THREE.TextureLoader( ).load( 'img/landing@3x.png' ),
  //   home: new THREE.TextureLoader( ).load( 'img/home@3x.png' ),
  //   time: new THREE.TextureLoader( ).load( 'img/timeAndDate@3x.png' ),
  //   facts: new THREE.TextureLoader( ).load( 'img/facts@3x.png' ),
  //   family: new THREE.TextureLoader( ).load( 'img/family_1@3x.png' ),
  //   messages: new THREE.TextureLoader( ).load( 'img/messages@3x.png' ),
  //   bot: new THREE.TextureLoader( ).load( 'img/bot@3x.png' ),
  //   music: new THREE.TextureLoader( ).load( 'img/music@3x.png' ),
  //   location: new THREE.TextureLoader( ).load( 'img/location@3x.png' ),
  //   alerts: new THREE.TextureLoader( ).load( 'img/alerts@3x.png' )
  // }

  let video = document.createElement('video');
  video.setAttribute('src', 'video/care4WatchFinal.mp4');
  video.setAttribute('loop', true);
  video.play();
  let texture = new THREE.VideoTexture( video );
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;

  const planeGeom = new THREE.PlaneBufferGeometry( 3.5, 3.9, 32 );
  let planeMat = new THREE.MeshBasicMaterial( { map: texture, side: THREE.FrontSide } );
  let plane = new THREE.Mesh( planeGeom, planeMat );
  plane.position.z = 4.15;
  plane.position.y = 0.56;
  plane.rotation.x -= 8.9 * Math.PI / 180;
  scene.add( plane );

  // Draw scene
  let render = () => {
    renderer.render( scene, camera );
  };


  // Run loop (update, render, repeat)
  let loop = () => {

    requestAnimationFrame( loop );

    render();
  };
  loop();

  $(() => {
    $( 'button' ).on( 'click', ( e ) => {
      e.preventDefault();

      const button = $( e.target );
      // const name = button.data( 'name' );
      // planeMat.map = planeTextures[ name ];

      if( button.parent().hasClass( 'active' ) ) {
        button.parent().removeClass( 'active' );
      } else {
        $( 'li.active' ).removeClass( 'active' );
        button.parent().addClass( 'active' );
      }
    });

    $( '.color' ).on( 'click', ( e ) => {
      e.preventDefault();

      const color =  $( e.target ).data( 'color' );
      strap.material.color.setHex( strapColors[ color ] );
    });
  });
})(window, document);
