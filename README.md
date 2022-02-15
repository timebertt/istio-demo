# istio-demo

Demo for Istio

## Install Istio

1. Install Istio components based on `demo` profile with a few customizations:
   
   ```bash
   istioctl install --set profile=demo -f istio-profile.yaml -y
   ```

2. Verify the installation:

   ```bash
   istioctl verify-install -f <(istioctl manifest generate --set profile=demo -f istio-profile.yaml)
   ```

3. Install telemetry addons:

   ```bash
   k apply -k addons
   ```

## Cleanup

1. Uninstall Istio:
   
   ```bash
   istioctl x uninstall --purge
   ```

2. Uninstall telemetry addons:

   ```bash
   k delete -k addons
   ```

3. Delete the `istio-system` namespace:

   ```bash
   kubectl delete namespace istio-system
   ```
