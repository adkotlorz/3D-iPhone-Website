import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";

import { Suspense } from "react";

import * as THREE from "three";

import Lights from "./Lights";
import Iphone from "./Iphone";
import Loader from "./Loader";

/**
 * A 3D model view component that renders a 3D scene with lighting, camera, and controls.
 *
 * @component
 * @example
 * return (
 *   <ModelView
 *     index={0}
 *     groupRef={groupRef}
 *     gsapType="exampleType"
 *     controlRef={controlRef}
 *     setRotationState={handleRotationState}
 *     size={10}
 *     item={itemData}
 *   />
 * );
 *
 * @param {Object} props - The properties for the component.
 * @param {number} props.index - The index for positioning and styling the view.
 * @param {React.RefObject<THREE.Group>} props.groupRef - A ref to the 3D group element.
 * @param {string} props.gsapType - A string to specify the GSAP animation type.
 * @param {React.RefObject<OrbitControls>} props.controlRef - A ref to the OrbitControls instance.
 * @param {Function} props.setRotationState - A function to set the rotation state of the model.
 * @param {number} props.size - The size parameter used for scaling the model.
 * @param {Object} props.item - The data item to be passed to the `Iphone` component.
 *
 * @returns {JSX.Element} The rendered `View` component containing the 3D scene.
 */

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
      <group
        ref={groupRef}
        name={`${index === 1} ? 'small' : 'large`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <Iphone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
