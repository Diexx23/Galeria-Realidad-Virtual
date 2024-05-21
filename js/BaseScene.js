export class BaseScene {
    constructor(containerId, width = 800, height = 600) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = 5;

        this.renderer.xr.enabled = true; // Activar modo XR

        // Botón VR
        const vrButton = document.getElementById('vrButton');
        vrButton.addEventListener('click', () => this.toggleVR());

        window.addEventListener('resize', () => this.onWindowResize());
    }

    toggleVR() {
        if ('xr' in navigator) {
            navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
                if (supported) {
                    if (this.renderer.xr.isPresenting) {
                        this.renderer.xr.getSession().then((session) => {
                            session.end();
                        });
                    } else {
                        this.renderer.xr.requestSession('immersive-vr').then((session) => {
                            this.renderer.xr.setReferenceSpaceType('local');
                            this.renderer.xr.setSession(session);
                            session.addEventListener('end', () => {
                                this.renderer.xr.setSession(null);
                            });
                        });
                    }
                } else {
                    console.error('WebXR Immersive VR is not supported');
                }
            });
        } else {
            console.error('WebXR is not supported in this browser');
        }
    }
    

    onWindowResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}
