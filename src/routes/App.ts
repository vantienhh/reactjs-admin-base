import React from 'react'

type module = {
  path: string,
  exact: boolean,
  component: React.ComponentType
}

function loadAppModules() {
  // @ts-ignore
  const packs = require.context('./app', true, /[A-Za-z0-9-_,\s]/)
  let modules: Array<module> = []

  packs.keys().forEach((key: string) => {
    let matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      modules = [...modules, ...packs(key).default]
    }
  })

  return modules
}

export const appRoutes = loadAppModules()

