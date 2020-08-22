import React from 'react'
import { Link } from 'react-router-dom'
import { Props } from 'src/types/interface/BaseComponent'

function Error(props: Props): React.FunctionComponentElement<Props> {
  function goBack() {
    props.history.goBack()
  }

  return (
    <div>
      <h1>500 - ERROR</h1>
      <Link to="/errors/404">đến not found</Link>
      <button onClick={ goBack }>Go Back</button>
    </div>
  )
}

export default Error
