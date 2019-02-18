Arena = function(game) //on créée notre objet Arena qui prend l'objet game en argument
{
    // VARIABLES UTILES
    this.game = game;
    var scene = game.scene;


    //EXEMPLE
    
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    /*
    var cube = BABYLON.Mesh.CreateBox("cube", 20, scene, false);
    

    cube.position.y = 1;
    
    this.game.scene.cube = cube;// va nous permettre d'accéder à notre mesh pour réaliser des animations au sein du prototype 
    //(à faire à chaque fois que vous comptez animer un mesh)
   
    
    var boxArena = BABYLON.Mesh.CreateBox("box1", 100, scene, false, BABYLON.Mesh.BACKSIDE);
    
    boxArena.scaling.y = 2;

    var materialGround = new BABYLON.StandardMaterial("groundTexture", scene);

    boxArena.material = materialGround;
    */
    //LIRE LA DOC

    // LUMIERES 

    /*TODO :  -3 lumières différentes
              -couleurs et intensités
    */
    var pointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 400, 0), scene);
    var directionnalLight = new BABYLON.DirectionalLight("directionnalLight", new BABYLON.Vector3(000, 100, 100), scene);
    var spotLight = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, -1, 0), Math.PI / 3, 2, scene);


    pointLight.diffuse = new BABYLON.Color3(1, 0, 0);
    pointLight.specular = new BABYLON.Color3(1, 0, 0);
    directionnalLight.diffuse = new BABYLON.Color3(0.57, 0.43, 0.85);
    directionnalLight.specular = new BABYLON.Color3(0.57, 0.43, 0.85);
    spotLight.diffuse = new BABYLON.Color3(0, 0, 0.54);
    spotLight.specular = new BABYLON.Color3(0, 0, 0.54);

    pointLight.intensity = 0.2;
    directionnalLight.intensity = 0.2;
    spotLight.intensity = 1;

    // MATERIAUX ET TEXTURES

    /*TODO :    -materiau standard
                -multi-materiaux
                -video-texture
                -normal map
                -texture procedurale (feu, nuage...)
    */
    var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
    myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
    myMaterial.diffuseTexture = new BABYLON.Texture("assets/image/rugueux.jpg", scene);

    var materialGround = new BABYLON.StandardMaterial("groundTexture", scene);
    materialGround.diffuseTexture = new BABYLON.Texture("assets/images/grass.jpg", scene);
    materialGround.diffuseTexture.uScale = 4.0;
    materialGround.diffuseTexture.vScale = 4.0;

    var myMultiMaterial = new BABYLON.StandardMaterial("myMultiMaterial", scene);
    myMultiMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
    myMultiMaterial.alpha = 0.5;
    myMultiMaterial.diffuseTexture = new BABYLON.Texture("assets/image/rugueux.jpg", scene);
    myMultiMaterial.specularTexture = new BABYLON.Texture("assets/image/cuir.jpg", scene);
    myMultiMaterial.emissiveTexture = new BABYLON.Texture("assets/image/nuage.jpg", scene);
    



    //MESHS ET COLLISIONS

    /*TODO :    -box
                -sphere
                -cylindre
                -tore
                -appliquer les collisions
    */
    
    var box = BABYLON.Mesh.CreateBox("box1", 1, scene);// box
    box.position.y = 2;

    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 32, 1, scene);//sphere
    sphere.position.y = 1;
    sphere.position.z = 1;
    sphere.material = myMaterial;

    var cone = BABYLON.MeshBuilder.CreateCylinder("cone", { diameterTop: 0, tessellation: 4 }, scene);

    var torus = BABYLON.MeshBuilder.CreateTorus("torus", { thickness: 0.2 }, scene);

    var ground = BABYLON.Mesh.CreateGround("ground1", 20, 20, 2, scene);
    //ground.scaling = new BABYLON.Vector3(2, 10, 3);
    ground.material = materialGround;


    //AUDIO

    /*TODO : -sons d'ambiance
              -sons liés à des objets --> le son doit être localisé spatialement
    */
    var volume = 0.1;
    var volume2 = 0.1;
    var music = new BABYLON.Sound("Rain", "assets/sounds/music.mp3", scene, null, { loop: true, autoplay: true , volume });
    var boxSound = new BABYLON.Sound("boxSound", "assets/sounds/rain.mp3", scene, null, { loop: true, autoplay: true, volume2 });
    boxSound.attachToMesh(box);

    //SKYBOX

    /*TODO : -Créer une (grande) box
             -Un materiau avec une CubeTexture, attention à bien faire correspodre les faces.
    */
    
    var skyBox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);// box

    var skyBoxMaterial = new BABYLON.StandardMaterial("skyBoxMaterial", scene);
    skyBoxMaterial.backFaceCulling = false;
    skyBoxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox/CloudyLightRays", scene);
    skyBoxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyBoxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyBoxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    skyBox.material = skyBoxMaterial; 

};

Arena.prototype={

    //ANIMATION
    _animateWorld : function(ratioFps)
    {
      // Animation des plateformes (translation, rotation, redimensionnement ...)
      /*TODO*/
    },
}