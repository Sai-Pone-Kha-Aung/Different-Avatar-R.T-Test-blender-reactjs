import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model({action}) {
  const group = useRef()
  const previousAction = usePrevious(action)
  const { nodes, materials, animations } = useGLTF('/Ybot.glb')
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
        <group name="YBOT" rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Alpha_Joints" geometry={nodes.Alpha_Joints.geometry} material={materials.Alpha_Joints_MAT} skeleton={nodes.Alpha_Joints.skeleton} />
          <skinnedMesh name="Alpha_Surface" geometry={nodes.Alpha_Surface.geometry} material={materials.Alpha_Body_MAT} skeleton={nodes.Alpha_Surface.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Ybot.glb')

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
