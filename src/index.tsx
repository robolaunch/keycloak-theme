import { createRoot } from "react-dom/client";
import { StrictMode, lazy, Suspense } from "react";
import { kcContext as kcLoginThemeContext } from "./keycloak-theme/login/kcContext";
import { kcContext as kcAccountThemeContext } from "./keycloak-theme/account/kcContext";
import ParticleImage, {
  ParticleForce,
  ParticleOptions,
  Vector,
  forces,
} from "react-particle-image";
import "./style.css";
import "animate.css";
import rocket from "./robolaunch-rocket.png";

const KcLoginThemeApp = lazy(() => import("./keycloak-theme/login/KcApp"));
const KcAccountThemeApp = lazy(() => import("./keycloak-theme/account/KcApp"));
const App = lazy(() => import("./App"));

const particleOptions: ParticleOptions = {
  filter: ({ x, y, image }) => {
    // Get pixel
    const pixel = image.get(x, y);
    // Make a particle for this pixel if blue > 50 (range 0-255)
    return pixel.b > 50;
  },
  color: ({ x, y, image }) => "#61dafb",
  radius: () => Math.random() * 1.5 + 0.5,
  mass: () => 40,
  friction: () => 0.15,
  initialPosition: ({ canvasDimensions }) => {
    return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
  },
};
const motionForce = (x: number, y: number): ParticleForce => {
  return forces.disturbance(x, y, 5);
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense>
      <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="col-span-1 flex items-center justify-center bg-layer-light-50 animate__animated animate__fadeInLeft">
          {(() => {
            if (kcLoginThemeContext !== undefined) {
              return <KcLoginThemeApp kcContext={kcLoginThemeContext} />;
            }

            if (kcAccountThemeContext !== undefined) {
              return <KcAccountThemeApp kcContext={kcAccountThemeContext} />;
            }

            return <App />;
          })()}
        </div>
        <div
          style={{
            background: "linear-gradient(rgb(71, 16, 106), rgb(21, 83, 114))",
          }}
          className="hidden md:flex flex-col col-span-1 gap-4 justify-center items-center text-white animate__animated animate__fadeInRight"
        >
          <ParticleImage
            className="h-64 animate__animated animate__fadeInDown"
            src={rocket}
            scale={0.75}
            entropy={20}
            maxParticles={2000}
            particleOptions={particleOptions}
            mouseMoveForce={motionForce}
            touchMoveForce={motionForce}
            backgroundColor="transparent"
            alt="Robolaunch"
          />
          <h1 className="text-2xl text-center font-semibold animate__animated animate__fadeInUp">
            Develop, Deploy and Manage at Scale!
          </h1>
          <p className="text-sm text-center font-light px-20 animate__animated animate__fadeInUp">
            robolaunch is a Cloud-Native Robotics Platform that provides the
            end-to-end infrastructure, software stack and tools for developing,
            simulating, deploying and operating ROS/ROS2 robots at scale.
          </p>
        </div>
      </div>
    </Suspense>
  </StrictMode>
);
