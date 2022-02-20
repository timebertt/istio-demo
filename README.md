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

4. Install the bookinfo app:

   ```bash
   k apply -k bookinfo
   ```

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
