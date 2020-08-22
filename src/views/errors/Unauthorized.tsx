import React from 'react'
import { Props } from 'src/types/interface/BaseComponent'

function Unauthorized(): React.FunctionComponentElement<Props> {
  return (
    <div>
      <h1>401 - UNAUTHORIZED</h1>
    </div>
  )
}

export default Unauthorized
