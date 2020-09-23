import { History } from 'history'
import { match } from 'react-router-dom'

export interface Props {
  match: match
  location: Location
  history: History
}

export interface State {}
