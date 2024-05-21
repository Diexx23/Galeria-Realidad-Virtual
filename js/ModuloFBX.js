import { BaseScene } from './BaseScene.js';
import { FBXLoader } from './FBXLoader.js';
import { OrbitControls } from './OrbitControls.js';
import * as THREE from 'three';
import { VRButton } from './VRButton.js';

export class ModuloFBX extends BaseScene {
    constructor(containerId) {
        super(containerId);

        // Agregar la skybox
        const skyboxTexture = new THREE.CubeTextureLoader().setPath('TexturaFondo/');
        this.scene.background = skyboxTexture.load([
            'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'
        ]);

        // Inicializar OrbitControls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // Configurar el raycaster y el objeto de intersección
        this.raycaster = new THREE.Raycaster();
        this.intersectedObject = null;

        // Cargar el modelo FBX
        const loader = new FBXLoader();
        loader.load('Modelo/TorreInf.fbx', (fbx) => {
            fbx.scale.set(0.4, 0.4, 0.4);
            fbx.position.set(0, -4, 0);

            // Agregar una luz ambiental a la escena
            const ambientLight = new THREE.AmbientLight(0xffffff, 6); // color, intensidad
            this.scene.add(ambientLight);

            // Agregar el modelo FBX a la escena y configurar el objeto de intersección
            this.scene.add(fbx);
            this.intersectedObject = fbx;
        });

        // Configurar VR
        this.renderer.xr.enabled = true;
        document.body.appendChild(VRButton.createButton(this.renderer));
    }

    checkIntersection() {
        // Actualizar el raycaster para que apunte desde la cámara hacia adelante
        this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);

        // Verificar intersecciones con el objeto deseado
        if (this.intersectedObject) {
            const intersects = this.raycaster.intersectObject(this.intersectedObject, true);

            if (intersects.length > 0) {
                // Mostrar un mensaje en la consola cuando haya una intersección
                console.log('¡Intersección detectada con el objeto!');
            }
        }
    }

    animate() {
        this.renderer.setAnimationLoop(() => {
            // Verificar intersecciones en cada cuadro de animación
            this.checkIntersection();

            // Actualizar OrbitControls en cada cuadro de animación
            if (this.controls) {
                this.controls.update();
            }

            this.renderer.render(this.scene, this.camera);
        });
    }
}
