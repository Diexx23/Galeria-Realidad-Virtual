import { BaseScene } from './BaseScene.js';
import { OrbitControls } from './OrbitControls.js';

export class Modulo2 extends BaseScene {
    constructor(containerId) {
        super(containerId);
        
        const geometry = new THREE.CircleGeometry(1, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
        const ambientLight = new THREE.AmbientLight(0xffffff, 5); // color, intensidad
            this.scene.add(ambientLight);
        
        // Inicializar OrbitControls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    animate() {
        super.animate();
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
        
        // Actualizar OrbitControls en cada cuadro de animación
        this.controls.update();
    }
}
