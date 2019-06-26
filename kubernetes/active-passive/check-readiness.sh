#!/bin/bash

podhealth() {
  if [[ -z $podname ]]; then
    echo "podname is set to ${podname}"
  else
    echo "podname not set"
    return 1
  fi

  activepod=$(for i in 0 1; do echo $podname-$i;done | grep -v $HOSTNAME)

  echo "activepod = ${activepod}"

  curl -I $activepod

  # if curl fails then we need to be active otherwise stay passive
  if [[ $? -ne 0 ]]
    then
      return 0
    else
      return 1
  fi
}

podhealth
