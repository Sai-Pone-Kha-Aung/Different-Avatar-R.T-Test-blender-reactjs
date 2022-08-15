import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model({action}) {
  const group = useRef()
  const previousAction = usePrevious(action)
  const { nodes, materials, animations } = useGLTF('/Xbot.glb')
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
        <group name="XBOT">
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Beta_Joints" geometry={nodes.Beta_Joints.geometry} material={materials.Beta_Joints_MAT} skeleton={nodes.Beta_Joints.skeleton} />
          <skinnedMesh name="Beta_Surface" geometry={nodes.Beta_Surface.geometry} material={materials['asdf1:Beta_HighLimbsGeoSG2']} skeleton={nodes.Beta_Surface.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Xbot.glb')

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
