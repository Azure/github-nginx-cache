#!/bin/bash

podhealth() {
  if [[ -z "${podname}" ]]; then
    echo "podname not set"
    return 1
  else
    echo "podname is set to ${podname}"
  fi

  activepod=$(for i in 0 1; do echo $podname-$i;done | grep -v $HOSTNAME)

  echo "activepod = ${activepod}.${serviceDomain}"

  # ${activepod}.${serviceDomain} is the FQDN of a pod
  # eg mypod.myservice.mynamespace.svc.cluster.local
  curl -I ${activepod}.${serviceDomain}

  # if curl fails then we need to be active otherwise stay passive
  if [ $? -eq 0 ]
    then
      return 1
    else
      return 0
  fi
}

podhealth
