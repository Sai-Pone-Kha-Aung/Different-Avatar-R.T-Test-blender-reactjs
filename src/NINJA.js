import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model({action}) {
  const group = useRef()
  const previousAction = usePrevious(action)
  const { nodes, materials, animations } = useGLTF('/NINJA.glb')
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
    if (previousAction) {
      actions[previousAction].fadeOut(0.2)
      actions[action].stop()
    }
    actions[action].play()
    actions[action].fadeIn(0.2)

  }, [actions, action, previousAction])
  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="NINJA" rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes.mixamorig1Hips} />
          <skinnedMesh name="Ch45" geometry={nodes.Ch45.geometry} material={materials.Ch45_Body} skeleton={nodes.Ch45.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/NINJA.glb')

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
