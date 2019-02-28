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
    myMaterial.diffuseColor = new BABYLON.Color3(0.57, 0.43, 0.85);
    /*myMaterial.diffuseTexture = new BABYLON.Texture("assets/image/cloud.png", scene);
    myMaterial.diffuseTexture.uScale = 1.0;
    myMaterial.diffuseTexture.vScale = 1.0;*/

    var materialGround = new BABYLON.StandardMaterial("groundTexture", scene);
    materialGround.diffuseTexture = new BABYLON.Texture("assets/images/grass.jpg", scene);
    materialGround.diffuseTexture.uScale = 4.0;
    materialGround.diffuseTexture.vScale = 4.0;

    var myMultiMaterial = new BABYLON.StandardMaterial("myMultiMaterial", scene);
    myMultiMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0.5);
    myMultiMaterial.specularColor = new BABYLON.Color3(0.1, 0.6, 0.87);
    myMultiMaterial.emissiveColor = new BABYLON.Color3(1, 0,0);
    myMultiMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
    myMultiMaterial.alpha = 1.0;
    //myMultiMaterial.diffuseTexture = new BABYLON.Texture("assets/image/cuir.jpg", scene);
    //myMultiMaterial.specularTexture = new BABYLON.Texture("assets/image/rugueux.jpg", scene);
    //myMultiMaterial.emissiveTexture = new BABYLON.Texture("assets/image/nuage.jpg", scene);*/
    



    //MESHS ET COLLISIONS

    /*TODO :    -box
                -sphere
                -cylindre
                -tore
                -appliquer les collisions
    */
    
    var box = BABYLON.Mesh.CreateBox("box1", 1, scene);// box
    box.position.y = 2;
    box.material = myMaterial;
    this.game.scene.box = box;

    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 32, 1, scene);//sphere
    sphere.position.y = 1;
    sphere.position.z = 1;
    this.game.scene.sphere = sphere;

    var cone = BABYLON.MeshBuilder.CreateCylinder("cone", { diameterTop: 0, tessellation: 4 }, scene);
    cone.position.y = 2;
    cone.position.x = -2;
    cone.position.z = -2;

    var torus = BABYLON.MeshBuilder.CreateTorus("torus", { thickness: 0.2 }, scene);
    torus.position.x = 1;
    torus.position.y = 2;
    torus.position.z = 2;
    torus.material = myMultiMaterial;

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

    //PLATEFORMES
    /*
    var plateforme1 = BABYLON.Mesh.CreateBox("plateforme", 2, scene);
    plateforme1.scaling.y = 0.2
    // plateforme1.material = scene.materialPlatform1;
    plateforme1.position.y = 10;
    plateforme1.position.x = 10;
    plateforme1.checkCollisions = true;*/

    var animationBox = new BABYLON.Animation("AnimBox", "scaling.x", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var boxKeys = [];
    boxKeys.push({
        frame: 0,
        value: 1
    });
    boxKeys.push({
        frame: 50,
        value: 0.2
    });
    boxKeys.push({
        frame: 100,
        value: 1
    });
    animationBox.setKeys(boxKeys);
    box.animations = [];
    box.animations.push(animationBox);
    scene.beginAnimation(box, 0, 1000, true);

    //rotation
    var animationBall = new BABYLON.Animation("AnimBall", "rotation.x", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var ballKeys = [];

    ballKeys.push({
        frame: 0,
        value: 0
    });

    ballKeys.push({
        frame: 30,
        value: Math.PI
    });

    ballKeys.push({
        frame: 60,
        value: 2 * Math.PI
    });

    animationBall.setKeys(ballKeys);
    sphere.animations = [];
    sphere.animations.push(animationBall);
    scene.beginAnimation(sphere, 0, 1000, true);

    //translation
    var ballSlide = new BABYLON.Animation("xSlide", "position.z", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var keySlide = [];

    keySlide.push({
        frame: 0,
        value: 5
    });

    keySlide.push({
        frame: 50,
        value: -5
    });

    keySlide.push({
        frame: 100,
        value: 5
    });
    ballSlide.setKeys(keySlide);
    sphere.animations.push(ballSlide);
    scene.beginAnimation(sphere, 0, 1000, true);
};

Arena.prototype={


    //ANIMATION
    _animateWorld : function(ratioFps)
    {
      // Animation des plateformes (translation, rotation, redimensionnement ...)
      /*TODO*/
        // cf animations dans la fonction ci-dessus
       
    },
}

