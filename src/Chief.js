import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model({action}) {
  const group = useRef()
  const previousAction = usePrevious(action)
  const { nodes, materials, animations } = useGLTF('/chief.glb')
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
        <group name="Chief" rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes.Root_M} />
          <group name="M_Head_Jupitermo">
            <skinnedMesh name="M_Head_Jupitermd001" geometry={nodes.M_Head_Jupitermd001.geometry} material={materials['Jupiter_FaceAcc.001']} skeleton={nodes.M_Head_Jupitermd001.skeleton} />
            <skinnedMesh name="M_Head_Jupitermd001_1" geometry={nodes.M_Head_Jupitermd001_1.geometry} material={materials['Jupiter_Body.001']} skeleton={nodes.M_Head_Jupitermd001_1.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/chief.glb')

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
