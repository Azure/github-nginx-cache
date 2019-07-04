## Github nginx cache

This repo contains nginx configuration tuned to sit in front of github endpoints and provide caching functionality. Github will not rate-limit [conditional requests](localhost:8000/api/repos/azure/github-nginx-cache). The [`proxy_cache_*` nginx directives](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache) force nginx to revalidate any cached content from the upstream server (in this case, github). Revalidation is performed by github as a conditional request, therefore it will not reduce api limits. This works for both authenticated and unauthenticated requests.

Here is an example how rate-limiting is mitigated for unauthenticated requests against both https://api.github.com and the cache running on localhost:8000.

![Rate limiting example](docs/rate-limit-example.png)

### Quick Start

    docker run -d -p 8000:80 azure-devex/github-nginx-cache
    curl localhost:8000/api/repos/azure/github-nginx-cache

### CI/CD

Docker publish [![Build Status](https://dev.azure.com/azure-sdk/public/_apis/build/status/Azure.github-nginx-cache%20Publish?branchName=master)](https://dev.azure.com/azure-sdk/public/_build/latest?definitionId=496&branchName=master)

## Develop

### Build

    docker build .

### Debug

#### Fish

    docker build -t custom-nginx . && docker run -it -p 8000:80  -v (pwd)/nginx-logs:/var/log/nginx custom-nginx
    curl localhost:8000/health/alive

#### Bash

    docker build -t custom-nginx . && docker run -it -p 8000:80  -v $(pwd)/nginx-logs:/var/log/nginx custom-nginx
    curl localhost:8000/health/alive

### Build

    # Run image on localhost:8000
    cd test
    npm ci
    npm run test

# Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
