import React from 'react'
import { Link } from 'react-router-dom'
import { Props } from 'src/types/interface/BaseComponent'

function NotFound(props: Props): React.FunctionComponentElement<Props> {
  function goBack() {
    props.history.goBack()
  }

  return (
    <div>
      <h1>404 - NOT FOUND</h1>
      <Link to="/errors/500">đến error</Link>
      <button onClick={ goBack }>Go Back</button>
    </div>
  )
}

export default NotFound
