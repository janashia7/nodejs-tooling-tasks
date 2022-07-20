# Healtcheck

**Task :**
1. Create REST service on the port what source code read from env var PORT.
2. Add to the service endpoint /random. The flow described here. Response format example {"resutl": true}. If response is maybe, then return 500.
3. Add to the service /healthz endpoint. Add ping healtchcheck what uses HEAD http method for checking connectivity with yesno.wtf domain. It should be return 200, if service can access the yesno.wtf domain and return 500, if service can not.
4. Add Dockerfile for your project.