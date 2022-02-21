# istio-demo

Demo for Istio

## Prepare Kubernetes Cluster

```bash
k apply -f shoot.yaml
```

## Install Istio

1. Install Istio components based on `demo` profile with a few customizations:
   
   ```bash
   istioctl install --set profile=demo -f istio-profile.yaml -y
   ```

2. Verify the installation:

   ```bash
   istioctl verify-install -f <(istioctl manifest generate --set profile=demo -f istio-profile.yaml)
   ```

3. Install telemetry addons, other system components and some global configuration:

   ```bash
   k label ns istio-system istio-injection=enabled --overwrite
   k apply -k istio-system
   ```

## Install the Demo App

1. Install the bookinfo app (v1):

   ```bash
   k apply -k bookinfo/v1
   ```
   
   Open the [bookinfo page](https://istio-demo.timebertt.dev/productpage).

2. Generate load:

   ```bash
   k apply -f bookinfo/requests.yaml
   ```

3. Install v2 of the reviews service:

   ```bash
   k apply -k bookinfo/v2
   ```
   
   Login as `jason` and observe timeouts for the reviews.
   Errors should be visible in [kiali](https://kiali.istio-demo.timebertt.dev/kiali/console/graph/namespaces/?traffic=grpc%2CgrpcRequest%2Chttp%2ChttpRequest%2Ctcp%2CtcpSent&graphType=versionedApp&namespaces=bookinfo&duration=60&refresh=15000&badgeSecurity=true&edges=trafficRate%2CtrafficDistribution&layout=dagre) and [grafana](https://grafana.istio-demo.timebertt.dev/d/UbsSZTDik/istio-workload-dashboard?orgId=1&refresh=1m&var-datasource=default&var-namespace=bookinfo&var-workload=productpage-v1&var-qrep=destination&var-srcns=All&var-srcwl=All&var-dstsvc=All&from=now-15m&to=now).

4. Fix the bug in v2 of the reviews service by deploying v3 and shift gradually shift traffic to v3:

   ```bash
   k apply -k bookinfo/v3
   # now, 10 percent goes to v3
   k apply -f bookinfo/v3/virtual-service-reviews-50-v3.yaml
   # now, all traffic goes to v3
   k apply -f bookinfo/v3/virtual-service-reviews-v3.yaml
   ```
   
   Observe the traffic shift in [kiali](https://kiali.istio-demo.timebertt.dev/kiali/console/graph/namespaces/?traffic=grpc%2CgrpcRequest%2Chttp%2ChttpRequest%2Ctcp%2CtcpSent&graphType=versionedApp&namespaces=bookinfo&duration=60&refresh=15000&badgeSecurity=true&edges=trafficRate%2CtrafficDistribution&layout=dagre) and [grafana](https://grafana.istio-demo.timebertt.dev/d/LJ_uJAvmk/istio-service-dashboard?orgId=1&var-datasource=default&var-service=reviews.bookinfo.svc.cluster.local&var-qrep=destination&var-srcns=All&var-srcwl=All&var-dstns=bookinfo&var-dstwl=All&from=now-15m&to=now&refresh=1m).

## Cleanup

1. Uninstall Istio:
   
   ```bash
   istioctl x uninstall --purge
   ```

2. Uninstall telemetry addons and system components:

   ```bash
   k delete -k istio-system
   ```

3. Delete the `istio-system` namespace:

   ```bash
   kubectl delete namespace istio-system
   ```
